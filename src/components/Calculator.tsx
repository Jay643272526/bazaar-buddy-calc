
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCalculation } from "@/contexts/CalculationContext";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type CalculationMode = 'price' | 'weight';

const Calculator = () => {
  const [mode, setMode] = useState<CalculationMode>('price');
  const [pricePerKg, setPricePerKg] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [calculatedWeight, setCalculatedWeight] = useState<number | null>(null);
  const [itemName, setItemName] = useState<string>('');
  const { calculatePrice, calculateWeight, addItem } = useCalculation();
  
  const handleCalculate = () => {
    const price = parseFloat(pricePerKg);
    
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price per kg/liter");
      return;
    }
    
    if (mode === 'price') {
      const qty = parseFloat(quantity);
      
      if (isNaN(qty) || qty <= 0) {
        toast.error("Please enter a valid quantity");
        return;
      }
      
      const result = calculatePrice(price, qty);
      setCalculatedPrice(result);
      setCalculatedWeight(null);
    } else {
      const amt = parseFloat(amount);
      
      if (isNaN(amt) || amt <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      
      const result = calculateWeight(price, amt);
      setCalculatedWeight(result);
      setCalculatedPrice(null);
    }
  };
  
  const handleModeChange = (value: string) => {
    if (value === 'price' || value === 'weight') {
      setMode(value);
      // Reset calculated values when switching modes
      setCalculatedPrice(null);
      setCalculatedWeight(null);
    }
  };
  
  const handleAddToList = () => {
    if (!itemName) {
      toast.error("Please enter an item name");
      return;
    }
    
    const price = parseFloat(pricePerKg);
    
    if (mode === 'price') {
      if (calculatedPrice === null) {
        handleCalculate();
        if (calculatedPrice === null) return;
      }
      
      const qty = parseFloat(quantity);
      
      addItem({
        name: itemName,
        pricePerKg: price,
        quantity: qty,
        unit: 'g',
        totalPrice: calculatedPrice ?? calculatePrice(price, qty)
      });
    } else {
      if (calculatedWeight === null) {
        handleCalculate();
        if (calculatedWeight === null) return;
      }
      
      const amt = parseFloat(amount);
      
      addItem({
        name: itemName,
        pricePerKg: price,
        quantity: calculatedWeight,
        unit: 'g',
        totalPrice: amt
      });
    }
    
    toast.success(`${itemName} added to list`);
    
    // Clear form for next entry
    setItemName('');
    setPricePerKg('');
    setQuantity('');
    setAmount('');
    setCalculatedPrice(null);
    setCalculatedWeight(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-bazaar-500">Daily Price Calculator</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-center mb-2">
            <ToggleGroup type="single" value={mode} onValueChange={handleModeChange} className="bg-bazaar-100 rounded-md">
              <ToggleGroupItem value="price" className="data-[state=on]:bg-bazaar-500 data-[state=on]:text-white">
                Calculate Price
              </ToggleGroupItem>
              <ToggleGroupItem value="weight" className="data-[state=on]:bg-bazaar-500 data-[state=on]:text-white">
                Calculate Weight
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
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
            <Label htmlFor="pricePerKg">Enter price per kg/liter (₹)</Label>
            <Input
              id="pricePerKg"
              type="number"
              placeholder="e.g., 28"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
            />
          </div>
          
          {mode === 'price' ? (
            <div className="space-y-2">
              <Label htmlFor="quantity">Enter quantity (in grams/ml)</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 250"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="amount">Enter amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}
          
          <Button 
            className="w-full bg-bazaar-500 hover:bg-bazaar-600 text-white"
            onClick={handleCalculate}
          >
            Calculate
          </Button>
          
          {calculatedPrice !== null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                {quantity}g = ₹{calculatedPrice}
              </p>
              
              <Button 
                className="mt-2 w-full bg-bazaar-400 hover:bg-bazaar-500 text-white"
                onClick={handleAddToList}
              >
                Add to List
              </Button>
            </div>
          )}
          
          {calculatedWeight !== null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                ₹{amount} = {calculatedWeight}g
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
