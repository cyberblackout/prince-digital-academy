import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, WHATSAPP_NUMBER } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div>
      <section className="gradient-hero py-20 text-center text-white"><div className="max-w-3xl mx-auto px-4"><h1 className="text-4xl font-bold mb-4">About {SITE_NAME}</h1><p className="text-white/70 text-lg">Empowering students across Ghana with quality online education</p></div></section>
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div><h2 className="text-2xl font-bold text-gray-800 mb-4">Our <span className="text-secondary">Mission</span></h2><p className="text-gray-600 leading-relaxed">At Prince Digital Academy, we believe every student deserves access to quality education. Our platform provides expert-led courses, interactive live classes, and comprehensive assessments designed to help JHS and SHS students excel in their academic journey.</p></div>
          <div className="bg-surface rounded-2xl p-8 text-center"><div className="text-5xl mb-4">🎯</div><p className="text-gray-500">To be Ghana&apos;s leading online learning platform, making education accessible, engaging, and effective for all students.</p></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{v:'500+',l:'Students',e:'🎓'},{v:'50+',l:'Courses',e:'📚'},{v:'20+',l:'Teachers',e:'👩‍🏫'},{v:'95%',l:'Success Rate',e:'🏆'}].map(s=>
            <div key={s.l} className="bg-white rounded-2xl p-6 text-center shadow-sm border card-hover"><div className="text-3xl mb-2">{s.e}</div><p className="text-2xl font-bold text-gray-800">{s.v}</p><p className="text-sm text-gray-500">{s.l}</p></div>)}
        </div>
        <div><h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why <span className="text-secondary">Choose Us</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{t:'Expert Teachers',d:'Experienced educators who simplify complex topics',e:'👨‍🏫'},{t:'Interactive Learning',d:'Live classes, quizzes, and hands-on assignments',e:'💡'},{t:'Affordable Pricing',d:'Quality education at prices that work for every family',e:'💰'}].map(f=>
              <div key={f.t} className="bg-white rounded-2xl p-6 text-center shadow-sm border card-hover"><div className="text-3xl mb-3">{f.e}</div><h4 className="font-semibold text-gray-800 mb-2">{f.t}</h4><p className="text-sm text-gray-500">{f.d}</p></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
