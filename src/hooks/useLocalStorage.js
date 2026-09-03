import { useState, useEffect } from 'react';

/**
 * Custom hook for synchronized state persistence in browser localStorage.
 * Handles JSON serialization, parsing, error tolerance, and default fallback.
 * 
 * @param {string} key - The localStorage storage key
 * @param {*} initialValue - The initial default state if key is not yet set
 * @returns {[any, Function]} - [storedValue, setStoredValue]
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
