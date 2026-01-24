import React, { useState, useEffect } from 'react';
import { Menu } from './components/Menu';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { Reviews } from './components/Reviews';
import { MENU_ITEMS, SHOP_ADDRESS, SHOP_PHONE, GOOGLE_MAPS_URL, CATEGORIES, SHOP_LOGO_URL } from './constants';
import { MenuItem } from './types';
import { ShoppingBag, MapPin, Phone, Clock, MessageCircle, Star, Search, X, ChevronRight, Award, Users, History } from 'lucide-react';

export default function App() {
  // Cart keys are format: "itemId_weight" (e.g., "1_1kg", "1_250g")
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items based on search and category
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Updates specific variant quantity
  const updateQuantity = (itemId: string, weight: string, newQuantity: number) => {
    const key = `${itemId}_${weight}`;
    setCart(prev => {
      if (newQuantity <= 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: newQuantity };
    });
  };

  // Helper for simple add (defaults to 1kg)
  const addToCart = (item: MenuItem, weight: string = '1kg') => {
    const key = `${item.id}_${weight}`;
    setCart(prev => ({
      ...prev,
      [key]: ((prev[key] as number) || 0) + 1
    }));
  };

  // Helper for simple remove (defaults to 1kg)
  const removeFromCart = (itemId: string, weight: string = '1kg') => {
    const key = `${itemId}_${weight}`;
    setCart(prev => {
      const current = (prev[key] as number) || 0;
      if (current <= 1) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: current - 1 };
    });
  };

  const clearCart = () => setCart({});
  
  const cartItemCount: number = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);

  const calculateTotal = () => {
    return Object.entries(cart).reduce((sum: number, [key, qty]) => {
      const [itemId, weight] = key.split('_');
      const item = MENU_ITEMS.find(i => i.id === itemId);
      if (!item) return sum;
      
      let priceMultiplier = 1;
      if (weight === '500g') priceMultiplier = 0.5;
      if (weight === '250g') priceMultiplier = 0.25;
      if (weight === '100g') priceMultiplier = 0.1;
      
      return sum + (item.price * priceMultiplier * (qty as number));
    }, 0);
  };

  const total = calculateTotal();

  const handleCheckout = () => {
    const messageLines = Object.entries(cart).map(([key, qty]) => {
      const [itemId, weight] = key.split('_');
      const item = MENU_ITEMS.find(i => i.id === itemId);
      if (!item) return '';
      
      let priceMultiplier = 1;
      if (weight === '500g') priceMultiplier = 0.5;
      if (weight === '250g') priceMultiplier = 0.25;
      if (weight === '100g') priceMultiplier = 0.1;
      
      const itemPrice = item.price * priceMultiplier;
      const quantity = qty as number;
      return `- ${item.name} (${weight}) x ${quantity} (₹${itemPrice * quantity})`;
    }).filter(Boolean);

    if (messageLines.length === 0) return;

    const message = `Hello Dhiraj Chana Shop! I would like to order:%0A%0A${messageLines.join('%0A')}%0A%0ATotal: ₹${total}%0A%0APlease confirm my order.`;
    window.open(`https://wa.me/${SHOP_PHONE.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 transition-all duration-300">
            <img 
              src={SHOP_LOGO_URL} 
              alt="Logo" 
              className={`rounded-lg shadow-lg shadow-orange-200 object-cover transition-all duration-300 ${scrolled ? 'w-9 h-9 shadow-none' : 'w-12 h-12'}`} 
            />
            <h1 className={`font-bold tracking-tight transition-all duration-300 ${scrolled ? 'text-lg text-gray-900' : 'text-2xl text-gray-900 md:text-white'}`}>
              Dhiraj<span className="text-orange-600">Chana</span>Shop
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <a href="#menu" className={`hidden md:block font-medium hover:text-orange-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}>Menu</a>
            <a href="#about" className={`hidden md:block font-medium hover:text-orange-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}>About</a>
            <a 
              href={`https://wa.me/${SHOP_PHONE.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              className={`hidden md:flex items-center gap-2 font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-400'}`}
              title="Chat with us"
            >
              <MessageCircle size={22} />
            </a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-full transition-all ${
                scrolled 
                  ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' 
                  : 'bg-white/10 text-gray-800 md:text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <ShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-white z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-200/50 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wide mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-blink"></span>
              OPEN EVERYDAY 9AM - 10PM
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Authentic Indian <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                Crunchy Snacks
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              From protein-packed Chana to spicy Sev Puri essentials. 
              Taste the tradition of Mumbai in every bite.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#menu"
                className="px-8 py-3.5 bg-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Order Now
              </a>
              <a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-orange-200 transition-all duration-300 flex items-center gap-2"
              >
                <MapPin size={18} />
                Find Us
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 -mt-10 relative z-20">
        {/* Features / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: <Clock className="text-orange-500" />, title: "Fresh Daily", desc: "Roasted fresh every morning" },
            { icon: <Star className="text-orange-500" />, title: "Top Quality", desc: "Premium grade ingredients" },
            { icon: <ShoppingBag className="text-orange-500" />, title: "Bulk Orders", desc: "Available for parties & events" },
          ].map((feat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-orange-50 rounded-xl">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{feat.title}</h3>
                <p className="text-sm text-gray-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
             <h2 className="text-3xl font-bold text-gray-900">Our Menu</h2>
             <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">{filteredItems.length} Items</span>
          </div>
          
          <div className="relative w-full md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border-0 bg-white rounded-xl text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all"
              placeholder="Search snacks..."
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:bg-orange-50'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
               className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:bg-orange-50'
            }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 mb-4">
              <Search className="h-8 w-8 text-orange-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No snacks found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 text-orange-600 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <Menu
            items={filteredItems}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            onItemClick={setSelectedItem}
          />
        )}
      </main>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white mt-16 border-t border-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
               <img 
                 src="https://i.postimg.cc/qqY7K5HX/photo-2026-01-01-09-47-36.jpg" 
                 alt="Traditional Indian Spices" 
                 className="rounded-3xl shadow-2xl relative z-10 transform hover:scale-[1.02] transition-transform duration-500 object-cover aspect-[4/3]"
               />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden md:block">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <Award size={24} />
                     </div>
                     <div>
                        <p className="text-sm text-gray-500">Quality</p>
                        <p className="font-bold text-gray-900">Premium Grade</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wide mb-6">
                <History size={14} />
                EST. 1960
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Preserving Tradition in Every Bite</h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Dhiraj Chana Shop started as a humble initiative in Goregaon, bringing the authentic taste of roasted chana and peanuts to the locals. 
                Over the decades, we have expanded our menu but kept our core values intact.
              </p>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isAboutExpanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We source the finest legumes directly from farmers and roast them daily in our shop using traditional methods to ensure that perfect crunch in every bite.
                </p>
              </div>

              <button 
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="inline-flex items-center gap-1 text-orange-600 font-bold hover:text-orange-700 transition-colors mb-8 group"
              >
                {isAboutExpanded ? 'Read Less' : 'Read More'}
                <ChevronRight 
                  size={20} 
                  className={`transform transition-transform duration-300 ${isAboutExpanded ? '-rotate-90' : 'rotate-90'}`} 
                />
              </button>
              
              <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                <div>
                   <h4 className="text-3xl font-bold text-orange-600 mb-1">25+</h4>
                   <p className="text-gray-500 text-sm font-medium">Years of Service</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-orange-600 mb-1">50+</h4>
                   <p className="text-gray-500 text-sm font-medium">Varieties</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-orange-600 mb-1">10k+</h4>
                   <p className="text-gray-500 text-sm font-medium">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-0 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                 <img src={SHOP_LOGO_URL} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
                 <span className="text-xl font-bold">Dhiraj Chana Shop</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Serving the best quality roasted snacks and legumes since 1995. Your health and taste is our priority.
              </p>
              <div className="flex gap-4">
                <a 
                  href={`https://wa.me/${SHOP_PHONE.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20"
                >
                  <MessageCircle size={20} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Visit Us</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3 items-start hover:text-white transition-colors group">
                  <MapPin className="shrink-0 mt-1 text-orange-600 group-hover:text-orange-500" size={18} />
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{SHOP_ADDRESS}</a>
                </li>
                <li className="flex gap-3 items-center hover:text-white transition-colors group">
                  <Phone className="shrink-0 text-orange-600 group-hover:text-orange-500" size={18} />
                  <a href={`tel:${SHOP_PHONE}`} className="hover:text-white transition-colors">{SHOP_PHONE.replace('+91', '+91 ')}</a>
                </li>
                <li className="flex gap-3 items-center group">
                  <Clock className="shrink-0 text-orange-600 group-hover:text-orange-500" size={18} />
                  <span>Everyday: 9:00 AM - 10:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#menu" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Menu</a></li>
                <li><a href="#about" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> About Us</a></li>
                <li><a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Get Directions</a></li>
                <li><a href={`tel:${SHOP_PHONE}`} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Call Now</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Dhiraj Chana Shop. All rights reserved.</p>
            <div className="flex gap-6">
               <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
               <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Checkout Bar */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] p-4 z-40 flex items-center justify-between safe-area-bottom animate-slide-up">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">{cartItemCount} items in cart</span>
            <span className="text-xl font-bold text-gray-900">₹{total}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-200"
          >
            <span>Order on WhatsApp</span>
            <MessageCircle size={20} className="fill-current" />
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />
      
      <ProductDetailsModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        cart={cart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}