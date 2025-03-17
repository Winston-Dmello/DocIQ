const listeners = [];

const SnackbarService = {
  // Function to show a snackbar
  showSnackbar: (message, options = {}) => {
    const snackbarData = {
      message,
      severity: options.severity || 'info',
      duration: options.duration || 2000,
      vertical: options.vertical || 'top',
      horizontal: options.horizontal || 'center',
      variant: options.variant || 'filled'
    };
    
    // Notify all listeners
    listeners.forEach(listener => listener(snackbarData));
  },
  
  // Add listener
  addListener: (listener) => {
    listeners.push(listener);
    // Return unsubscribe function
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }
};

export default SnackbarService;