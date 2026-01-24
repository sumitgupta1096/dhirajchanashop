import React from 'react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { SHOP_PHONE } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [key: string]: number };
  updateQuantity: (itemId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  clearCart
}) => {
  // Parse cart keys to get items
  const cartEntries = Object.entries(cart).map(([key, qty]) => {
    const [itemId, weight] = key.split('_');
    const item = MENU_ITEMS.find(i => i.id === itemId);
    
    let priceMultiplier = 1;
    if (weight === '500g') priceMultiplier = 0.5;
    if (weight === '250g') priceMultiplier = 0.25;
    if (weight === '100g') priceMultiplier = 0.1;

    return {
      key,
      item,
      weight,
      qty: qty as number,
      priceMultiplier
    };
  }).filter(entry => entry.item && entry.qty > 0);

  const total = cartEntries.reduce((sum: number, entry) => {
    return sum + (entry.item!.price * entry.priceMultiplier * entry.qty);
  }, 0);

  const handleCheckout = () => {
    const messageLines = cartEntries.map(entry => {
       const price = entry.item!.price * entry.priceMultiplier;
       return `- ${entry.item!.name} (${entry.weight}) x ${entry.qty} (₹${price * entry.qty})`;
    });

    const message = `Hello Dhiraj Chana Shop! I would like to order:%0A%0A${messageLines.join('%0A')}%0A%0ATotal: ₹${total}%0A%0APlease confirm my order.`;
    window.open(`https://wa.me/${SHOP_PHONE.replace('+', '')}?text=${message}`, '_blank');
  };

  const totalItemsCount = cartEntries.reduce((acc: number, entry) => acc + entry.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
              {totalItemsCount} items
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartEntries.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag size={64} className="text-gray-300" />
              <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
              <button onClick={onClose} className="text-orange-600 font-semibold hover:underline">
                Start adding snacks!
              </button>
            </div>
          ) : (
            cartEntries.map(({ key, item, weight, qty, priceMultiplier }) => (
              <div key={key} className="flex gap-4">
                <img src={item!.image} alt={item!.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{item!.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{weight}</span>
                    </div>
                    <p className="text-sm text-gray-500">₹{item!.price * priceMultiplier} / unit</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item!.id, weight, qty - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-orange-600"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                      <button 
                        onClick={() => updateQuantity(item!.id, weight, qty + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-orange-600"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-gray-800">₹{item!.price * priceMultiplier * qty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartEntries.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">₹{total}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4 text-center">
              Shipping calculated at checkout via WhatsApp
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
              >
                Order on WhatsApp
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={clearCart}
                className="w-full py-2.5 text-gray-400 text-sm font-medium hover:text-red-500 flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};