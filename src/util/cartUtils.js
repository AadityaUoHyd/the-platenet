export const calculateCartTotals = (cartItems, quantities) => {
    const subtotal = cartItems.reduce(
        (acc, food) => acc + food.price * quantities[food.id],
        0
      );
      const shipping = subtotal === 0 ? 0.0 : 20;
      const tax = subtotal * 0.05; //5% (General GST tax for online food delivery as of now by GST council of India)
      const total = subtotal + shipping + tax;

      return {subtotal, shipping, tax, total};
}