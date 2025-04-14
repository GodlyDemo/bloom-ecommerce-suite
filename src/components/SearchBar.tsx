import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const SearchBar = () => {
  const navigate = useNavigate();
  const { products } = useStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    if (!value) {
      setSearchResults(products);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  }, [value, products]);

  const handleSelect = (productId: string) => {
    setOpen(false);
    setValue('');
    navigate(`/products/${productId}`);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex w-full items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="w-full pl-8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setOpen(true)}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search products..."
              value={value}
              onValueChange={setValue}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Products">
                {searchResults.slice(0, 10).map(product => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleSelect(product.id)}
                    className="flex items-center gap-2 p-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-8 w-8 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ${product.price?.toString()}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar; 