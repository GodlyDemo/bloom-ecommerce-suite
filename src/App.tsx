import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, User } from 'lucide-react';
import { useStore } from './context/StoreContext';
import SearchBar from './components/SearchBar';

// Import pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';

const App = () => {
  const { cartItemsCount, isAdmin } = useStore();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="border-b">
          <div className="bloom-container py-4">
            <div className="flex items-center justify-between">
              {/* Logo and main nav */}
              <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-bold">
                  Bloom
                </Link>
                <nav className="hidden md:flex items-center gap-4">
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link to="/products" className="hover:text-primary transition-colors">
                    Products
                  </Link>
                  <Link to="/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </nav>
              </div>

              {/* Search bar */}
              <div className="flex-1 max-w-sm mx-4">
                <SearchBar />
              </div>

              {/* Right side nav */}
              <div className="flex items-center gap-4">
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t">
          <div className="bloom-container py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">About Bloom</h3>
                <p className="text-sm text-muted-foreground">
                  Your premier destination for online shopping, offering high-quality products and exceptional service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                      Categories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Shipping Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Returns & Exchanges
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bloom E-commerce. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
