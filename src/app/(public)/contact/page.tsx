'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Loader2 } from 'lucide-react';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, WHATSAPP_NUMBER } from '@/lib/constants';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(r=>setTimeout(r,1000)); setSent(true); setLoading(false); };

  return (
    <div>
      <section className="gradient-hero py-20 text-center text-white"><div className="max-w-3xl mx-auto px-4"><h1 className="text-4xl font-bold mb-4">Contact Us</h1><p className="text-white/70 text-lg">We&apos;re here to help. Reach out anytime!</p></div></section>
      <section className="max-w-5xl mx-auto px-4 py-16"><div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Get In Touch</h3>
          <p className="text-gray-500">Have a question? We&apos;d love to hear from you.</p>
          {[{icon: <Phone size={20}/>, label:'Phone', value:SITE_PHONE, href:`tel:${SITE_PHONE}`},
            {icon: <Mail size={20}/>, label:'Email', value:SITE_EMAIL, href:`mailto:${SITE_EMAIL}`},
            {icon: <MapPin size={20}/>, label:'Address', value:'Accra, Ghana'},
            {icon: <Clock size={20}/>, label:'Hours', value:'Mon - Sat: 8AM - 6PM'}].map(c=>
            <div key={c.label} className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">{c.icon}</div>
              <div><p className="text-sm font-medium text-gray-700">{c.label}</p>{c.href ? <a href={c.href} className="text-sm text-primary hover:underline">{c.value}</a> : <p className="text-sm text-gray-500">{c.value}</p>}</div></div>)}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors"><MessageCircle size={18}/> Chat on WhatsApp</a>
        </div>
        <div className="lg:col-span-3">
          {sent ? <div className="bg-green-50 rounded-2xl p-12 text-center"><div className="text-5xl mb-4">✅</div><h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3><p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p></div> :
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4"><div><label className="form-label">Name</label><input type="text" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required className="form-input"/></div>
              <div><label className="form-label">Email</label><input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required className="form-input"/></div></div>
            <div><label className="form-label">Subject</label><input type="text" value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} required className="form-input"/></div>
            <div><label className="form-label">Message</label><textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} required rows={5} className="form-input"/></div>
            <button type="submit" disabled={loading} className="btn-primary py-3 w-full justify-center">{loading?<><Loader2 size={18} className="animate-spin"/>Sending...</>:<><Send size={18}/>Send Message</>}</button>
          </form>}
        </div>
      </div></section>
    </div>
  );
}
