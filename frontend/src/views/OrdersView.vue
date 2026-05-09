<template>
  <div class="orders-page">
    <div class="container-xl orders-page__inner">
      <div class="orders-page__header">
        <h1 class="orders-page__title">{{ $t('orders_title') }}</h1>
        <p class="orders-page__sub">{{ $t('orders_sub') }}</p>
      </div>

      <div v-if="!isLoggedIn" class="orders-state-card">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <h3>{{ $t('orders_login_title') }}</h3>
        <p>{{ $t('orders_login_sub') }}</p>
        <router-link to="/login" class="orders-btn">{{ $t('orders_login_btn') }}</router-link>
      </div>

      <div v-else-if="commandes.length === 0" class="orders-state-card">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <h3>{{ $t('orders_empty_title') }}</h3>
        <p>{{ $t('orders_empty_sub') }}</p>
        <router-link to="/products" class="orders-btn">{{ $t('orders_shop_btn') }}</router-link>
      </div>

      <div v-else>
        <div class="orders-kpis">
          <div class="kpi">
            <div class="kpi__value">{{ commandes.length }}</div>
            <div class="kpi__label">{{ commandes.length !== 1 ? $t('orders_kpi_orders_pl') : $t('orders_kpi_orders') }}</div>
          </div>
          <div class="kpi kpi--accent">
            <div class="kpi__value">{{ $cur(totalSpentRaw) }}</div>
            <div class="kpi__label">{{ $t('orders_kpi_spent') }}</div>
          </div>
          <div class="kpi">
            <div class="kpi__value">{{ translatedLastStatus }}</div>
            <div class="kpi__label">{{ $t('orders_kpi_last') }}</div>
          </div>
        </div>

        <div class="orders-list">
          <div v-for="commande in commandes" :key="commande.id_commande" class="order-card">
            <div class="order-card__left">
              <div class="order-card__id">#{{ String(commande.id_commande).padStart(5, '0') }}</div>
              <div class="order-card__date">{{ formatDate(commande.date_commande) }}</div>
            </div>
            <div class="order-card__middle">
              <span class="order-card__dot" :style="getDotStyle(commande.statut)"></span>
              <span class="order-card__status" :style="getStatusStyle(commande.statut)">
                {{ $t('status_' + commande.statut) || commande.statut }}
              </span>
            </div>
            <div class="order-card__right">
              <div class="order-card__total">{{ $cur(commande.total) }}</div>
              <router-link class="order-card__btn" :to="`/invoice/${commande.id_commande}`">
                {{ $t('orders_view_invoice') }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() { return { commandes: [] }; },
  computed: {
    isLoggedIn() { return !!localStorage.getItem('token'); },
    totalSpentRaw() { return this.commandes.reduce((s, c) => s + Number(c.total), 0); },
    translatedLastStatus() {
      if (!this.commandes.length) return '—';
      const key = 'status_' + this.commandes[0].statut;
      return this.$t(key) || this.commandes[0].statut;
    }
  },
  methods: {
    async loadCommandes() {
      if (!this.isLoggedIn) return;
      const res = await api.get('/commandes/historique');
      this.commandes = res.data;
    },
    formatDate(date) {
      const locale = this.$locale.locale === 'fr' ? 'fr-CA' : 'en-CA';
      return new Date(date).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
    },
    getDotStyle(statut) {
      const c = { 'En attente': '#f59e0b', 'Confirmée': '#3b82f6', 'Expédiée': '#8b5cf6', 'Livrée': '#10b981', 'Annulée': '#ef4444' };
      const col = c[statut] || '#94a3b8';
      return `background:${col};box-shadow:0 0 0 4px ${col}22`;
    },
    getStatusStyle(statut) {
      const m = { 'En attente': '#fef3c7,#92400e', 'Confirmée': '#dbeafe,#1e40af', 'Expédiée': '#ede9fe,#5b21b6', 'Livrée': '#d1fae5,#065f46', 'Annulée': '#fee2e2,#991b1b' };
      const v = (m[statut] || '#f1f5f9,#475569').split(',');
      return `background:${v[0]};color:${v[1]}`;
    }
  },
  mounted() { this.loadCommandes(); }
};
</script>

<style scoped>
.orders-page { background: #f8fafc; min-height: 100vh; padding: 2.5rem 0 4rem; }
.orders-page__inner { padding-inline: 1.5rem; }
.orders-page__header { margin-bottom: 2rem; }
.orders-page__title { font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0; }
.orders-page__sub { color: #64748b; font-size: 0.875rem; margin: 4px 0 0; }
.orders-state-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center; padding: 5rem 2rem; }
.orders-state-card svg { margin-bottom: 1.25rem; }
.orders-state-card h3 { font-size: 1.05rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; }
.orders-state-card p { color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem; }
.orders-btn { display: inline-block; background: #f97316; color: white; padding: 10px 24px; border-radius: 10px; font-size: 0.875rem; font-weight: 600; text-decoration: none; }
.orders-btn:hover { background: #ea6c0a; color: white; }
.orders-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
@media (max-width: 600px) { .orders-kpis { grid-template-columns: 1fr; } }
.kpi { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem 1.5rem; text-align: center; }
.kpi--accent { border-color: #fed7aa; background: #fff7ed; }
.kpi__value { font-size: 1.4rem; font-weight: 800; color: #0f172a; }
.kpi--accent .kpi__value { color: #f97316; font-size: 1.1rem; }
.kpi__label { font-size: 0.78rem; color: #64748b; margin-top: 4px; }
.orders-list { display: flex; flex-direction: column; gap: 0.75rem; }
.order-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem 1.5rem; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem; transition: box-shadow 0.15s; }
.order-card:hover { box-shadow: 0 4px 16px rgba(15,23,42,0.07); }
@media (max-width: 640px) { .order-card { grid-template-columns: 1fr; gap: 0.75rem; } }
.order-card__id { font-size: 0.95rem; font-weight: 800; color: #0f172a; }
.order-card__date { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; }
.order-card__middle { display: flex; align-items: center; justify-content: center; gap: 8px; }
.order-card__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.order-card__status { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; }
.order-card__right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.order-card__total { font-size: 1.05rem; font-weight: 800; color: #f97316; }
.order-card__btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.78rem; font-weight: 600; color: #475569; text-decoration: none; transition: all 0.15s; }
.order-card__btn:hover { background: #0f172a; color: white; border-color: #0f172a; }
</style>
