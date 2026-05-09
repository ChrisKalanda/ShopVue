<template>
  <div class="cart-page">
    <div class="container-xl cart-page__inner">
      <div class="cart-page__header">
        <h1 class="cart-page__title">{{ $t('cart_title') }}</h1>
        <span class="cart-page__count">
          {{ cartItems.length }} {{ cartItems.length !== 1 ? $t('cart_items') : $t('cart_item') }}
        </span>
      </div>

      <div v-if="cartItems.length === 0" class="cart-empty">
        <div class="cart-empty__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
        </div>
        <h3>{{ $t('cart_empty_title') }}</h3>
        <p>{{ $t('cart_empty_sub') }}</p>
        <router-link to="/products" class="cart-empty__btn">{{ $t('cart_discover') }}</router-link>
      </div>

      <div v-else class="cart-layout">
        <!-- Articles -->
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id_produit" class="cart-item">
            <img :src="item.image || defaultImage" @error="handleImgError" class="cart-item__img" :alt="item.nom"/>
            <div class="cart-item__info">
              <div class="cart-item__name">{{ item.nom }}</div>
              <div class="cart-item__cat">{{ item.categorie }}</div>
              <div class="cart-item__unit">{{ $cur(item.prix) }} {{ $t('cart_unit') }}</div>
            </div>
            <div class="cart-item__qty">
              <button class="qty-btn" @click="changeQty(item.id_produit, item.quantite - 1)" :disabled="item.quantite <= 1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="qty-value">{{ item.quantite }}</span>
              <button class="qty-btn" @click="changeQty(item.id_produit, item.quantite + 1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <div class="cart-item__subtotal">{{ $cur(Number(item.prix) * Number(item.quantite)) }}</div>
            <button class="cart-item__remove" @click="removeItem(item.id_produit)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </button>
          </div>
          <div class="cart-items__footer">
            <router-link to="/products" class="cart-continue">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              {{ $t('cart_continue') }}
            </router-link>
            <button class="cart-clear" @click="clearCart">{{ $t('cart_clear') }}</button>
          </div>
        </div>

        <!-- Résumé -->
        <aside class="cart-summary">
          <h2 class="cart-summary__title">{{ $t('cart_subtotal') }}</h2>
          <div class="cart-summary__lines">
            <div class="cart-summary__line">
              <span>{{ $t('cart_subtotal') }} ({{ totalItems }})</span>
              <span>{{ $cur(cartTotalRaw) }}</span>
            </div>
            <div class="cart-summary__line">
              <span>{{ $t('cart_shipping') }}</span>
              <span class="cart-summary__free">{{ $t('cart_free') }}</span>
            </div>
          </div>
          <div class="cart-summary__total">
            <span>{{ $t('cart_total') }}</span>
            <span>{{ $cur(cartTotalRaw) }}</span>
          </div>
          <router-link to="/checkout" class="cart-summary__checkout">
            {{ $t('cart_checkout') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </router-link>
          <div class="cart-summary__secure">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            {{ $t('cart_secure') }}
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import cartStore from '../store/cart';

export default {
  data() { return { defaultImage: 'https://via.placeholder.com/80x80?text=?' }; },
  computed: {
    cartItems() { return cartStore.state.items; },
    cartTotalRaw() { return cartStore.getTotal(); },
    totalItems() { return cartStore.state.items.reduce((s, i) => s + Number(i.quantite), 0); }
  },
  methods: {
    changeQty(id, qty) {
      const q = parseInt(qty, 10);
      if (!isNaN(q) && q > 0) cartStore.updateQuantity(id, q);
    },
    removeItem(id) { cartStore.removeFromCart(id); },
    clearCart() {
      if (confirm(this.$t('cart_confirm_clear'))) cartStore.clearCart();
    },
    handleImgError(e) { e.target.src = this.defaultImage; }
  }
};
</script>

<style scoped>
.cart-page { background: #f8fafc; min-height: 100vh; padding: 2.5rem 0 4rem; }
.cart-page__inner { padding-inline: 1.5rem; }
.cart-page__header { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 2rem; }
.cart-page__title { font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0; }
.cart-page__count { color: #64748b; font-size: 0.88rem; }
.cart-empty { background: white; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center; padding: 5rem 2rem; }
.cart-empty__icon { margin-bottom: 1.25rem; }
.cart-empty h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; }
.cart-empty p { color: #64748b; font-size: 0.88rem; margin-bottom: 1.5rem; }
.cart-empty__btn { display: inline-block; background: #f97316; color: white; padding: 10px 24px; border-radius: 10px; font-weight: 600; font-size: 0.88rem; text-decoration: none; }
.cart-empty__btn:hover { background: #ea6c0a; color: white; }
.cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; align-items: start; }
@media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }
.cart-items { background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
.cart-item { display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }
.cart-item:last-of-type { border-bottom: none; }
.cart-item:hover { background: #fafbfc; }
.cart-item__img { width: 72px; height: 72px; object-fit: cover; border-radius: 10px; border: 1px solid #e2e8f0; flex-shrink: 0; }
.cart-item__info { flex: 1; min-width: 0; }
.cart-item__name { font-size: 0.9rem; font-weight: 700; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
.cart-item__cat { font-size: 0.75rem; color: #94a3b8; margin-bottom: 2px; }
.cart-item__unit { font-size: 0.78rem; color: #64748b; }
.cart-item__qty { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.qty-btn { width: 28px; height: 28px; border: 1px solid #e2e8f0; border-radius: 7px; background: #f8fafc; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #374151; transition: all 0.15s; }
.qty-btn:hover:not(:disabled) { background: #f97316; color: white; border-color: #f97316; }
.qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.qty-value { font-size: 0.9rem; font-weight: 700; color: #1e293b; min-width: 20px; text-align: center; }
.cart-item__subtotal { font-size: 0.95rem; font-weight: 800; color: #f97316; flex-shrink: 0; min-width: 80px; text-align: right; }
.cart-item__remove { width: 32px; height: 32px; border: none; background: transparent; color: #94a3b8; cursor: pointer; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
.cart-item__remove:hover { color: #dc2626; background: #fef2f2; }
.cart-items__footer { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; background: #fafbfc; border-top: 1px solid #f1f5f9; }
.cart-continue { display: flex; align-items: center; gap: 5px; color: #475569; font-size: 0.82rem; font-weight: 600; text-decoration: none; }
.cart-continue:hover { color: #f97316; }
.cart-clear { font-size: 0.78rem; color: #94a3b8; background: none; border: none; cursor: pointer; font-weight: 500; }
.cart-clear:hover { color: #dc2626; }
.cart-summary { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; position: sticky; top: 80px; }
.cart-summary__title { font-size: 1rem; font-weight: 800; color: #0f172a; margin: 0 0 1.25rem; }
.cart-summary__lines { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 10px; }
.cart-summary__line { display: flex; justify-content: space-between; font-size: 0.875rem; color: #475569; }
.cart-summary__free { color: #16a34a; font-weight: 600; }
.cart-summary__total { display: flex; justify-content: space-between; font-size: 1rem; font-weight: 800; color: #0f172a; border-top: 1px solid #e2e8f0; padding-top: 1rem; margin-bottom: 1.25rem; }
.cart-summary__checkout { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; background: #f97316; color: white; padding: 13px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: background 0.15s; margin-bottom: 1rem; }
.cart-summary__checkout:hover { background: #ea6c0a; color: white; }
.cart-summary__secure { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.75rem; color: #94a3b8; }
</style>
