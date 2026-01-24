export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Legumes' | 'Snacks' | 'Specials';
  description?: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}