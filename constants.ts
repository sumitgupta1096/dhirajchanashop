import { MenuItem } from './types';

export const SHOP_PHONE = "+917021175392";
export const SHOP_ADDRESS = "Dhiraj Chana Shop No.1, Radheyshyam Bhavan, Aarey Rd, Goregaon East, Mumbai, 400063";
export const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Dhiraj+Chana+Shop+Goregaon+Mumbai";
// Replace this URL with your own logo image URL
export const SHOP_LOGO_URL = "https://i.postimg.cc/YqzdRKyD/Dhiraj-Chana-Shop-1-removebg-preview.png";

export const MENU_ITEMS: MenuItem[] = [
  // Legumes & Roasted Items
  { id: '2', name: 'Roasted Chana', price: 200, category: 'Legumes', description: 'Roasted chickpeas with skin intact.', image: 'https://i.postimg.cc/9Q2ZxGWj/roasted-chana.avif' },
  { id: '3', name: 'Kala Chana', price: 250, category: 'Legumes', description: 'Black chickpeas, rich in fiber and iron.', image: 'https://i.postimg.cc/vBTNcJj4/9-2-BLACKCHANA200.webp' },
  { id: '4', name: 'Peanuts Plain', price: 220, category: 'Legumes', description: 'Classic roasted peanuts.', image: 'https://i.postimg.cc/T1qYh5Bx/roasted-peanuts.webp' },
  { id: '5', name: 'Peanuts Salted', price: 220, category: 'Legumes', description: 'Salted roasted peanuts.', image: 'https://i.postimg.cc/CL7rsLgm/IMG-3535-aeafed3a-d921-447b-87de-4b2b201161f0.jpg' },
  { id: '6', name: 'Peanuts Masala', price: 240, category: 'Legumes', description: 'Spicy coated roasted peanuts.', image: 'https://i.postimg.cc/VvrsBHSq/65-2.jpg' },
  { id: '7', name: 'Masala Dal', price: 240, category: 'Legumes', description: 'Spicy roasted chana dal.', image: 'https://i.postimg.cc/2Swq5MnC/masaladal.jpg' },
  { id: '8', name: 'Sada Daliya', price: 180, category: 'Legumes', description: 'Roasted split chickpeas (Dalia).', image: 'https://i.postimg.cc/cHY0vtP6/1545-2-CHANADALGRAMDALSPILIT500GM.jpg' },
  { id: '10', name: 'Vatana (Yellow Peas)', price: 200, category: 'Legumes', description: 'Roasted dried Yellow peas.', image: 'https://i.postimg.cc/ZRrzbtyN/patani-1080x.jpg' },
  { id: '11', name: 'Green Gram', price: 260, category: 'Legumes', description: 'Roasted green gram.', image: 'https://i.postimg.cc/5y771npQ/36-2-GREENVATANA200.webp' },
  { id: '12', name: 'Chana Jor', price: 240, category: 'Legumes', description: 'Flattened roasted chickpeas.', image: 'https://i.postimg.cc/RFGGQgr0/384-2.jpg' },
  { id: '13', name: 'Sing Bhujia', price: 240, category: 'Snacks', description: 'Spicy besan coated peanuts.', image: 'https://i.postimg.cc/GhTJHLpw/27101-2.jpg' },
  // Kurmura, Poha & Corn
  { id: '16', name: 'Bhadang Kurmura', price: 200, category: 'Snacks', description: 'Spicy puffed rice snack from Western India.', image: 'https://i.postimg.cc/xTWDB3C4/dakkhan-premium-quality-puffed-rice-bhadang-murmura-kurmura-pack-of-500gm-product-images-orvr7arsqg8.webp' },
  { id: '18', name: 'Makai (Corn) Plain', price: 180, category: 'Legumes', description: 'Roasted corn kernels.', image: 'https://i.postimg.cc/brYPmymW/Roasted-Makki-592a98a4-8f87-439e-9dbf-beeb37f32045.webp' },
 
  // Sev & Farsan
  { id: '23', name: 'Nylon Sev', price: 180, category: 'Snacks', description: 'Fine sev for chaat toppings.', image: 'https://i.postimg.cc/PrMVQbZH/82-2.jpg' },
  { id: '25', name: 'Ratlami Sev', price: 200, category: 'Snacks', description: 'Spicy clove-flavored sev.', image: 'https://i.postimg.cc/mrrQWCtb/97-2.jpg' },
  { id: '28', name: 'Aloo Bhujia', price: 220, category: 'Snacks', description: 'Potato and gram flour noodles.', image: 'https://i.postimg.cc/BnSF2H5H/29156-2-ALOOBHUJIYASEV200GM.jpg' },
  { id: '29', name: 'Bhavnagri Gathiya', price: 200, category: 'Snacks', description: 'Thick, soft spiced gram flour sticks.', image: 'https://i.postimg.cc/ZRCFppSD/67-3.jpg' },
  { id: '31', name: 'Papdi Gathiya', price: 200, category: 'Snacks', description: 'Flat crispy gathiya.', image: 'https://i.postimg.cc/7h1C2Z5v/87-2-3d864f90-a877-4ead-9294-72c1bbc3d411.jpg' },

  // Mixtures & Chivda
  { id: '32', name: 'Mix Farsan', price: 180, category: 'Snacks', description: 'Spicy mixture for Misal and Usal.', image: 'https://i.postimg.cc/Prcy46xZ/71-2.jpg' },
  { id: '33', name: 'Cornflakes Chivda', price: 200, category: 'Snacks', description: 'Sweet and spicy cornflakes mixture.', image: 'https://i.postimg.cc/qqqccnHb/24-2.jpg' },
  { id: '34', name: 'Lasun Chivda', price: 200, category: 'Snacks', description: 'Roasted Chivda mixture.', image: 'https://i.postimg.cc/RFFJ2Bpm/lasun-chivda.jpg' },
  { id: '36', name: 'Khatta Meetha Mix', price: 200, category: 'Snacks', description: 'Sweet and sour savory mix.', image: 'https://i.postimg.cc/XqrFBbw0/51-2-KHATTAMEETHAMIXTURE200GM.webp' },
  { id: '37', name: 'Chakli', price: 220, category: 'Snacks', description: 'Spiraled savory crunchy snack.', image: 'https://i.postimg.cc/d0G5D8Jp/20233-2-SOYACHAKLI200GM.jpg' },
  { id: '38', name: 'Bakarwadi', price: 240, category: 'Snacks', description: 'Crispy fried rolls stuffed with spices.', image: 'https://i.postimg.cc/D0vj98kx/70-2-MINIBHAKARWADI200.jpg' },
  { id: '39', name: 'Soya Sticks', price: 200, category: 'Snacks', description: 'Crunchy soya flavored sticks.', image: 'https://i.postimg.cc/RZpBXxfm/5455-2-CRISPYSOYASTICKS200.webp' },

  // Chips & Wafers
  { id: '40', name: 'Banana Chips (Yellow)', price: 240, category: 'Snacks', description: 'Salted banana chips.', image: 'https://i.postimg.cc/1tJ4Kjyb/724-2.jpg' },
  { id: '41', name: 'Banana Chips (Mari)', price: 240, category: 'Snacks', description: 'Black pepper banana chips.', image: 'https://i.postimg.cc/8CG5gSc5/5803-2.jpg' },
  { id: '42', name: 'Potato Wafers (Salted)', price: 280, category: 'Snacks', description: 'Classic salted potato chips.', image: 'https://i.postimg.cc/vZF85sWx/742-2.webp' },
  { id: '43', name: 'Potato Wafers (Masala)', price: 280, category: 'Snacks', description: 'Spiced potato chips.', image: 'https://i.postimg.cc/14xS0GVL/831-2-SWEETPOTATOCHIPSMASALA200.jpg' },

  // Chaat Essentials
  { id: '45', name: 'Pani Puri (100 pcs)', price: 50, category: 'Specials', description: 'Ready to fry or eat Pani Puris.', image: 'https://i.postimg.cc/9QRTQCc4/5396-2-SUJIPANIPURI50PC.jpg' },
  { id: '46', name: 'Sev Puri', price: 160, category: 'Specials', description: 'Flat puris for Sev Puri.', image: 'https://i.postimg.cc/SRfdVqnC/108-2.jpg' },
  { id: '47', name: 'Khari Boondi', price: 200, category: 'Specials', description: 'Salted boondi for Raita or Pani Puri.', image: 'https://i.postimg.cc/Prbnsjng/IMG-1195.jpg' },
  { id: '48', name: 'Masala Boondi', price: 180, category: 'Specials', description: 'Spiced boondi.', image: 'https://i.postimg.cc/qqwcyLFh/IMG-1176-45ba056b-73c5-416d-a66b-de422c3ba9fc.jpg' },

  // Sweets & Dry Fruits
  { id: '51', name: 'Rajgira', price: 280, category: 'Specials', description: 'Amaranth seed.', image: 'https://i.postimg.cc/0yPQLvb2/roasted-rajgira.jpg' },
  ];

export const CATEGORIES = Array.from(new Set(MENU_ITEMS.map(i => i.category)));