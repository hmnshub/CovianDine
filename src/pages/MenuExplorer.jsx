import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Plus, Minus, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

export default function MenuExplorer({ cart = {}, onUpdateCart = () => {}, onProceedToCheckout = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  const categories = useMemo(() => {
    return ['All', ...new Set(MENU_ITEMS.map(i => i.category))];
  }, []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchVeg = filterVegOnly ? item.isVeg : true;
      return matchCat && matchSearch && matchVeg;
    });
  }, [selectedCategory, searchQuery, filterVegOnly]);

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = MENU_ITEMS.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  return (
    <div className="bg-white min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-dark">Grand Menu</h1>
          <p className="text-gray-500 font-medium mt-1">Explore authentic regional specialties made fresh to order.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Biryani, Dosa, Daal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-brand-light rounded-2xl border border-gray-200 outline-none focus:border-brand-orange font-medium text-sm transition-all"
          />
        </div>
      </div>

      {/* Category Pills & Veg Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-dark text-white shadow-md'
                  : 'bg-brand-light text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pure Veg Toggle */}
        <button
          onClick={() => setFilterVegOnly(!filterVegOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs border transition-all ${
            filterVegOnly
              ? 'bg-green-50 border-green-500 text-green-700 ring-2 ring-green-500/20'
              : 'border-gray-200 text-gray-500 hover:border-gray-400'
          }`}
        >
          <span className={`w-3 h-3 rounded-full ${filterVegOnly ? 'bg-green-600' : 'bg-gray-300'}`}></span>
          Pure Veg Only
        </button>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-gray-100 rounded-3xl p-5 hover:border-brand-orange/40 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                  {item.isBestSeller && (
                    <span className="bg-brand-orange px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white flex items-center gap-1">
                      <Flame size={12} /> Bestseller
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <Star size={12} className="text-brand-yellow fill-brand-yellow" />
                  {item.rating} <span className="text-gray-400 font-normal">({item.reviews})</span>
                </div>
              </div>

              <h3 className="font-black text-xl text-brand-dark leading-snug mb-2">{item.name}</h3>
              <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">{item.description}</p>
            </div>

            {/* Price & Quantity Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-2xl font-black text-brand-dark">₹{item.price}</span>

              <div className="flex items-center gap-3 bg-brand-light rounded-full px-3 py-1.5 border border-gray-200">
                <button
                  onClick={() => onUpdateCart(item.id, -1)}
                  disabled={!cart[item.id]}
                  className="text-gray-400 hover:text-brand-dark disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-sm w-4 text-center">{cart[item.id] || 0}</span>
                <button
                  onClick={() => onUpdateCart(item.id, 1)}
                  className="text-brand-orange hover:scale-110 transition-transform font-bold"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sticky Bottom Cart Bar (Zomato Style) */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl bg-brand-dark text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between z-50 border-2 border-brand-orange"
          >
            <div className="flex items-center gap-4 pl-3">
              <div className="bg-brand-orange p-3 rounded-2xl text-white">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-300">{totalCartCount} items added</p>
                <h4 className="text-2xl font-black">₹{totalCartPrice}</h4>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-brand-orange/30"
            >
              Review & Pay →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}