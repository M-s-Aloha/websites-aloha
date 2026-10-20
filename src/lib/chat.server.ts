import { convertToModelMessages, validateUIMessages, type UIMessage } from 'ai';
import { createResponsesCall } from './ai/responses.server';
import { services, offices } from './catalogue';
export async function handleChat(request: Request) {
 try {
  if(Number(request.headers.get('content-length')??0)>150000)return Response.json({error:'Your conversation is too long. Please start a fresh visit.'},{status:413});
  const body=await request.json();
  if(!Array.isArray(body.messages)||body.messages.length>80)return Response.json({error:'Please send a valid, shorter conversation.'},{status:400});
  const size=JSON.stringify(body.messages).length;if(size>120000)return Response.json({error:'This conversation is too long.'},{status:413});
  const messages=await validateUIMessages<UIMessage>({messages:body.messages});
  if(messages.some(m=>!['user','assistant'].includes(m.role)))return Response.json({error:'Invalid conversation role.'},{status:400});
  const key=process.env['LOVABLE_API_KEY'];if(!key)return Response.json({error:'The assistant is not configured yet. Please call 9956023205.'},{status:503});
  const instructions=`You are alohaTax's warm, concise service assistant. Respond in the visitor's language, including Hindi or Hinglish. Give general educational information, not definitive professional or legal advice. Help beginners choose a service. Never invent prices, partners, client reviews, timelines, approvals or staff credentials. The exact suggested Basic, Standard, and Premium prices are included in each catalogue entry below; quote those amounts and billing periods exactly when asked. Never substitute or change a listed amount. All listed fees are suggested professional service fees subject to confirmation, not verified market averages. Premium for Statutory Audit is a starting price. Explain that inclusions and any government charges are confirmed with the customer before they proceed. Use the exact package features in each catalogue entry; do not promise extra inclusions. Contact phone 9956023205, email contact@alohatax.in. Hours Monday–Saturday 9am–7pm. Appointments are requests and require confirmation. You cannot send an email, book an appointment or access accounts; link users to /contact?appointment=true or /contact. Never ask for PAN, Aadhaar, passwords or sensitive documents in chat. Explain that tailored tax decisions need the team. Keep answers generally under 150 words, using readable Markdown. Service catalogue: ${JSON.stringify(services)}. Link to /services/{slug} when relevant. Offices: ${JSON.stringify(offices)}. Actual figures: 1000+ clients, 13500+ returns, 98% retention. No history is saved by this site.`;
  const {result,response}=createResponsesCall(request,{baseURL:'https://ai.gateway.lovable.dev/v1',apiKey:key,model:'openai/gpt-6-astra'},await convertToModelMessages(messages),instructions);
  return response(result.toUIMessageStreamResponse({originalMessages:messages,sendReasoning:true,onFinish:()=>{},onError:(error)=>error instanceof Error?error.message:'The assistant could not respond. Please contact our team.'}));
 } catch(error){if(error instanceof Error&&error.name==='AbortError')return new Response(null,{status:499});return Response.json({error:error instanceof Error?error.message:'The assistant could not respond.'},{status:400});}
}
