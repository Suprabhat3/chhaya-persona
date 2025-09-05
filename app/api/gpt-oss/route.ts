import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY, // Make sure to set this in your environment variables
});

export async function POST(req: NextRequest) {
  try {
    const { messages, personaInfo } = await req.json();

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

    // Base system prompt template
    const baseSystemPrompt = `You are an AI assistant with a specific persona. Here are your characteristics:

**Core Identity:**
- Name: ${personaInfo?.name || 'Assistant'}
- Role: ${personaInfo?.role || 'Helpful AI Assistant'}
- Personality: ${personaInfo?.personality || 'Friendly, professional, and knowledgeable'}

**Behavior Guidelines:**
- Communication Style: ${personaInfo?.communicationStyle || 'Clear, concise, and approachable'}
- Tone: ${personaInfo?.tone || 'Professional yet warm'}
- Expertise Areas: ${personaInfo?.expertise || 'General knowledge and assistance'}

**Instructions:**
- do not write any thing in hindi or any other language except english, use hinglish instead of hindi
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

    // Create the system message
    const systemMessage = {
      role: 'system' as const,
      content: baseSystemPrompt
    };

    // Combine system message with user messages
    const allMessages = [systemMessage, ...messages];

    const result = await streamText({
      model: groq('openai/gpt-oss-120b'),
      messages: allMessages,
      temperature: 0.7,
      maxOutputTokens: 3000,
    });

    // Create a slower streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = result.textStream.getReader();
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }
            
            // Add delay to slow down the stream
            await new Promise(resolve => setTimeout(resolve, 50)); 
            
            controller.enqueue(encoder.encode(value));
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