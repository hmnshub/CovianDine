import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChefHat, PackageCheck } from 'lucide-react';

export default function Tracker() {
  const { orderId } = useParams();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const stages = [
    { title: 'Order Received', desc: 'Desk confirmed payment', icon: <CheckCircle2 size={40}/> },
    { title: 'Preparing', desc: 'Chef is working their magic', icon: <ChefHat size={40}/> },
    { title: 'Ready', desc: 'Served or Out for delivery', icon: <PackageCheck size={40}/> }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl w-full max-w-lg text-center border-2 border-gray-100">
        <div className="mb-8">
          <p className="text-gray-500 font-bold mb-1">Order ID</p>
          <h2 className="text-3xl font-black text-brand-orange">{orderId}</h2>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {stages.map((stage, i) => (
            <div key={i} className={`relative flex items-center gap-6 ${i <= step ? 'opacity-100' : 'opacity-40 grayscale'} transition-all duration-500`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${i <= step ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'}`}>
                {stage.icon}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xl">{stage.title}</h4>
                <p className="text-gray-500 text-sm">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}