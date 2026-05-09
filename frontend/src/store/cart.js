import { reactive, computed } from 'vue';

// Initialize with localStorage data
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error loading cart:', e);
    return [];
  }
};

const state = reactive({
  items: loadCartFromStorage()
});

function saveCart() {
  try {
    localStorage.setItem('cart', JSON.stringify(state.items));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

const cartStore = {
  state,
  getItems() {
    return state.items;
  },
  addToCart(produit) {
    const existing = state.items.find((i) => i.id_produit === produit.id_produit);
    if (existing) {
      existing.quantite += 1;
    } else {
      state.items.push({ ...produit, quantite: 1 });
    }
    saveCart();
  },
  updateQuantity(id_produit, quantite) {
    const item = state.items.find((i) => i.id_produit === id_produit);
    if (item && quantite > 0) {
      item.quantite = quantite;
      saveCart();
    }
  },
  removeFromCart(id_produit) {
    const index = state.items.findIndex((i) => i.id_produit === id_produit);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveCart();
    }
  },
  clearCart() {
    state.items.splice(0, state.items.length);
    saveCart();
  },
  getTotal() {
    return state.items.reduce((sum, item) => sum + Number(item.prix) * Number(item.quantite), 0);
  },
  total: computed(() =>
    state.items.reduce((sum, item) => sum + Number(item.prix) * Number(item.quantite), 0)
  ),
  cartCount: computed(() =>
    state.items.reduce((sum, item) => sum + Number(item.quantite || 0), 0)
  )
};

export default cartStore;
