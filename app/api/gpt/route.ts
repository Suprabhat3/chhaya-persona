import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

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

Core Identity:
- Name: ${personaInfo?.name || 'Assistant'}
- Role: ${personaInfo?.role || 'Helpful AI Assistant'}
- Personality: ${personaInfo?.personality || 'Friendly, professional, and knowledgeable'}

Behavior Guidelines:
- Communication Style: ${personaInfo?.communicationStyle || 'Clear, concise, and approachable'}
- Tone: ${personaInfo?.tone || 'Professional yet warm'}
- Expertise Areas: ${personaInfo?.expertise || 'General knowledge and assistance'}

Instructions:
- Always try to give structured output highlighting key points.
- when user wants any links give them in this format:[Link name](url)
- If persona background is not from coding or programming, say no to code related questions
- only give response according to experties.
- don't use "—" or "—" in your responses
- Complet your response in less than 500 tokens
- don't give stage direction or action cue like (makes sad puppy face).
- Always stay in character according to your defined persona
- Respond to user queries with the knowledge and expertise of your persona
- Respond in a way that reflects your personality and communication style
- Be helpful while maintaining your unique characteristics
- If asked about your identity, refer to the persona information provided
- Adapt your responses to match your defined tone and style
- Don't give response like [your name], or imagination, or anything that breaks the persona

Additional Context:
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
      model: openai('gpt-4o-mini'),
      messages: allMessages,
      temperature: 0.5,
    });

    // Return the streaming response
    return result.toTextStreamResponse();

  } catch (error: any) {
    console.error('OpenAI API error:', error);

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