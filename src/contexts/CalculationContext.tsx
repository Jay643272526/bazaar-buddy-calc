
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Item {
  id: string;
  name: string;
  pricePerKg: number;
  quantity: number;
  unit: 'g' | 'ml';
  totalPrice: number;
  timestamp: Date;
}

interface HistoryEntry {
  id: string;
  items: Item[];
  totalPrice: number;
  date: Date;
}

interface CalculationContextType {
  currentItems: Item[];
  addItem: (item: Omit<Item, 'id' | 'timestamp'>) => void;
  removeItem: (id: string) => void;
  editItem: (id: string, updatedItem: Partial<Omit<Item, 'id' | 'timestamp'>>) => void;
  clearItems: () => void;
  calculatePrice: (pricePerKg: number, quantity: number) => number;
  calculateWeight: (pricePerKg: number, amount: number) => number;
  history: HistoryEntry[];
  saveToHistory: () => void;
  totalPrice: number;
}

const CalculationContext = createContext<CalculationContextType | undefined>(undefined);

export const useCalculation = () => {
  const context = useContext(CalculationContext);
  if (!context) {
    throw new Error('useCalculation must be used within a CalculationProvider');
  }
  return context;
};

export const CalculationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Load saved data from localStorage on initialization
  useEffect(() => {
    const savedItems = localStorage.getItem('bazaarBuddy_items');
    const savedHistory = localStorage.getItem('bazaarBuddy_history');
    
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setCurrentItems(parsedItems.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (err) {
        console.error('Error parsing saved items:', err);
      }
    }
    
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          items: entry.items.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }))
        })));
      } catch (err) {
        console.error('Error parsing saved history:', err);
      }
    }
  }, []);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('bazaarBuddy_items', JSON.stringify(currentItems));
  }, [currentItems]);
  
  useEffect(() => {
    localStorage.setItem('bazaarBuddy_history', JSON.stringify(history));
  }, [history]);
  
  // Update total price whenever items change
  useEffect(() => {
    const total = currentItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  }, [currentItems]);
  
  const calculatePrice = (pricePerKg: number, quantity: number): number => {
    // Convert to price per gram/ml then multiply by quantity
    const price = (pricePerKg / 1000) * quantity;
    return Math.round(price);
  };
  
  const calculateWeight = (pricePerKg: number, amount: number): number => {
    // Convert amount to weight in grams/ml
    const weight = (amount / pricePerKg) * 1000;
    return Math.round(weight);
  };
  
  const addItem = (item: Omit<Item, 'id' | 'timestamp'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date(),
      totalPrice: item.totalPrice
    };
    
    setCurrentItems(prev => [...prev, newItem]);
  };
  
  const removeItem = (id: string) => {
    setCurrentItems(prev => prev.filter(item => item.id !== id));
  };
  
  const editItem = (id: string, updatedItem: Partial<Omit<Item, 'id' | 'timestamp'>>) => {
    setCurrentItems(prev => prev.map(item => {
      if (item.id === id) {
        const newItem = {
          ...item,
          ...updatedItem
        };
        
        // Recalculate price if price or quantity changed
        if (updatedItem.pricePerKg !== undefined || updatedItem.quantity !== undefined) {
          newItem.totalPrice = calculatePrice(
            updatedItem.pricePerKg ?? item.pricePerKg,
            updatedItem.quantity ?? item.quantity
          );
        }
        
        return newItem;
      }
      return item;
    }));
  };
  
  const clearItems = () => {
    setCurrentItems([]);
  };
  
  const saveToHistory = () => {
    if (currentItems.length === 0) return;
    
    const historyEntry: HistoryEntry = {
      id: Date.now().toString(),
      items: [...currentItems],
      totalPrice,
      date: new Date()
    };
    
    // Keep only the 10 most recent entries
    setHistory(prev => {
      const newHistory = [historyEntry, ...prev];
      if (newHistory.length > 10) {
        return newHistory.slice(0, 10);
      }
      return newHistory;
    });
    
    // Clear the current items after saving to history
    clearItems();
  };
  
  const value: CalculationContextType = {
    currentItems,
    addItem,
    removeItem,
    editItem,
    clearItems,
    calculatePrice,
    calculateWeight,
    history,
    saveToHistory,
    totalPrice
  };
  
  return (
    <CalculationContext.Provider value={value}>
      {children}
    </CalculationContext.Provider>
  );
};
