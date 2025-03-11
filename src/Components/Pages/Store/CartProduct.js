import React from 'react';
import './CartProduct.css';

export default function CartProduct(props) {
  const { title, images, price, id, quantity, onUpdateQuantity, onRemove } = props;

  const removeProductFromCart = () => {
    onRemove(id);
  };

  const addClickHandler = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const minusClickHandler = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      removeProductFromCart();
    }
  };

  const finalPrice = price * quantity;

  return (
    <div className="cart-row">
      <div className="cart-item cart-column">
        <img
          className="cart-item-image"
          src={Array.isArray(images) ? images[0] : images}
          alt={title}
          width={100}
          height={100}
        />
        <span className="cart-item-title">{title}</span>
      </div>

      <span className="cart-price cart-column">${finalPrice.toFixed(2)}</span>

      <div className="cart-quantity">
        <button className="btn-minus" onClick={minusClickHandler}>-</button>
        <span className="quantity cart-column">{quantity}</span>
        <button className="btn-plus" onClick={addClickHandler}>+</button>
      </div>

      <div className="cart-quantity cart-column">
        <button
          className="btn btn-danger remove-button"
          type="button"
          onClick={removeProductFromCart}
        >
          <span className="remove-text">REMOVE</span>
        </button>
      </div>
    </div>
  );
}
