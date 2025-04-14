import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, RotateCcw, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { featuredProducts, popularProducts } = useStore();

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Home', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-gray py-20">
        <div className="bloom-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-brand-lightPurple/20 text-brand-purple rounded-full">
                New Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Quality <span className="text-brand-purple">Products</span> for Your Lifestyle
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                Explore our curated collection of premium products designed to enhance your everyday experience.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button className="bg-primary hover:bg-primary/90" size="lg">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600494603989-9650cf6dad6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Hero product"
                className="rounded-lg shadow-xl object-cover w-full aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg md:p-6 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-purple/10 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Summer Sale</p>
                    <p className="text-sm text-muted-foreground">Up to 50% off</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-y">
        <div className="bloom-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">Protected payments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="bloom-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <span className="text-primary text-sm font-medium">Categories</span>
              <h2 className="text-3xl font-bold mt-2">Shop by Category</h2>
            </div>
            <Link to="/categories" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              View All Categories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/categories/${category.name.toLowerCase()}`} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-square">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="font-bold text-white text-xl">{category.name}</h3>
                    <span className="text-white/80 text-sm flex items-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-brand-gray">
        <div className="bloom-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <span className="text-primary text-sm font-medium">Featured</span>
              <h2 className="text-3xl font-bold mt-2">Featured Products</h2>
            </div>
            <Link to="/products" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner Section */}
      <section className="py-16">
        <div className="bloom-container">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Special offer banner"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center">
              <div className="pl-8 md:pl-16 space-y-4 max-w-md">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Summer Sale
                </h2>
                <p className="text-white/80 text-lg">
                  Up to 50% off on selected items. Don't miss out on these great deals!
                </p>
                <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                  Shop the Sale
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-brand-gray">
        <div className="bloom-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <span className="text-primary text-sm font-medium">Popular</span>
              <h2 className="text-3xl font-bold mt-2">Top Rated Products</h2>
            </div>
            <Link to="/products" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="bloom-container">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Subscribe to our newsletter to receive updates on new products, special offers, and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
