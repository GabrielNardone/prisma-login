import { useState } from 'react';

function useSidebar(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  function open() {
    setIsOpen((prev) => !prev);
  }

  return { isOpen, open };
}

export default useSidebar;
