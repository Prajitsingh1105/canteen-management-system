import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // Add Item
  const addToCart = (item) => {

    setCart(prev => {

      const exist = prev.find(i => i._id === item._id);

      if (exist) {

        return prev.map(i =>
          i._id === item._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );

      }

      return [...prev, { ...item, qty: 1 }];

    });

  };

  // Increase quantity
  const increaseQty = (id) => {

    setCart(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );

  };

  // Decrease quantity
  const decreaseQty = (id) => {

    setCart(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );

  };

  // Remove item
  const removeItem = (id) => {

    setCart(prev =>
      prev.filter(item => item._id !== id)
    );

  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>

  );

};

export const useCart = () => useContext(CartContext);