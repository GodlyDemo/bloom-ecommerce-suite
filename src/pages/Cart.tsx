
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  
  // Calculate shipping cost (free over $50, otherwise $4.99)
  const shippingCost = cartTotal >= 50 || cartTotal === 0 ? 0 : 4.99;
  const taxRate = 0.08; // 8% tax rate
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;

  const handleCheckout = () => {
    // In a real app, we would redirect to a checkout page or process
    // For now, we'll just show a success message and clear the cart
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bloom-container py-12 flex-1 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="bg-muted/30 p-6 rounded-full inline-flex items-center justify-center mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bloom-container py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-muted/30">
                <h2 className="font-semibold">Cart Items ({cart.length})</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground"
                  onClick={() => {
                    if (confirm('Are you sure you want to empty your cart?')) {
                      clearCart();
                      toast.success('Cart cleared');
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
              
              <div className="divide-y">
                {cart.map(item => (
                  <div key={item.product.id} className="p-4 flex gap-4">
                    <Link to={`/products/${item.product.id}`} className="shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </Link>
                    
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between">
                        <Link 
                          to={`/products/${item.product.id}`}
                          className="font-medium line-clamp-1 hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      <span className="text-sm text-muted-foreground mb-2">
                        ${item.product.price.toFixed(2)} each
                      </span>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground"
                          onClick={() => {
                            removeFromCart(item.product.id);
                            toast.success(`Removed ${item.product.name} from cart`);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Link to="/products" className="text-primary flex items-center hover:underline">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Continue Shopping
              </Link>
              
              <Button 
                onClick={() => navigate('/checkout')}
                className="bg-primary hover:bg-primary/90"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg overflow-hidden sticky top-20">
              <div className="p-4 bg-muted/30">
                <h2 className="font-semibold">Order Summary</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg" 
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>We accept all major credit cards</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 pt-2">
                  <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/128/349/349235.png" alt="PayPal" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
