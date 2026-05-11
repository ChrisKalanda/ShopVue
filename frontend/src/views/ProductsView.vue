<template>
  <div class="shop-page">
    <div class="shop-header">
      <div class="container-xl shop-header__inner">
        <div>
          <h1 class="shop-header__title">{{ $t('shop_title') }}</h1>
          <p class="shop-header__sub">
            {{ produits.length }} {{ produits.length !== 1 ? $t('shop_products') : $t('shop_product') }}
            {{ produits.length !== 1 ? $t('shop_availables') : $t('shop_available') }}
          </p>
        </div>
        <div class="shop-search">
          <svg class="shop-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="search" @input="loadProduits" class="shop-search__input" :placeholder="$t('shop_search')">
        </div>
      </div>
    </div>

    <div class="container-xl shop-body">
      <div class="shop-filters">
        <button class="filter-tag" :class="{ 'filter-tag--active': !categorie }" @click="setCategorie('')">
          {{ $t('shop_all') }}
        </button>
        <button
          v-for="cat in uniqueCategories" :key="cat"
          class="filter-tag"
          :class="{ 'filter-tag--active': categorie === cat }"
          @click="setCategorie(cat)"
        >{{ cat }}</button>
      </div>

      <div v-if="produits.length === 0" class="shop-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h4>{{ $t('shop_empty') }}</h4>
        <p>{{ $t('shop_empty_sub') }}</p>
      </div>

      <div v-else class="shop-grid">
        <div v-for="produit in produits" :key="produit.id_produit" class="product-card">
          <div class="product-card__img-wrap">
            <img :src="produit.image || defaultImage" @error="handleImageError" :alt="produit.nom" class="product-card__img" loading="lazy"/>
            <span class="product-card__badge" :style="getCategoryStyle(produit.categorie)">{{ produit.categorie }}</span>
            <span v-if="produit.stock <= 5 && produit.stock > 0" class="product-card__stock-badge">
              {{ $t('shop_low_stock') }} {{ produit.stock }}
            </span>
            <span v-if="produit.stock === 0" class="product-card__stock-badge product-card__stock-badge--out">
              {{ $t('shop_out_of_stock') }}
            </span>
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">{{ produit.nom }}</h3>
            <p class="product-card__desc">{{ produit.description.substring(0, 65) }}…</p>
            <div class="product-card__footer">
              <div class="product-card__price">{{ $cur(produit.prix) }}</div>
              <div class="product-card__actions">
                <router-link class="product-card__btn product-card__btn--ghost" :to="`/products/${produit.id_produit}`">
                  {{ $t('shop_details') }}
                </router-link>
                <button
                  class="product-card__btn product-card__btn--primary"
                  :disabled="produit.stock === 0"
                  @click="addToCart(produit)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  {{ $t('shop_add') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="cart-toast">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        {{ $t('shop_added') }}
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../services/api';
import cartStore from '../store/cart';

export default {
  data() {
    return {
      produits: [], allProduits: [],
      search: '', categorie: '',
      toast: false, toastTimer: null,
      defaultImage: 'https://via.placeholder.com/400x300?text=?'
    };
  },
  computed: {
    uniqueCategories() {
      return [...new Set(this.allProduits.map(p => p.categorie))].sort();
    }
  },
  methods: {
    getCategoryStyle(cat) {
      const map = {
        'Informatique': { background: '#dbeafe', color: '#1d4ed8' },
        'Audio': { background: '#fae8ff', color: '#86198f' },
        'Accessoires': { background: '#fff7ed', color: '#c2410c' },
        'Maison': { background: '#dcfce7', color: '#15803d' },
        'Bureau': { background: '#ede9fe', color: '#6d28d9' },
        'Sport': { background: '#ffe4e6', color: '#be123c' },
        'Téléphonie': { background: '#e0f2fe', color: '#0369a1' },
        'Photo': { background: '#f0fdf4', color: '#166534' }
      };
      const s = map[cat] || { background: '#f1f5f9', color: '#475569' };
      return `background:${s.background};color:${s.color}`;
    },
    setCategorie(cat) { this.categorie = cat; this.loadProduits(); },
    async loadProduits() {
      const params = new URLSearchParams();
      if (this.search) params.append('search', this.search);
      if (this.categorie) params.append('categorie', this.categorie);
      const res = await api.get(`/produits?${params}`);
      this.produits = res.data;
    },
    async loadAllProduits() {
      const res = await api.get('/produits');
      this.allProduits = res.data;
    },
    addToCart(produit) {
      cartStore.addToCart(produit);
      clearTimeout(this.toastTimer);
      this.toast = true;
      this.toastTimer = setTimeout(() => { this.toast = false; }, 2500);
    },
    handleImageError(e) { e.target.src = this.defaultImage; }
  },
  watch: {
    '$route.query'() {
      this.categorie = this.$route.query.categorie || '';
      this.search = this.$route.query.search || '';
      this.loadProduits();
    }
  },
  mounted() {
    this.categorie = this.$route.query.categorie || '';
    this.search = this.$route.query.search || '';
    this.loadAllProduits();
    this.loadProduits();
  }
};
</script>

<style scoped>
.shop-page { background: #f8fafc; min-height: 100vh; }
.shop-header { background: white; border-bottom: 1px solid #e2e8f0; padding: 2rem 0; }
.shop-header__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; padding-inline: 1.5rem; }
.shop-header__title { font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0; }
.shop-header__sub { color: #64748b; font-size: 0.85rem; margin: 4px 0 0; }
.shop-search { position: relative; flex: 0 0 320px; }
@media (max-width: 600px) { .shop-search { flex: 1 1 100%; } }
.shop-search__icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
.shop-search__input { width: 100%; padding: 10px 14px 10px 38px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.88rem; background: #f8fafc; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.shop-search__input:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); background: white; }
.shop-body { padding: 1.75rem 1.5rem 4rem; }
.shop-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
.filter-tag { padding: 6px 16px; border-radius: 100px; font-size: 0.82rem; font-weight: 600; border: 1px solid #e2e8f0; background: white; color: #475569; cursor: pointer; transition: all 0.15s; }
.filter-tag:hover { border-color: #f97316; color: #f97316; }
.filter-tag--active { background: #f97316; color: white; border-color: #f97316; }
.shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
.product-card { background: white; border: 1px solid #e8edf2; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s, transform 0.2s; }
.product-card:hover { box-shadow: 0 12px 32px rgba(15,23,42,0.1); transform: translateY(-3px); }
.product-card__img-wrap { position: relative; height: 200px; overflow: hidden; background: #f1f5f9; }
.product-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.product-card:hover .product-card__img { transform: scale(1.04); }
.product-card__badge { position: absolute; top: 10px; left: 10px; padding: 3px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 700; }
.product-card__stock-badge { position: absolute; bottom: 10px; left: 10px; background: #fef3c7; color: #92400e; padding: 3px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 700; }
.product-card__stock-badge--out { background: #fee2e2; color: #991b1b; }
.product-card__body { padding: 1.1rem; display: flex; flex-direction: column; flex: 1; }
.product-card__name { font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0 0 6px; line-height: 1.4; }
.product-card__desc { font-size: 0.8rem; color: #64748b; line-height: 1.6; flex: 1; margin-bottom: 1rem; }
.product-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.product-card__price { font-size: 1.05rem; font-weight: 800; color: #f97316; white-space: nowrap; }
.product-card__actions { display: flex; gap: 0.4rem; }
.product-card__btn { padding: 7px 12px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.15s; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; border: none; }
.product-card__btn--ghost { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
.product-card__btn--ghost:hover { background: #e2e8f0; color: #1e293b; }
.product-card__btn--primary { background: #f97316; color: white; }
.product-card__btn--primary:hover:not(:disabled) { background: #ea6c0a; }
.product-card__btn--primary:disabled { background: #cbd5e1; color: #94a3b8; cursor: not-allowed; }
.shop-empty { text-align: center; padding: 5rem 2rem; color: #94a3b8; }
.shop-empty svg { margin-bottom: 1rem; }
.shop-empty h4 { color: #475569; font-size: 1.1rem; margin-bottom: 0.5rem; }
.shop-empty p { font-size: 0.88rem; }
.cart-toast { position: fixed; bottom: 2rem; right: 2rem; background: #0f172a; color: white; padding: 12px 20px; border-radius: 12px; font-size: 0.88rem; font-weight: 600; display: flex; align-items: center; gap: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); z-index: 9999; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(16px) scale(0.9); }
</style>
