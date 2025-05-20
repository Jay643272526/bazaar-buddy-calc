
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCalculation } from "@/contexts/CalculationContext";
import { format } from 'date-fns';

const History = () => {
  const { history } = useCalculation();
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-bazaar-500">History</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No history yet. Save your shopping lists to see them here.
            </p>
          ) : (
            <ul className="space-y-4">
              {history.map((entry) => (
                <li key={entry.id}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {format(entry.date, 'MMMM dd, yyyy')}
                    </span>
                    <span className="font-bold">₹{entry.totalPrice}</span>
                  </div>
                  <Separator className="mt-4 mb-2" />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
