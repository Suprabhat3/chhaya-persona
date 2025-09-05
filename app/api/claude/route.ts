// import { streamText } from 'ai';
// import { NextRequest } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const { messages, personaInfo } = await req.json();
//     if (!Array.isArray(messages) || messages.length === 0) {
//       return new Response(JSON.stringify({ error: 'Invalid messages array' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//     const isValidMessage = (msg: any): msg is { content: string; role: 'user' | 'assistant' | 'system' } =>
//       msg &&
//       typeof msg === 'object' &&
//       typeof msg.content === 'string' &&
//       ['user', 'assistant', 'system'].includes(msg.role);

//     if (!messages.every(isValidMessage)) {
//       return new Response(JSON.stringify({ error: 'Invalid message format' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//     const baseSystemPrompt = `You are an AI assistant with a specific persona. Here are your characteristics:

// **Core Identity:**
// - Name: ${personaInfo?.name || 'Assistant'}
// - Role: ${personaInfo?.role || 'Helpful AI Assistant'}
// - Personality: ${personaInfo?.personality || 'Friendly, professional, and knowledgeable'}

// **Behavior Guidelines:**
// - Communication Style: ${personaInfo?.communicationStyle || 'Clear, concise, and approachable'}
// - Tone: ${personaInfo?.tone || 'Professional yet warm'}
// - Expertise Areas: ${personaInfo?.expertise || 'General knowledge and assistance'}

// **Instructions:**
// - Do not try to give responses in table format.
// - When a user wants any links, give them in this format: [Link name](url). Do not create new links; only use provided links.
// - If the persona background is not from coding or programming, say no to code-related questions.
// - Only give responses according to your expertise.
// - Do not use "—" or "—" in your responses.
// - Try to complete your response in fewer tokens.
// - Do not give stage directions or action cues like (makes sad puppy face).
// - Always stay in character according to your defined persona.
// - Respond to user queries with the knowledge and expertise of your persona.
// - Respond in a way that reflects your personality and communication style.
// - Be helpful while maintaining your unique characteristics.
// - If asked about your identity, refer to the persona information provided.
// - Adapt your responses to match your defined tone and style.
// - Do not give responses like [your name], or imagination, or anything that breaks the persona.

// **Additional Context:**
// ${personaInfo?.additionalContext || 'Provide helpful, accurate, and engaging responses to user queries.'}

// Remember to embody this persona consistently throughout the conversation.`;

//     const systemMessage = {
//       role: 'system' as const,
//       content: baseSystemPrompt,
//     };

//     const allMessages = [systemMessage, ...messages];

//     const result = await streamText({
//         model: 'anthropic/claude-sonnet-4', 
//         messages: allMessages,
//         temperature: 0.7,
//         providerOptions: {
//                gateway: {
//         order: ['bedrock', 'anthropic'],
//         }
//       },
//   maxOutputTokens: 5000,  
//  });
//     return result.toTextStreamResponse();

//   } catch (error: any) {
//     console.error('An error occurred:', error);
//     return new Response(
//       JSON.stringify({
//         error: 'Internal server error',
//         details: error.message || 'An unknown error occurred.',
//       }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return new Response(
    `**The devloper is broke, He don't have money to pay for claude API**  

- Please give some donation: [Support My Work](/#support)  
- Your every support keeps me going :)  
- This project is open source, you can self-host it and use your own API key. Check it out here: [Chhaya Persona Repo](https://github.com/Suprabhat3/chhaya-persona)`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    }
  );
}

