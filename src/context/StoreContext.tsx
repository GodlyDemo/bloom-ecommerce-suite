import React, { createContext, useContext, useState, useEffect } from 'react';

// Type definitions
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  address?: string;
  phone?: string;
};

type StoreContextType = {
  products: Product[];
  featuredProducts: Product[];
  popularProducts: Product[];
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    description: 'Noise-cancelling wireless headphones with premium sound quality and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    rating: 4.8,
    stock: 15
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    description: 'Track your fitness goals, receive notifications, and more with this premium smartwatch.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    rating: 4.6,
    stock: 20
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 299.99,
    description: 'Comfortable office chair with lumbar support and adjustable height for long work days.',
    image: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Furniture',
    rating: 4.5,
    stock: 8
  },
  {
    id: 4,
    name: 'Smartphone Case',
    price: 29.99,
    description: 'Durable and stylish smartphone case that provides excellent protection against drops and scratches.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Accessories',
    rating: 4.2,
    stock: 50
  },
  {
    id: 5,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Waterproof backpack with padded laptop compartment and multiple organization pockets.',
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Accessories',
    rating: 4.7,
    stock: 25
  },
  {
    id: 6,
    name: 'Wireless Charger',
    price: 49.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    rating: 4.3,
    stock: 30
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 149.99,
    description: 'RGB backlit mechanical keyboard with customizable key switches for gaming and typing.',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics',
    rating: 4.9,
    stock: 12
  },
  {
    id: 8,
    name: 'Desk Lamp',
    price: 39.99,
    description: 'LED desk lamp with adjustable brightness levels and color temperature.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Home',
    rating: 4.4,
    stock: 18
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [featuredProducts] = useState<Product[]>(sampleProducts.slice(0, 4));
  const [popularProducts] = useState<Product[]>(sampleProducts.slice(4, 8));
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate cart totals
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setCartTotal(total);
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemsCount(count);
  }, [cart]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If product already in cart, increment quantity
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Otherwise add new item with quantity 1
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider value={{
      products,
      featuredProducts,
      popularProducts,
      user,
      setUser,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemsCount
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
