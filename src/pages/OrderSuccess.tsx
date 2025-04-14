import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="bloom-container">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We've received your order and will begin processing it right away.
            You'll receive a confirmation email shortly with your order details.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 