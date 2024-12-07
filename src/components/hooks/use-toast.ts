
import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';

export function useToast() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const hideToast = () => {
    setOpen(false);
    setMessage(null);
  };

  return {
    open,
    message,
    showToast,
    hideToast,
  };
}
