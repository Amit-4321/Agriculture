import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  savedItems: JSON.parse(localStorage.getItem('savedItems')) || [],
  orders: JSON.parse(localStorage.getItem('orders')) || [],
};

const cartReducer = (state, action) => {
  let updatedCart, updatedSaved;

  switch (action.type) {
    case 'ADD_TO_CART':
      updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      return { ...state, cart: updatedCart };

    case 'REMOVE_FROM_CART':
      updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      return { ...state, cart: updatedCart };

    case 'UPDATE_QUANTITY':
      updatedCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, item.quantity + action.payload.delta) }
          : item
      );
      return { ...state, cart: updatedCart };

    case 'SAVE_FOR_LATER':
      updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      updatedSaved = [...state.savedItems, action.payload];
      return { ...state, cart: updatedCart, savedItems: updatedSaved };

    case 'MOVE_TO_CART':
      updatedSaved = state.savedItems.filter(item => item.id !== action.payload.id);
      updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      return { ...state, cart: updatedCart, savedItems: updatedSaved };

    case 'REMOVE_FROM_SAVED':
      updatedSaved = state.savedItems.filter(item => item.id !== action.payload.id);
      return { ...state, savedItems: updatedSaved };

    case 'PLACE_ORDER':
      const updatedOrders = [...state.orders, action.payload];
      return {
        ...state,
        cart: [],
        orders: updatedOrders,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('savedItems', JSON.stringify(state.savedItems));
  }, [state.cart, state.savedItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.orders]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        savedItems: state.savedItems,
        orders: state.orders,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
