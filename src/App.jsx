import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Story from './pages/Story';
import MenuExplorer from './pages/MenuExplorer';
import Ordering from './pages/Ordering';
import Tracker from './pages/Tracker';
import Reservations from './pages/Reservations';
import { ShoppingBag } from 'lucide-react';

function Navigation({ cartCount }) {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black tracking-tighter text-brand-dark">
        Covian<span className="text-brand-orange">Dine</span>
      </Link>
      <div className="hidden md:flex gap-8 font-bold text-sm text-gray-500">
        <Link to="/menu" className="hover:text-brand-orange transition-colors">50+ Grand Menu</Link>
        <Link to="/story" className="hover:text-brand-orange transition-colors">Our Story & Heritage</Link>
        <Link to="/reservations" className="hover:text-brand-orange transition-colors">Book a Table</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/menu" className="relative p-2 bg-brand-light rounded-full text-brand-dark hover:text-brand-orange transition-colors">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/order?mode=delivery" className="bg-brand-dark text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-brand-orange transition-colors">
          Order Online
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  const [cart, setCart] = useState({});

  const updateCart = (id, delta) => {
    setCart(prev => {
      const next = { ...prev };
      next[id] = (next[id] || 0) + delta;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-brand-dark">
        <Navigation cartCount={totalCartCount} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/story" element={<Story />} />
          <Route path="/menu" element={<MenuExplorer cart={cart} onUpdateCart={updateCart} onProceedToCheckout={() => window.location.href = '/order?mode=takeaway'} />} />
          <Route path="/order" element={<Ordering />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/track/:orderId" element={<Tracker />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
