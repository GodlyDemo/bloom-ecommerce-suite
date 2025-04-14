
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, Share2, Truck, RotateCcw, ShieldCheck, Minus, Plus, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '../components/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, featuredProducts } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const productId = parseInt(id || '0');
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="bloom-container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }

  // Mock additional product images
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'Emma Thompson',
      date: '2023-06-15',
      rating: 5,
      comment: 'Absolutely love this product! The quality is outstanding and it works exactly as described. Highly recommend to anyone looking for this type of item.',
    },
    {
      id: 2,
      user: 'Michael Johnson',
      date: '2023-05-30',
      rating: 4,
      comment: 'Great product overall. Only giving 4 stars because shipping took a bit longer than expected, but the product itself is excellent.',
    },
    {
      id: 3,
      user: 'Sarah Williams',
      date: '2023-05-12',
      rating: 5,
      comment: 'This exceeded my expectations! The build quality is excellent and it has all the features I needed. Customer service was also very helpful when I had questions.',
    },
  ];

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Add the product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
  };

  const handleAddToWishlist = () => {
    toast.success(`Added ${product.name} to wishlist!`);
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bloom-container py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link to="/products" className="ml-1 text-muted-foreground hover:text-foreground">Products</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link to={`/categories/${product.category.toLowerCase()}`} className="ml-1 text-muted-foreground hover:text-foreground">
                  {product.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="ml-1 font-medium truncate">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-border">
              <img 
                src={productImages[activeImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${
                    activeImageIndex === index ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </div>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Quantity</h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">For orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-muted-foreground">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Secure Checkout</p>
                  <p className="text-sm text-muted-foreground">Safe & protected payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start mb-8">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <p>
                {product.description}
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>High-quality materials</li>
                    <li>Durable construction</li>
                    <li>Modern design</li>
                    <li>Easy to use</li>
                    <li>Compatible with most devices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Specifications</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">Bloom Tech</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-medium">BT-{product.id}00</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">10 x 8 x 3 inches</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">1.2 lbs</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Warranty</span>
                      <span className="font-medium">1 Year</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-1">
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{product.rating}</div>
                      <div className="flex justify-center mt-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Based on {reviews.length} reviews
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = reviews.filter(r => Math.floor(r.rating) === star).length;
                        const percentage = (count / reviews.length) * 100 || 0;
                        
                        return (
                          <div key={star} className="flex items-center">
                            <span className="w-8 text-sm text-muted-foreground">{star} star</span>
                            <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-yellow-400 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-8 text-sm text-right text-muted-foreground">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{review.user}</h4>
                          <div className="flex items-center mt-1">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="ml-2 text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Report
                        </Button>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <h3 className="text-xl font-semibold">Shipping Information</h3>
              <p className="text-muted-foreground">
                We offer several shipping options to meet your needs:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium">Standard Shipping (3-5 business days):</span> Free on orders over $50, otherwise $4.99
                </li>
                <li>
                  <span className="font-medium">Express Shipping (2-3 business days):</span> $9.99
                </li>
                <li>
                  <span className="font-medium">Next Day Delivery:</span> $19.99 (order must be placed before 2 PM EST)
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8">Return Policy</h3>
              <p className="text-muted-foreground">
                We want you to be completely satisfied with your purchase. If you're not, we offer a hassle-free return policy:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Returns accepted within 30 days of delivery</li>
                <li>Item must be unused and in original packaging</li>
                <li>Return shipping is free for defective items</li>
                <li>For non-defective returns, customer is responsible for return shipping costs</li>
                <li>Refunds are processed within 5-7 business days after receiving the returned item</li>
              </ul>
              
              <p className="mt-4 text-muted-foreground">
                For more information or assistance with returns, please contact our customer service team.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
