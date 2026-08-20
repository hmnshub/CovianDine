import { motion } from 'framer-motion';
import { ChefHat, Heart, Award, MapPin, Clock, Phone, Sparkles, Flame } from 'lucide-react';
import { RESTAURANT_MEDIA, BANGALORE_OUTLETS } from '../data/menuData';

const TIMELINE = [
  { year: '1968', title: 'One Tandoor, One Alley', copy: 'A single wood-fired tandoor behind an Irani café in old Bangalore. Bun-maska and cutting chai before sunrise, cooked to order for whoever showed up.' },
  { year: '1991', title: 'The Daal Goes Overnight', copy: 'The black daal recipe is reworked to simmer for a full 24 hours — a house rule that has never once been shortened, even on the busiest nights.' },
  { year: '2006', title: 'Second House Opens', copy: 'Koramangala gets its own courtyard kitchen, built around the same open-flame tandoor the family started with.' },
  { year: '2026', title: 'Queue-Free, Not Recipe-Free', copy: 'CovianDine launches table, takeaway and delivery ordering — the front door gets faster, the kitchen stays exactly as slow as it needs to be.' },
];

export default function Story() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto selection:bg-brand-yellow/30">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6 mb-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-brand-light px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange border border-gray-100">
          <Sparkles size={14} /> The Story of CovianDine
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-brand-dark leading-tight">
          Where Old Irani Heritage Meets <span className="text-brand-orange">Bangalore Tech.</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed font-medium">
          In 1968, our family began with a modest wood-fired tandoor. Today, CovianDine honors that generational craft with a zero-queue, seamless digital dining experience.
        </p>
      </section>

      {/* Hero Visual Collage */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden h-96 shadow-lg">
          <img src={RESTAURANT_MEDIA.ambience[0].url} alt="Ambience" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl overflow-hidden h-96 shadow-lg md:-mt-8">
          <img src={RESTAURANT_MEDIA.ambience[1].url} alt="Courtyard" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl overflow-hidden h-96 shadow-lg">
          <img src={RESTAURANT_MEDIA.ambience[2].url} alt="Open Kitchen" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </motion.div>
      </section>

      {/* Dishoom Style Narrative */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-32 bg-brand-light p-8 md:p-16 rounded-[3rem] border border-gray-100">
        <div className="space-y-6">
          <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Philosophy of the Plate</span>
          <h2 className="text-4xl font-black text-brand-dark">No Pre-Made Gravies. No Compromises.</h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            Unlike commercial kitchens that use standardized base curries, every single handi at CovianDine is slow-cooked from scratch. Our signature black daal simmers for 24 continuous hours through the Bangalore night, yielding a velvety richness that cannot be hurried.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-black text-brand-orange mb-1">24 Hrs</h3>
              <p className="text-sm text-gray-500 font-bold">Continuous Daal Simmer</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-black text-brand-dark mb-1">100%</h3>
              <p className="text-sm text-gray-500 font-bold">Pure Desi A2 Ghee</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800" alt="Cooking Daal" className="rounded-3xl shadow-xl w-full h-[420px] object-cover" />
        </div>
      </section>

      {/* Timeline of Facts */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-bold uppercase tracking-wider text-sm flex items-center gap-2 justify-center mb-3"><Flame size={16}/> Fifty-Odd Years, In Short</span>
          <h2 className="text-4xl font-black mb-4">How We Got Here</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-10">
          {TIMELINE.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-24 text-right">
                <span className="text-2xl font-black text-brand-orange">{t.year}</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-brand-orange mt-2 shrink-0 relative">
                {idx !== TIMELINE.length - 1 && (
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-24 bg-gray-200" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-black text-brand-dark mb-1">{t.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{t.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Master Chefs Section */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Our Culinary Custodians</h2>
          <p className="text-gray-500 font-medium">Meet the master chefs preserving Indian heritage recipes.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {RESTAURANT_MEDIA.chefs.map((chef, idx) => (
            <div key={idx} className="flex gap-6 items-center p-6 bg-white border-2 border-gray-100 rounded-3xl hover:border-brand-orange transition-colors">
              <img src={chef.url} alt={chef.name} className="w-28 h-28 rounded-2xl object-cover" />
              <div>
                <h3 className="text-2xl font-black text-brand-dark">{chef.name}</h3>
                <p className="text-brand-orange font-bold mb-2">{chef.role}</p>
                <p className="text-gray-500 text-sm font-medium">Over 20 years mastering traditional clay-oven and Dum cooking techniques across India.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bangalore Outlets */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Visit Us in Bangalore</h2>
          <p className="text-gray-500 font-medium">Three signature locations tailored for table dining, takeaway, and delivery.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {BANGALORE_OUTLETS.map((outlet, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-black mb-4 text-brand-dark">{outlet.name}</h3>
              <div className="space-y-3 text-gray-500 text-sm font-medium mb-6">
                <p className="flex items-start gap-2"><MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" /> {outlet.address}</p>
                <p className="flex items-center gap-2"><Clock size={18} className="text-brand-orange shrink-0" /> {outlet.timing}</p>
                <p className="flex items-center gap-2"><Phone size={18} className="text-brand-orange shrink-0" /> {outlet.phone}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {outlet.features.map((feat, fidx) => (
                  <span key={fidx} className="bg-brand-light text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}