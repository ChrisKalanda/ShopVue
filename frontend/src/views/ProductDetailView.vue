<template>
  <div class="container py-5" v-if="produit">
    <div class="row g-4">
      <div class="col-md-5">
        <div class="product-detail-image rounded shadow-sm overflow-hidden">
          <img :src="produit.image || defaultImage" @error="handleImageError" class="img-fluid w-100">
        </div>
      </div>
      <div class="col-md-7">
        <div class="p-4 rounded bg-white shadow-sm">
          <h2 class="mb-3">{{ produit.nom }}</h2>
          <p class="text-muted mb-2">Catégorie : {{ produit.categorie }}</p>
          <p class="mb-4 text-muted">{{ produit.description }}</p>
          <div class="d-flex align-items-center gap-3 mb-4">
            <h4 class="text-primary mb-0">{{ Number(produit.prix).toFixed(2) }} $</h4>
            <span class="badge bg-success">En stock : {{ produit.stock }}</span>
          </div>
          <button class="btn btn-success btn-lg" @click="addToCart">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import cartStore from '../store/cart';

export default {
  data() {
    return {
      produit: null,
      defaultImage: 'https://via.placeholder.com/600x400?text=Image+indisponible'
    };
  },
  methods: {
    async loadProduit() {
      const res = await api.get(`/produits/${this.$route.params.id}`);
      this.produit = res.data;
    },
    addToCart() {
      cartStore.addToCart(this.produit);
      alert('Produit ajouté au panier.');
    },
    handleImageError(event) {
      event.target.src = this.defaultImage;
    }
  },
  mounted() {
    this.loadProduit();
  }
};
</script>

<style scoped>
.product-detail-image {
  min-height: 360px;
  background: #f8f9fa;
}
</style>
