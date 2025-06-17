  // get single item from local storage

  export function getLocalItem(key) {
    try {
      const item = localStorage.getItem(key);
      return JSON.parse(item);
    } catch (error) {
      console.error('Error getting item from local storage:', error);
      return null;
    }
  }
  
  // Set an item in local storage
  export function setLocalItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting item in local storage:', error);
    }
  }
  
  // Clear all items from local storage
  export function clearLocalStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }

    // remove single item from local storage
  export function removeLocalItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from local storage:', error);
    }
  }
