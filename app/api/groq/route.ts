import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { getPersona } from '@/lib/personaData';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY, // Make sure to set this in your environment variables
});

export async function POST(req: NextRequest) {
  try {
    const { messages, personaKey, userName } = await req.json();

    // Get persona info from server-side data
    const personaInfo = getPersona(personaKey || 'default');

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid messages array', { status: 400 });
    }

    // Validate message format
    const isValidMessage = (msg: any) => 
      msg && typeof msg === 'object' && 
      typeof msg.content === 'string' && 
      ['user', 'assistant', 'system'].includes(msg.role);

    if (!messages.every(isValidMessage)) {
      return new Response('Invalid message format', { status: 400 });
    }

    // Create system prompt based on whether user is logged in
    let baseSystemPrompt: string;

    if (userName) {
      // System prompt for LOGGED-IN users (with personalization)
      baseSystemPrompt = `You are an AI assistant with a specific persona. Here are your characteristics:

**User Information:**
- You are chatting with: ${userName}
- Address them by their name when appropriate to create a personalized and friendly experience.
- Use their name naturally in conversation, especially when greeting them or emphasizing important points.

**Core Identity:**
- Name: ${personaInfo?.name || 'Assistant'}
- Role: ${personaInfo?.role || 'Helpful AI Assistant'}
- Personality: ${personaInfo?.personality || 'Friendly, professional, and knowledgeable'}

**Behavior Guidelines:**
- Communication Style: ${personaInfo?.communicationStyle || 'Clear, concise, and approachable'}
- Tone: ${personaInfo?.tone || 'Professional yet warm'}
- Expertise Areas: ${personaInfo?.expertise || 'General knowledge and assistance'}

**Instructions:**
- Always try to give structured output highlighting key points.
- when user wants any links give them in this format:[Link name](url)
- If persona background is not from coding or programming, say no to code related questions
- only give response according to experties.
- don't use "—" or "—" in your responses
- Try to complet your response in less tokens
- don't give stage direction or action cue like (makes sad puppy face).
- Always stay in character according to your defined persona
- Respond to user queries with the knowledge and expertise of your persona
- Respond in a way that reflects your personality and communication style
- Be helpful while maintaining your unique characteristics
- If asked about your identity, refer to the persona information provided
- Adapt your responses to match your defined tone and style
- Don't give response like [your name], or imagination, or anything that breaks the persona

**Additional Context:**
${personaInfo?.additionalContext || 'Provide helpful, accurate, and engaging responses to user queries.'}

Remember to embody this persona consistently throughout the conversation.`;
    } else {
      // System prompt for GUEST users (without personalization)
      baseSystemPrompt = `You are an AI assistant with a specific persona. Here are your characteristics:

**Core Identity:**
- Name: ${personaInfo?.name || 'Assistant'}
- Role: ${personaInfo?.role || 'Helpful AI Assistant'}
- Personality: ${personaInfo?.personality || 'Friendly, professional, and knowledgeable'}

**Behavior Guidelines:**
- Communication Style: ${personaInfo?.communicationStyle || 'Clear, concise, and approachable'}
- Tone: ${personaInfo?.tone || 'Professional yet warm'}
- Expertise Areas: ${personaInfo?.expertise || 'General knowledge and assistance'}

**Instructions:**
- Always try to give structured output highlighting key points.
- when user wants any links give them in this format:[Link name](url)
- If persona background is not from coding or programming, say no to code related questions
- only give response according to experties.
- don't use "—" or "—" in your responses
- Try to complet your response in less tokens
- don't give stage direction or action cue like (makes sad puppy face).
- Always stay in character according to your defined persona
- Respond to user queries with the knowledge and expertise of your persona
- Respond in a way that reflects your personality and communication style
- Be helpful while maintaining your unique characteristics
- If asked about your identity, refer to the persona information provided
- Adapt your responses to match your defined tone and style
- Don't give response like [your name], or imagination, or anything that breaks the persona

**Additional Context:**
${personaInfo?.additionalContext || 'Provide helpful, accurate, and engaging responses to user queries.'}

Remember to embody this persona consistently throughout the conversation.`;
    }

    // Create the system message
    const systemMessage = {
      role: 'system' as const,
      content: baseSystemPrompt
    };

    // Combine system message with recent user messages to avoid 'Request Entity Too Large'
    // Keep only the last 10 messages from the conversation history
    const recentMessages = messages.slice(-10);
    const allMessages = [systemMessage, ...recentMessages];

    const result = await streamText({
      model: groq('groq/compound-mini'),
      messages: allMessages,
      temperature: 0.7,
      maxOutputTokens: 3000,
    });

    // Create a slower streaming response that filters out <think> tags
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = result.textStream.getReader();
        let buffer = '';
        let inThinkTag = false;
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              if (!inThinkTag && buffer.length > 0) {
                controller.enqueue(encoder.encode(buffer));
              }
              controller.close();
              break;
            }
            
            buffer += value;
            
            while (buffer.length > 0) {
              if (inThinkTag) {
                const endIdx = buffer.indexOf('</think>');
                if (endIdx !== -1) {
                  inThinkTag = false;
                  buffer = buffer.slice(endIdx + 8).replace(/^[\r\n]+/, '');
                } else {
                  break; // Wait for more data
                }
              } else {
                const startIdx = buffer.indexOf('<think>');
                if (startIdx !== -1) {
                  const toOutput = buffer.slice(0, startIdx);
                  if (toOutput) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    controller.enqueue(encoder.encode(toOutput));
                  }
                  inThinkTag = true;
                  buffer = buffer.slice(startIdx + 7);
                } else {
                  // Check if buffer ends with a partial '<think>'
                  let holdBackIdx = -1;
                  for (let i = Math.max(0, buffer.length - 6); i < buffer.length; i++) {
                    if (buffer[i] === '<') {
                      const partial = buffer.slice(i);
                      if ('<think>'.startsWith(partial)) {
                        holdBackIdx = i;
                        break;
                      }
                    }
                  }
                  
                  if (holdBackIdx !== -1) {
                    const toOutput = buffer.slice(0, holdBackIdx);
                    if (toOutput) {
                      await new Promise(resolve => setTimeout(resolve, 50));
                      controller.enqueue(encoder.encode(toOutput));
                    }
                    buffer = buffer.slice(holdBackIdx);
                    break; // Wait for more data
                  } else {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    controller.enqueue(encoder.encode(buffer));
                    buffer = '';
                  }
                }
              }
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Groq API error:', error);
    
    // Handle different types of errors
    if (error.name === 'AI_APICallError') {
      return new Response(
        JSON.stringify({ 
          error: 'API call failed', 
          details: error.message 
        }),
        { 
          status: error.statusCode || 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message || 'Unknown error occurred'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}