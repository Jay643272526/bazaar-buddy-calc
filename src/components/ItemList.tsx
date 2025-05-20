
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCalculation } from "@/contexts/CalculationContext";
import { TrashIcon } from "lucide-react";

const ItemList = () => {
  const { currentItems, removeItem, totalPrice, saveToHistory } = useCalculation();
  
  const handleSaveList = () => {
    if (currentItems.length === 0) {
      toast.error("No items to save");
      return;
    }
    
    saveToHistory();
    toast.success("Shopping list saved to history");
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-bazaar-500">Item List</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {currentItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No items added yet. Add items from the calculator.
            </p>
          ) : (
            <ul className="space-y-4">
              {currentItems.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">₹{item.totalPrice}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        
        {currentItems.length > 0 && (
          <CardFooter className="flex justify-between border-t p-4">
            <div className="font-bold text-lg">Total: ₹{totalPrice}</div>
            <Button 
              onClick={handleSaveList}
              className="bg-bazaar-500 hover:bg-bazaar-600 text-white"
            >
              Save List
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ItemList;
