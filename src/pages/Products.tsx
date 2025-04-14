import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, SlidersHorizontal, Grid3X3, Grid2X2 } from 'lucide-react';
import { useStore, Product } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FilterState = {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  stockStatus: string;
};

const Products = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [columns, setColumns] = useState<2 | 3>(3);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    minRating: 0,
    stockStatus: 'all',
  });

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    result = result.filter(product => product.rating >= filters.minRating);
    
    // Apply stock status filter
    if (filters.stockStatus === 'inStock') {
      result = result.filter(product => product.stock > 0);
    } else if (filters.stockStatus === 'outOfStock') {
      result = result.filter(product => product.stock === 0);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, we would sort by date
        // Here we'll sort by ID as a placeholder
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep the original order for featured
        break;
    }
    
    setFilteredProducts(result);
  }, [products, filters, sortBy, searchQuery]);

  const toggleCategory = (category: string) => {
    setFilters(prev => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      };
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1] || prev.priceRange[1]]
    }));
  };

  const handleRatingChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      minRating: value[0]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      minRating: 0,
      stockStatus: 'all',
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bloom-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} results
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant={view === 'grid' && columns === 3 ? 'default' : 'outline'} 
                size="icon"
                onClick={() => { setView('grid'); setColumns(3); }}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'grid' && columns === 2 ? 'default' : 'outline'} 
                size="icon"
                onClick={() => { setView('grid'); setColumns(2); }}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar (always visible on desktop, toggleable on mobile) */}
          <div className={`md:w-1/4 lg:w-1/5 space-y-6 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center justify-between md:hidden">
              <h2 className="font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="space-y-2">
              <Label>Search</Label>
              <Input 
                type="search" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Price Range</h3>
                <span className="text-sm text-muted-foreground">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </span>
              </div>
              <Slider 
                defaultValue={[0, 500]} 
                min={0} 
                max={500}
                step={10}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
              />
            </div>
            
            {/* Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Rating</h3>
                <span className="text-sm text-muted-foreground">
                  {filters.minRating}+ stars
                </span>
              </div>
              <Slider 
                defaultValue={[0]} 
                min={0} 
                max={5}
                step={0.5}
                value={[filters.minRating]}
                onValueChange={handleRatingChange}
              />
            </div>
            
            {/* Stock Status */}
            <div className="space-y-2">
              <h3 className="font-medium">Stock Status</h3>
              <Select 
                value={filters.stockStatus}
                onValueChange={(value) => setFilters(prev => ({ ...prev, stockStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="inStock">In Stock</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Clear Filters */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
              } gap-6`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
