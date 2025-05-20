
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCalculation } from "@/contexts/CalculationContext";
import { toast } from "sonner";

const Calculator = () => {
  const [pricePerKg, setPricePerKg] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [itemName, setItemName] = useState<string>('');
  const { calculatePrice, addItem } = useCalculation();
  
  const handleCalculate = () => {
    const price = parseFloat(pricePerKg);
    const qty = parseFloat(quantity);
    
    if (isNaN(price) || isNaN(qty) || price <= 0 || qty <= 0) {
      toast.error("Please enter valid numbers for price and quantity");
      return;
    }
    
    const result = calculatePrice(price, qty);
    setCalculatedPrice(result);
  };
  
  const handleAddToList = () => {
    if (calculatedPrice === null) {
      handleCalculate();
      if (calculatedPrice === null) return; 
    }
    
    const price = parseFloat(pricePerKg);
    const qty = parseFloat(quantity);
    
    if (!itemName) {
      toast.error("Please enter an item name");
      return;
    }
    
    addItem({
      name: itemName,
      pricePerKg: price,
      quantity: qty,
      unit: 'g',
      totalPrice: calculatedPrice ?? calculatePrice(price, qty)
    });
    
    toast.success(`${itemName} added to list`);
    
    // Clear form for next entry
    setItemName('');
    setPricePerKg('');
    setQuantity('');
    setCalculatedPrice(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-bazaar-500">Daily Price Calculator</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item name</Label>
            <Input
              id="itemName"
              type="text"
              placeholder="e.g., Potatoes"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pricePerKg">Enter price per kg (₹)</Label>
            <Input
              id="pricePerKg"
              type="number"
              placeholder="e.g., 28"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Enter quantity (in grams)</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="e.g., 250"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          
          <Button 
            className="w-full bg-bazaar-500 hover:bg-bazaar-600 text-white"
            onClick={handleCalculate}
          >
            Calculate
          </Button>
          
          {calculatedPrice !== null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                {quantity} g = ₹{calculatedPrice}
              </p>
              
              <Button 
                className="mt-2 w-full bg-bazaar-400 hover:bg-bazaar-500 text-white"
                onClick={handleAddToList}
              >
                Add to List
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
