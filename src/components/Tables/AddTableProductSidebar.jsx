import React, { useState } from 'react';

import { invoke } from "@tauri-apps/api/tauri";

import '../../styles/Tables/AddTableProductSidebar.css';

function AddTableProductsSidebar({ cart, setCart, tableId, closeTableProductsModal, fetchData }) {
  const total = cart.reduce((acc, item) => acc + item.precio_producto, 0);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleRemoveItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  async function addTableTransaction(tableId) {
    try {
        const response = await invoke('add_table_transaction', {
            tableId,
            cart,
        });
        fetchData();
        closeTableProductsModal();
        return response;
    } catch (error) {
        console.error('Error al agregar transacción de crédito:', error);
    }
}

  return (
    <div className='sidebar'>
      <div className='check'>
        <h2>Resumen de la boleta</h2>
        <ul>
          {Array.isArray(cart) && cart.map((item, index) => (
            <li key={index} className='cart-item'>
              <span className='item-name'>{item.nombre_producto}</span>
              <span className='item-price'>${item.precio_producto}</span>
              {isEditing && (
                <button className='remove-button' onClick={() => handleRemoveItem(index)}>
                  <svg className='remove-icon'
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                      fill="currentColor"
                    />
                    <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                    <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className='edit-button-container'>
          <button className='edit-button' onClick={toggleEditing}>
            <svg className='edit-icon'
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                fill="currentColor"
              />
              <path
                d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className='total'>
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
      <button className='pay-button' onClick={()=> addTableTransaction(tableId)} >Guardar</button>
    </div>
  );
}

export default AddTableProductsSidebar;
