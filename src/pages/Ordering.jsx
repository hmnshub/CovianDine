import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MapPin, ArrowRight, Phone } from 'lucide-react';

const DEMO_MENU = [
  { id: 1, name: 'Covian Signature Biryani', price: 350, category: 'Mains', image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=400' },
  { id: 2, name: 'Bangalore Masala Dosa', price: 120, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1668231312523-01825dc98a28?w=400' },
  { id: 3, name: 'Spicy Tandoori Wings', price: 280, category: 'Starters', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
];

const DeliveryMapMock = () => (
  <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden relative border-2 border-gray-200 mb-4">
    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800" alt="Bangalore Map" className="w-full h-full object-cover opacity-70" />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity }}>
        <MapPin size={48} className="text-brand-orange drop-shadow-lg" fill="currentColor" />
      </motion.div>
    </div>
  </div>
);

export default function Ordering() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'takeaway';
  const navigate = useNavigate();
  
  const [cart, setCart] = useState({});
  const [phone, setPhone] = useState('');
  const [table, setTable] = useState('');

  const updateCart = (id, delta) => {
    setCart(prev => {
      const newCart = { ...prev };
      newCart[id] = (newCart[id] || 0) + delta;
      if (newCart[id] <= 0) delete newCart[id];
      return newCart;
    });
  };

  const total = DEMO_MENU.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  const handlePayment = () => {
    const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    navigate(`/track/${orderId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-black mb-8 capitalize">{mode} Menu</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {DEMO_MENU.map(item => (
            <motion.div key={item.id} className="border-2 border-gray-100 rounded-3xl p-4 flex gap-4 items-center bg-white hover:border-gray-200 transition-colors">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-brand-orange font-bold mt-1">₹{item.price}</p>
                <div className="flex items-center gap-4 mt-3 bg-gray-50 w-fit rounded-full px-3 py-1 border border-gray-200">
                  <button onClick={() => updateCart(item.id, -1)} className="text-gray-500 hover:text-brand-dark"><Minus size={18}/></button>
                  <span className="font-bold w-4 text-center">{cart[item.id] || 0}</span>
                  <button onClick={() => updateCart(item.id, 1)} className="text-brand-orange"><Plus size={18}/></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-96 bg-brand-light rounded-[2.5rem] p-8 h-fit sticky top-8">
        <h3 className="text-2xl font-bold mb-6">Your Order</h3>
        {total === 0 ? (
          <p className="text-gray-400 text-center py-8">Cart is empty</p>
        ) : (
          <AnimatePresence>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {DEMO_MENU.filter(i => cart[i.id]).map(item => (
                <div key={item.id} className="flex justify-between items-center font-medium">
                  <span className="flex-1">{item.name} x{cart[item.id]}</span>
                  <span>₹{item.price * cart[item.id]}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input type="tel" placeholder="Login with Phone No." onChange={(e) => setPhone(e.target.value)} className="w-full pl-12 p-3 rounded-xl border-2 border-gray-200 outline-none focus:border-brand-orange bg-white" />
              </div>
              
              {mode === 'dine-in' && (
                <input type="number" placeholder="Enter Table Number" onChange={(e) => setTable(e.target.value)} className="w-full p-3 rounded-xl border-2 border-gray-200 outline-none focus:border-brand-orange bg-white" />
              )}
              {mode === 'delivery' && (
                <div className="mt-4">
                  <label className="block font-bold mb-2 text-sm">Delivery Location</label>
                  <DeliveryMapMock />
                  <input type="text" placeholder="House/Flat No, Landmark" className="w-full p-3 rounded-xl border-2 border-gray-200 outline-none focus:border-brand-orange bg-white" />
                </div>
              )}
            </div>

            <button onClick={handlePayment} className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
              Pay via QR / UPI <ArrowRight size={20}/>
            </button>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
