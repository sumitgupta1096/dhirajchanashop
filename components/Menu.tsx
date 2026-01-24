import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Minus, ShoppingBag, ChevronDown } from 'lucide-react';

interface MenuProps {
  items: MenuItem[];
  cart: { [key: string]: number };
  addToCart: (item: MenuItem, weight?: string) => void;
  removeFromCart: (itemId: string, weight?: string) => void;
  onItemClick: (item: MenuItem) => void;
}

const MenuCard: React.FC<{
  item: MenuItem;
  cart: { [key: string]: number };
  addToCart: (item: MenuItem, weight?: string) => void;
  removeFromCart: (itemId: string, weight?: string) => void;
  onItemClick: (item: MenuItem) => void;
}> = ({ item, cart, addToCart, removeFromCart, onItemClick }) => {
  const [selectedWeight, setSelectedWeight] = useState('1kg');

  // Helper to get total quantity for an item across all variants
  const getItemTotalQty = (itemId: string) => {
    return Object.entries(cart)
      .filter(([key]) => key.startsWith(`${itemId}_`))
      .reduce((sum: number, [, qty]) => sum + (qty as number), 0);
  };

  const totalQty = getItemTotalQty(item.id);
  const currentVariantQty = cart[`${item.id}_${selectedWeight}`] || 0;
  
  let priceMultiplier = 1;
  if (selectedWeight === '500g') priceMultiplier = 0.5;
  if (selectedWeight === '250g') priceMultiplier = 0.25;
  if (selectedWeight === '100g') priceMultiplier = 0.1;
  
  const currentPrice = item.price * priceMultiplier;

  return (
    <div 
      onClick={() => onItemClick(item)}
      className="bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-orange-50 flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg shadow-sm text-gray-700">
          ₹{currentPrice}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-1 leading-tight">{item.name}</h3>
        <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mb-3">{item.description}</p>
      </div>

      <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2">
            <div className="relative">
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                className="appearance-none w-full bg-orange-50 text-orange-800 text-xs font-semibold py-1.5 px-3 rounded-lg border border-orange-100 focus:outline-none focus:ring-1 focus:ring-orange-300 cursor-pointer"
              >
                <option value="1kg">1 kg - ₹{item.price}</option>
                <option value="500g">500 g - ₹{item.price * 0.5}</option>
                <option value="250g">250 g - ₹{item.price * 0.25}</option>
                <option value="100g">100 g - ₹{item.price * 0.1}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-600">
                <ChevronDown size={14} />
              </div>
            </div>
        </div>

        {currentVariantQty === 0 ? (
          <button
            onClick={() => addToCart(item, selectedWeight)}
            className="w-full py-2 md:py-2.5 bg-orange-100 text-orange-700 text-sm font-semibold rounded-xl hover:bg-orange-600 hover:text-white hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2"
          >
            <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
            Add
          </button>
        ) : (
          <div className="flex items-center justify-between bg-orange-50 rounded-xl p-1 animate-pop">
            <button
              onClick={() => removeFromCart(item.id, selectedWeight)}
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-lg text-orange-600 shadow-sm hover:scale-110 active:scale-90 transition-transform"
            >
              <Minus size={14} className="md:w-[16px] md:h-[16px]" />
            </button>
            <span className="font-bold text-gray-800 text-sm md:text-base w-6 md:w-8 text-center select-none">
              {currentVariantQty}
            </span>
            <button
              onClick={() => addToCart(item, selectedWeight)}
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-orange-600 rounded-lg text-white shadow-sm hover:scale-110 active:scale-90 transition-transform"
            >
              <Plus size={14} className="md:w-[16px] md:h-[16px]" />
            </button>
          </div>
        )}
        {totalQty > 0 && totalQty !== currentVariantQty && (
           <p className="text-[10px] text-center text-gray-400 mt-1 animate-fade-in">Includes other sizes</p>
        )}
      </div>
    </div>
  );
};

export const Menu: React.FC<MenuProps> = (props) => {
  return (
    <div className="py-8" id="menu">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {props.items.map(item => (
          <MenuCard key={item.id} item={item} {...props} />
        ))}
      </div>
    </div>
  );
};