import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Loader2 } from 'lucide-react';
import { BANGALORE_OUTLETS } from '../data/menuData';
import { supabase } from '../lib/supabase'; // <-- PROPER FILE CONNECTION

export default function Reservations() {
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    outlet: 'Indiranagar Flagship',
    guests: '2 Guests',
    date: '2026-08-25',
    time: '8:00 PM'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('orders') 
      .insert([
        {
          order_type: 'reservation',
          customer_phone: formData.phone,
          delivery_address: `${formData.outlet} | ${formData.date} | ${formData.time} | ${formData.guests}`,
          total: 0.00,
          status: 'confirmed'
        }
      ]);

    setLoading(false);

    if (error) {
      alert("Database connection failed. Check your Supabase URL/Key.");
      console.error(error);
    } else {
      setBooked(true);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto selection:bg-brand-yellow/30">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-brand-dark tracking-tight">Reserve a Table</h1>
        <p className="text-gray-500 font-medium mt-2">Skip waitlists entirely by pre-booking your table.</p>
      </div>

      {booked ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-brand-light border-2 border-green-500/30 p-10 rounded-[3rem] text-center space-y-4">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-brand-dark">Reservation Confirmed!</h2>
          <p className="text-gray-600 font-medium max-w-md mx-auto">
            We have reserved a table for <span className="font-bold text-brand-dark">{formData.guests}</span> at our <span className="font-bold text-brand-orange">{formData.outlet}</span>.
          </p>
          <div className="pt-4">
            <button onClick={() => setBooked(false)} className="bg-brand-dark text-white px-8 py-3 rounded-2xl font-bold text-sm">
              Make Another Booking
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-brand-light p-8 md:p-12 rounded-[3rem] border-2 border-gray-100 space-y-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Your Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-brand-orange font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-brand-orange font-medium" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Select Outlet</label>
              <select value={formData.outlet} onChange={e => setFormData({...formData, outlet: e.target.value})} className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-brand-orange font-medium">
                {BANGALORE_OUTLETS.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Party Size</label>
              <select value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-brand-orange font-medium">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>10+ Banquet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Time Slot</label>
              <select value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-brand-orange font-medium">
                <option>1:30 PM (Lunch)</option>
                <option>8:30 PM (Dinner)</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition-colors flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Confirm Instant Table Booking"}
          </button>
        </form>
      )}
    </div>
  );
}