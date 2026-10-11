import React from 'react';

/**
 * Safely scrolls to an element on the page without modifying window.location.hash,
 * preventing iframe reloading and unwanted page refreshes.
 */
export const scrollToElement = (targetId: string, e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  const cleanId = targetId.replace(/^#/, '');
  if (cleanId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const element = document.getElementById(cleanId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
