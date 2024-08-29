import { useState, useEffect } from 'react';

function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      // Parse JSON or use initialValue if null
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prevValue) => {
      const newValue = value instanceof Function ? value(prevValue) : value;
      return newValue;
    });
  };

  return [storedValue, setValue] as const;
}

export default useSessionStorage;
