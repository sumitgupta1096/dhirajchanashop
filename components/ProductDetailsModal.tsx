import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

interface ProductDetailsModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  cart: { [key: string]: number };
  updateQuantity: (itemId: string, weight: string, quantity: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
  cart,
  updateQuantity
}) => {
  const [selectedWeight, setSelectedWeight] = useState<string>('1kg');
  const [inputQty, setInputQty] = useState<number>(0);

  // When item opens or weight changes, sync inputQty with cart
  useEffect(() => {
    if (item && isOpen) {
      const key = `${item.id}_${selectedWeight}`;
      setInputQty(cart[key] || 0);
    }
  }, [item, isOpen, cart, selectedWeight]);

  // Reset to default weight when modal closes/opens new item
  useEffect(() => {
    if (isOpen) {
      setSelectedWeight('1kg');
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleQtyChange = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0) {
      setInputQty(num);
      updateQuantity(item.id, selectedWeight, num);
    } else if (val === '') {
      setInputQty(0);
      updateQuantity(item.id, selectedWeight, 0);
    }
  };

  const increment = () => {
    const newQty = inputQty + 1;
    setInputQty(newQty);
    updateQuantity(item.id, selectedWeight, newQty);
  };

  const decrement = () => {
    if (inputQty > 0) {
      const newQty = inputQty - 1;
      setInputQty(newQty);
      updateQuantity(item.id, selectedWeight, newQty);
    }
  };

  // Price calculation
  let priceMultiplier = 1;
  if (selectedWeight === '500g') priceMultiplier = 0.5;
  if (selectedWeight === '250g') priceMultiplier = 0.25;
  if (selectedWeight === '100g') priceMultiplier = 0.1;
  const currentPrice = item.price * priceMultiplier;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row animate-fade-in-up">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur p-2 rounded-full text-gray-800 md:hidden shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative shrink-0">
           <img 
             src={item.image} 
             alt={item.name} 
             className="w-full h-full object-cover"
           />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto bg-white">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {item.category}
            </span>
            <button 
               onClick={onClose}
               className="text-gray-400 hover:text-gray-800 hidden md:block transition-colors p-1 hover:bg-gray-100 rounded-full"
             >
               <X size={24} />
             </button>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{item.name}</h2>
          
          <div className="flex items-baseline gap-2 mb-6">
            <p className="text-2xl font-bold text-orange-600">₹{currentPrice}</p>
            <span className="text-sm text-gray-400 font-medium">/ {selectedWeight}</span>
          </div>
          
          <div className="prose prose-sm text-gray-500 mb-6 leading-relaxed flex-1">
            <p>{item.description || "No detailed description available for this item."}</p>
          </div>

          {/* Weight Selection */}
          <div className="mb-6">
            <label className="text-sm font-bold text-gray-800 mb-2 block">Pack Size</label>
            <div className="flex flex-wrap gap-2">
              {['100g', '250g', '500g', '1kg'].map(weight => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                    selectedWeight === weight 
                      ? 'border-orange-600 bg-orange-50 text-orange-700' 
                      : 'border-gray-100 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <label className="text-sm font-bold text-gray-800 mb-2 block">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center justify-between bg-orange-50 rounded-xl p-1.5 border border-orange-100">
                <button
                  onClick={decrement}
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-lg text-orange-600 shadow-sm hover:scale-105 transition-transform"
                >
                  <Minus size={22} />
                </button>
                <input 
                  type="number"
                  min="0"
                  value={inputQty.toString()}
                  onChange={(e) => handleQtyChange(e.target.value)}
                  className="w-16 bg-transparent text-center font-bold text-2xl text-gray-900 focus:outline-none"
                />
                <button
                  onClick={increment}
                  className="w-12 h-12 flex items-center justify-center bg-orange-600 rounded-lg text-white shadow-sm hover:scale-105 transition-transform"
                >
                  <Plus size={22} />
                </button>
              </div>
            </div>
            {inputQty > 0 && (
              <div className="mt-4 flex justify-between items-center text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-lg">
                <span>Subtotal ({selectedWeight})</span>
                <span className="text-gray-900 font-bold">₹{currentPrice * inputQty}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};