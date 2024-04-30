// Sidebar.jsx
import React from 'react';

import '../styles/Sidebar.css';

function Sidebar({ cart }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <aside className="sidebar">
      <h2>Resumen de la boleta</h2>
      <ul>
        {Array.isArray(cart) && cart.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
      <div className="total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </aside>
  );
}

export default Sidebar;
