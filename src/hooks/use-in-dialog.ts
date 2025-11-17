import { useState, useEffect } from "react";

export function useInDialog() {
  const [isInDialog, setIsInDialog] = useState(false);

  useEffect(() => {
    // Check if we're in a dialog by looking for a dialog parent
    const checkIfInDialog = () => {
      const dialog = document.querySelector('[role="dialog"]');
      setIsInDialog(!!dialog);
    };

    // Initial check
    checkIfInDialog();

    // Set up a mutation observer to check for dialog changes
    const observer = new MutationObserver(checkIfInDialog);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return isInDialog;
}
