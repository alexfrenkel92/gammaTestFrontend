import React from 'react';

function Button ({ className, textContent, onClick }) {
  return (
    <button type='button' className={className} onClick={onClick}>
      {textContent}
    </button>
  );
}

export default Button;
