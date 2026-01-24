import React from 'react';
import { Star, Quote, User } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Local Guide",
    rating: 5,
    text: "The best roasted Chana in Mumbai! Absolutely fresh and crunchy. I've been buying from here for 5 years.",
    image: "https://i.postimg.cc/xjM5jJMm/Cute-Handsome-Beautiful-Boy-Free-download-2023-New-Handsome-Boy-Photos.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Regular Customer",
    rating: 5,
    text: "Love their diet chivda and soya sticks. Perfect for my evening tea time snacks. Highly recommended for anyone looking for authentic Gujarati snacks.",
    image: "https://i.postimg.cc/CKxrzhSD/cute-baby-fashion-how-im-looking-pretty-u-like-me.jpg"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Foodie",
    rating: 4,
    text: "Great quality and variety. The shop is always busy which shows how popular they are. The Kala Chana is a must-try for protein lovers.",
    image: "https://i.postimg.cc/BZT5fWfc/boys-dp-2.webp"
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Home Chef",
    rating: 5,
    text: "I source all my chaat ingredients from here. The Sev and Pani Puri packets are consistently fresh. Their delivery service is also very prompt.",
    image: "https://i.postimg.cc/Nj5rMSZs/profile-pic-for-instagram-girl-outdoors.webp"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Fitness Enthusiast",
    rating: 4,
    text: "The roasted peanuts and chana are my go-to post-workout snacks. Clean, no excess salt, and very high quality. Glad to have found this gem.",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  }
];

export const Reviews: React.FC = () => {
  return (
    <section className="py-16 bg-orange-50/30 border-t border-orange-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-orange-600 font-bold text-xs tracking-wider uppercase mb-2 block animate-fade-in">Testimonials</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Loved by Thousands</h2>
          <p className="text-gray-500 text-sm md:text-base">Don't just take our word for it. Here's what our community says.</p>
        </div>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-orange-50 via-orange-50/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-orange-50 via-orange-50/60 to-transparent z-10 pointer-events-none"></div>

        {/* Scroll Container */}
        <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6 px-[calc(50vw-110px)] md:px-8 gap-4">
          {REVIEWS.map((review) => (
            <div 
              key={review.id} 
              className="min-w-[220px] md:min-w-[260px] h-[300px] snap-center bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 relative group border border-orange-50 flex flex-col justify-between"
            >
              <div>
                <div className="absolute top-4 right-4 text-orange-100 group-hover:text-orange-200 transition-colors">
                  <Quote size={20} className="md:w-6 md:h-6" fill="currentColor" />
                </div>
                
                <div className="flex gap-1 mb-3">
                   {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={`md:w-3.5 md:h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed relative z-10 text-xs md:text-sm italic line-clamp-6">"{review.text}"</p>
              </div>
              
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0 border-2 border-orange-50">
                   <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-gray-900 text-xs truncate">{review.name}</h4>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wide truncate">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Google Reviews Badge */}
      <div className="mt-8 flex justify-center">
         <div className="bg-white py-2 px-4 rounded-full shadow-sm border border-gray-200 flex items-center gap-2 hover:shadow-md transition-shadow cursor-default z-20 relative">
            <div className="flex -space-x-2">
               {[0,1,2].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                     <img src={REVIEWS[i].image} alt="User" className="w-full h-full object-cover" />
                  </div>
               ))}
            </div>
            <div className="text-xs">
               <span className="font-bold text-gray-900">4.8/5.0</span> rating on Google Maps
            </div>
         </div>
      </div>
    </section>
  );
};