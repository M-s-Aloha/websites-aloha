import { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { offices, services } from '@/lib/catalogue';
export function EnquiryForm({ service = '', plan = '', appointment = false }: { service?: string; plan?: string; appointment?: boolean }) {
 const simpleForm = appointment || Boolean(service);
 const [kind,setKind]=useState(appointment?'Appointment':'Enquiry'); const [status,setStatus]=useState(''); const [whatsappUrl,setWhatsappUrl]=useState('');
  return <form className="enquiry-form" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);const body=Array.from(data.entries()).map(([k,v])=>`${k}: ${String(v).trim() || (k==='Plan'?'Not sure yet':'Not provided')}`).join('\n');const url=`https://wa.me/919956023205?text=${encodeURIComponent(`alohaTax ${kind} — ${data.get('Service') || 'Consultation'}\n\n${body}${simpleForm?'':'\nConsent: I agree to be contacted by alohaTax about this request.'}`)}`;setWhatsappUrl(url);window.open(url,'_blank','noopener,noreferrer');setStatus('Your WhatsApp request is ready. It has not been sent yet. This is not a confirmed appointment.');}}>
 <h2>{appointment?'Book a consultation':'Let’s take the next step'}</h2><div className="form-grid">
 <label>Your name<input name="Name" placeholder="Full name" required maxLength={100}/></label><label>Phone number<input name="Phone" type="tel" placeholder="Your mobile number" pattern="[+0-9 ()-]{10,18}" required/></label>
  <label className="form-wide">Email address<input name="Email" type="email" placeholder="you@company.com" required maxLength={150}/></label>
  {simpleForm && service && <><input type="hidden" name="Service" value={service}/><input type="hidden" name="Plan" value={plan}/></>}
  {!simpleForm&&<><label>How can we help?<select name="Request" value={kind} onChange={e=>setKind(e.target.value)}><option>Enquiry</option><option>Appointment</option></select></label>
 <label>Service<select key={service} name="Service" defaultValue={service} required><option value="General consultation">Help me choose</option>{services.map(s=><option key={s.slug}>{s.name}</option>)}<option>General consultation</option></select></label>
  <label>Plan<select name="Plan" key={plan} defaultValue={plan}><option value="">Not sure yet</option><option>Basic</option><option>Standard</option><option>Premium</option></select></label><label>Preferred office<select name="Office"><option>Online consultation</option>{offices.map(o=><option key={o.name}>{o.name}</option>)}</select></label>
 {kind==='Appointment'&&<><label>Preferred date<input name="Date" type="date" required onChange={e=>{const d=new Date(`${e.target.value}T12:00:00`);e.target.setCustomValidity(d.getDay()===0?'Please choose Monday to Saturday.':d<new Date(new Date().setHours(0,0,0,0))?'Please choose today or a future date.':'');}}/></label><label>Preferred time<select name="Time"><option>9:00 am – 11:00 am</option><option>11:00 am – 1:00 pm</option><option>1:00 pm – 3:00 pm</option><option>3:00 pm – 5:00 pm</option><option>5:00 pm – 7:00 pm</option></select></label></>}
 <label className="form-wide">Tell us a little more<textarea name="Message" rows={3} placeholder="Your business, your question, or where you need a hand…" maxLength={2000}/></label>
  <label className="form-wide flex"><span className="flex items-start gap-2 font-normal"><input type="checkbox" required className="max-w-4 mt-1"/>I agree to be contacted by alohaTax about this request.</span></label></>}
 </div><Button type="submit" variant="hero" className="mt-5 w-full h-11">Continue on WhatsApp <MessageCircle/></Button><p className="form-note">WhatsApp: <a href="https://wa.me/919956023205" target="_blank" rel="noopener noreferrer">9956023205</a> · Monday–Saturday, 9am–7pm.</p>{status&&<div className="form-status" role="status"><p><Check className="inline size-4 mr-2"/>{status}</p><Button asChild variant="outline" className="mt-3"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp <MessageCircle/></a></Button></div>}
 </form>;
}
