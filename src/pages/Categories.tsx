import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';

const Categories = () => {
  const { products } = useStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // Get unique categories from products
    const uniqueCategories = Array.from(
      new Set(products.map(product => product.category))
    );
    setCategories(['all', ...uniqueCategories]);
  }, [products]);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="bloom-container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Categories</h1>
        </div>

        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="space-y-6"
        >
          <TabsList className="flex flex-wrap gap-2">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent
              key={category}
              value={category}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    No products found in this category
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try selecting a different category or check back later.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveCategory('all')}
                  >
                    View All Products
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Categories; 