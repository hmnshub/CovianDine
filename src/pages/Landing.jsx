import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, QrCode, ShoppingBag, Star, ArrowRight,
  Clock, Quote, Sparkles, Phone
} from 'lucide-react';
import { RESTAURANT_MEDIA, BANGALORE_OUTLETS, MENU_ITEMS } from '../data/menuData';

/* ---------- Small reusable pieces ---------- */

// Counts up from 0 to `value` once it scrolls into view
function Counter({ value, suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start;
    let frame;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setDisplay(value);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// Image that scales/parallaxes as the section scrolls through the viewport —
// stands in for "video-like" motion without needing a real video asset.
function ZoomParallaxImage({ src, alt, className = '', imgClassName = '', scaleRange = [1.25, 1] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]]);
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ scale, y }} className={`w-full h-full object-cover ${imgClassName}`} />
    </div>
  );
}

// Card that "unfolds" open (clip-path wipe) as it enters the viewport
function UnfoldCard({ children, className = '', delay = 0, direction = 'up', onClick }) {
  const variants = {
    hidden: {
      opacity: 0,
      clipPath: direction === 'up' ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
      y: direction === 'up' ? 40 : -40,
    },
    show: {
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Content: facts + testimonials (for the "lengthier" storytelling) ---------- */

const FACTS = [
  { value: 1968, suffix: '', label: 'The year our first wood-fired tandoor was lit in a Bangalore back-alley kitchen', isYear: true },
  { value: 24, suffix: 'hrs', label: 'Our signature black daal simmers, uninterrupted, through the night' },
  { value: 52, suffix: '+', label: 'Dishes on the Grand Menu, from tiffin classics to coastal curries' },
  { value: 3, suffix: '', label: 'Bangalore houses — Indiranagar, Koramangala & Lavelle Road' },
];

const TESTIMONIALS = [
  {
    quote: "The daal alone is worth the trip — you can taste the twenty-four hours. Ordered ahead on my phone and it was on the table before I'd sat down.",
    name: 'Ritika M.',
    role: 'Indiranagar regular',
  },
  {
    quote: 'Booked a table for eight during a work trip and the QR ordering meant we never once flagged down a waiter. Felt like the future of dining, but the biryani felt like 1968.',
    name: 'Daniel K.',
    role: 'Visiting from Mumbai',
  },
  {
    quote: "Grew up on my grandmother's Chettinad pepper chicken. CovianDine is the first restaurant version that has actually made me stop and put my fork down.",
    name: 'Ananya S.',
    role: 'Koramangala regular',
  },
];

/* ---------- Page ---------- */

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.35]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 120]);

  const bestSellers = MENU_ITEMS.filter((i) => i.isBestSeller).slice(0, 6);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-yellow/30 overflow-x-hidden">

      {/* 1. HERO — full-bleed, scroll-zoom */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80"
            alt="CovianDine dining hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 max-w-7xl mx-auto">
  

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white max-w-4xl">
            Where Taste Meets <span className="text-brand-orange block mt-2">Perfection.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-white/80 max-w-md font-medium leading-relaxed mt-6">
            Since 1968, Bangalore's finest culinary heritage — now with a seamless, queue-free ordering system built for the way you actually eat out.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 mt-10">
            <button onClick={() => navigate('/reservations')} className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-brand-orange/30">
              Book a Table <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/menu')} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors">
              Explore Menu
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs font-bold tracking-widest uppercase"
        >
          Scroll ↓
        </motion.div>
      </section>

      {/* 2. INFINITE MARQUEE */}
      <div className="w-full bg-brand-dark text-brand-yellow py-4 overflow-hidden flex whitespace-nowrap border-y-4 border-brand-orange">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className="flex gap-8 text-2xl font-black uppercase tracking-widest"
        >
          {Array(10).fill('• NO QUEUES • 24-HOUR SLOW-COOKED DAAL • EST. 1968 ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 3. FACTS STRIP — count-up numbers */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {FACTS.map((fact, i) => (
            <UnfoldCard key={i} delay={i * 0.1} className="text-center">
              <div className="text-5xl md:text-6xl font-black text-brand-orange tracking-tighter">
                {fact.isYear ? fact.value : <Counter value={fact.value} suffix={fact.suffix} />}
              </div>
              <p className="text-sm text-gray-500 font-bold mt-3 leading-snug max-w-[220px] mx-auto">{fact.label}</p>
            </UnfoldCard>
          ))}
        </div>
      </section>

      {/* 4. OUR STORY — narrative with zoom-parallax image */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <UnfoldCard direction="left" className="order-2 md:order-1">
            <ZoomParallaxImage
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80"
              alt="Open tandoor kitchen"
              className="rounded-[3rem] h-[520px] shadow-2xl"
            />
          </UnfoldCard>
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <Sparkles size={16} /> Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight">
              A Bangalore Back-Alley Tandoor, Fifty-Odd Years On.
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium text-lg">
              In 1968, our founder's family fired up a single wood tandoor behind a modest Irani café,
              turning out bun-maska and cutting chai for the neighborhood before sunrise. There was no
              menu — just what was fresh, and what the tandoor could take that day.
            </p>
            <p className="text-gray-600 leading-relaxed font-medium text-lg">
              Three generations later, that same instinct for "cook it properly, or don't cook it" still
              runs the kitchen — we've just built a modern, queue-free front door around it. No pre-made
              gravies, no shortcuts on the dum biryani, and yes, the black daal still simmers all night.
            </p>
            <button onClick={() => navigate('/story')} className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-brand-orange pb-1 hover:gap-3 transition-all">
              Read the full story <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY STAT BLOCK */}
      <section className="py-24 px-6 bg-brand-dark text-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Quote className="mx-auto text-brand-orange" size={40} />
          <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
            "No pre-made gravies. No compromises. Everything that hits the pass was started from scratch, that morning."
          </h2>
          <p className="text-white/60 font-medium">— Kitchen philosophy, unchanged since 1968</p>
        </div>
      </section>

      {/* 6. SIGNATURE DISHES — unfold on scroll */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Fan Favorites</span>
            <h2 className="text-5xl font-black text-brand-dark">Signature Dishes</h2>
            <p className="text-xl text-gray-500">Curated favorites from our master chefs, chosen by our regulars.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {bestSellers.slice(0, 3).map((item, i) => (
              <UnfoldCard
                key={item.id}
                delay={i * 0.1}
                onClick={() => navigate('/menu')}
                className={i === 0 ? 'md:col-span-2 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group cursor-pointer' : 'rounded-[2.5rem] overflow-hidden relative group cursor-pointer'}
              >
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex items-end p-6 md:p-8">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Star size={16} className="fill-brand-yellow text-brand-yellow" />
                      <span className="text-sm font-bold">{item.rating} · {item.reviews} reviews</span>
                    </div>
                    <h3 className={i === 0 ? 'text-3xl font-black' : 'text-xl font-black'}>{item.name}</h3>
                    {i === 0 && <p className="text-gray-300 mt-2 font-medium">{item.description}</p>}
                  </div>
                </div>
              </UnfoldCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => navigate('/menu')} className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-orange transition-colors inline-flex items-center gap-2">
              See the Full 52-Dish Menu <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. GALLERY — zoom-parallax mosaic */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Step Inside</span>
            <h2 className="text-5xl font-black text-brand-dark">The Rooms We Cook In</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
            {RESTAURANT_MEDIA.ambience.map((img, i) => (
              <ZoomParallaxImage
                key={i}
                src={img.url + '&auto=format&fit=crop&q=80'}
                alt={img.title}
                scaleRange={[1.3, 1]}
                className={`rounded-3xl shadow-lg ${i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'col-span-2' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. CHEF SPOTLIGHT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">The People Behind the Pass</span>
            <h2 className="text-5xl font-black text-brand-dark">Our Culinary Custodians</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {RESTAURANT_MEDIA.chefs.map((chef, idx) => (
              <UnfoldCard key={idx} delay={idx * 0.15} className="flex gap-6 items-center p-6 bg-brand-light border-2 border-gray-100 rounded-3xl hover:border-brand-orange transition-colors">
                <img src={chef.url} alt={chef.name} className="w-28 h-28 rounded-2xl object-cover shrink-0" />
                <div>
                  <h3 className="text-2xl font-black text-brand-dark">{chef.name}</h3>
                  <p className="text-brand-orange font-bold mb-2">{chef.role}</p>
                  <p className="text-gray-500 text-sm font-medium">Over 20 years mastering traditional clay-oven and dum cooking techniques across India.</p>
                </div>
              </UnfoldCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-24 px-6 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">What Bangalore Says</span>
            <h2 className="text-5xl font-black">Straight From Our Regulars</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <UnfoldCard key={i} delay={i * 0.1} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <Quote className="text-brand-orange mb-4" size={28} />
                <p className="text-white/85 font-medium leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} className="fill-brand-yellow text-brand-yellow" />)}
                </div>
                <p className="font-bold">{t.name}</p>
                <p className="text-white/50 text-sm">{t.role}</p>
              </UnfoldCard>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ORDER MODES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-brand-dark">Order However Suits You</h2>
            <p className="text-xl text-gray-500">Zero queues, in every direction.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'dine-in', title: 'Table Order', icon: <QrCode size={32} />, desc: 'Scan the QR at your table and order instantly — no flagging down a waiter.' },
              { id: 'takeaway', title: 'Takeaway', icon: <ShoppingBag size={32} />, desc: 'Order ahead from the app and skip the line entirely.' },
              { id: 'delivery', title: 'Delivery', icon: <MapPin size={32} />, desc: 'CovianDine brought straight to your doorstep, still hot.' },
            ].map((mode, i) => (
              <UnfoldCard
                key={mode.id}
                delay={i * 0.1}
                onClick={() => navigate(`/order?mode=${mode.id}`)}
                className="bg-brand-light rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-orange mb-6 shadow-sm">
                  {mode.icon}
                </div>
                <h3 className="text-2xl font-black text-brand-dark mb-2">{mode.title}</h3>
                <p className="text-gray-500 font-medium">{mode.desc}</p>
              </UnfoldCard>
            ))}
          </div>
        </div>
      </section>

      {/* 11. LOCATIONS PREVIEW */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Find Us</span>
            <h2 className="text-5xl font-black text-brand-dark">Three Houses, One Kitchen Philosophy</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BANGALORE_OUTLETS.map((outlet, idx) => (
              <UnfoldCard key={idx} delay={idx * 0.1} className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-black mb-4 text-brand-dark">{outlet.name}</h3>
                <div className="space-y-3 text-gray-500 text-sm font-medium mb-6">
                  <p className="flex items-start gap-2"><MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" /> {outlet.address}</p>
                  <p className="flex items-center gap-2"><Clock size={18} className="text-brand-orange shrink-0" /> {outlet.timing}</p>
                  <p className="flex items-center gap-2"><Phone size={18} className="text-brand-orange shrink-0" /> {outlet.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {outlet.features.map((feat, fidx) => (
                    <span key={fidx} className="bg-brand-light text-brand-dark text-xs font-bold px-3 py-1 rounded-full">{feat}</span>
                  ))}
                </div>
              </UnfoldCard>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <ZoomParallaxImage
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80"
          alt="CovianDine bar"
          className="absolute inset-0"
          scaleRange={[1.2, 1]}
        />
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Hungry Yet?</h2>
          <p className="text-white/80 text-xl font-medium">Book a table, or have the 24-hour daal at your door tonight.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/reservations')} className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-brand-orange/40">
              Book a Table <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/order?mode=delivery')} className="bg-white text-brand-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
              Order Delivery
            </button>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-brand-dark text-white py-12 text-center border-t-8 border-brand-orange">
        <h2 className="text-3xl font-black tracking-tighter mb-4">
          Covian<span className="text-brand-orange">Dine</span>
        </h2>
        <p className="text-gray-400 mb-8">© 2026 Covian Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
