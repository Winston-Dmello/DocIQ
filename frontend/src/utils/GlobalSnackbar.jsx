import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SnackbarService from './SnackbarService';

function GlobalSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
    duration: 3000,
    vertical: 'top',
    horizontal: 'center',
    variant: 'filled',
  });

  useEffect(() => {
    // Subscribe to snackbar service
    const unsubscribe = SnackbarService.addListener((data) => {
      setSnackbar({ ...data, open: true });
    });
    
    // Clean up subscription
    return unsubscribe;
  }, []);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.duration}
      onClose={handleClose}
      anchorOrigin={{
        vertical: snackbar.vertical,
        horizontal: snackbar.horizontal
      }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant={snackbar.variant}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default GlobalSnackbar;