<template>
  <div class="inv-page">
    <div v-if="loading" class="text-center py-5"><div class="spinner-border text-primary"></div></div>

    <div v-else-if="invoiceData">
      <!-- Toolbar -->
      <div class="inv-toolbar no-print">
        <div class="inv-toolbar__inner">
          <router-link to="/orders" class="inv-toolbar__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            {{ $t('inv_back') }}
          </router-link>
          <button class="inv-toolbar__print" @click="printInvoice">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            {{ $t('inv_print') }}
          </button>
        </div>
      </div>

      <div class="inv-wrap">
        <div class="inv-paper" id="invoice-print">

          <!-- En-tête -->
          <div class="inv-header">
            <div class="inv-header__left">
              <div class="inv-logo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <span class="inv-logo__name">ShopVue</span>
              </div>
              <div class="inv-company">
                <div>{{ $t('inv_company_street') }}</div>
                <div>{{ $t('inv_company_city') }}</div>
                <div>{{ $t('inv_company_email') }}</div>
                <div>{{ $t('inv_company_tax') }}</div>
              </div>
            </div>
            <div class="inv-header__right">
              <div class="inv-title-block">
                <div class="inv-title">{{ $t('inv_title') }}</div>
                <div class="inv-num">N° {{ String(invoiceData.facture.id_facture).padStart(6, '0') }}</div>
              </div>
              <div class="inv-meta-grid">
                <div class="inv-meta-item">
                  <span class="inv-meta-label">{{ $t('inv_issued') }}</span>
                  <span class="inv-meta-value">{{ formatDate(invoiceData.facture.date_facture) }}</span>
                </div>
                <div class="inv-meta-item">
                  <span class="inv-meta-label">{{ $t('inv_order_ref') }}</span>
                  <span class="inv-meta-value">#{{ invoiceData.commande.id_commande }}</span>
                </div>
                <div class="inv-meta-item">
                  <span class="inv-meta-label">{{ $t('inv_status_label') }}</span>
                  <span class="inv-meta-value">
                    <span class="inv-status" :class="isPaid ? 'inv-status--paid' : 'inv-status--pending'">
                      {{ isPaid ? $t('inv_status_paid') : $t('inv_status_pending') }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="inv-divider"></div>

          <!-- Adresses -->
          <div class="inv-addresses">
            <div class="inv-address-block">
              <div class="inv-section-label">{{ $t('inv_billed_to') }}</div>
              <div v-if="clientProfile" class="inv-client-name">{{ clientProfile.prenom }} {{ clientProfile.nom }}</div>
              <div class="inv-client-info">
                <div v-if="clientProfile">{{ clientProfile.email }}</div>
                <div v-if="livraison">{{ livraison.adresse_livraison }}</div>
                <div v-if="livraison">{{ livraison.code_postal_livraison }} {{ livraison.ville_livraison }}</div>
                <div>{{ $t('inv_country') }}</div>
              </div>
            </div>
            <div class="inv-address-block inv-address-block--right">
              <div class="inv-section-label">{{ $t('inv_payment_method') }}</div>
              <div class="inv-payment-method">
                <span class="inv-payment-icon">
                  <svg v-if="invoiceData.facture.mode_paiement === 'Carte'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  <svg v-else-if="invoiceData.facture.mode_paiement === 'PayPal'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 12c0-3.3 2.7-6 6-6h1.5C17 6 19 8 19 10.5S17 15 14.5 15H7"/><path d="M7 16l-2 6"/></svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </span>
                {{ invoiceData.facture.mode_paiement }}
              </div>
            </div>
          </div>

          <!-- Tableau articles -->
          <table class="inv-table">
            <thead>
              <tr>
                <th class="inv-table__desc">{{ $t('inv_col_desc') }}</th>
                <th class="inv-table__qty">{{ $t('inv_col_qty') }}</th>
                <th class="inv-table__unit">{{ $t('inv_col_unit') }}</th>
                <th class="inv-table__total">{{ $t('inv_col_total') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ligne, i) in invoiceData.lignes" :key="ligne.id_ligne" :class="i % 2 === 0 ? 'inv-table__row--even' : ''">
                <td class="inv-table__desc">
                  <div class="inv-product-name">{{ ligne.nom }}</div>
                  <div class="inv-product-ref">{{ $t('inv_ref_prefix') }} PRD-{{ String(ligne.id_produit).padStart(4, '0') }}</div>
                </td>
                <td class="inv-table__qty">{{ ligne.quantite }}</td>
                <td class="inv-table__unit">{{ $cur(ligne.prix_unitaire) }}</td>
                <td class="inv-table__total">{{ $cur(Number(ligne.prix_unitaire) * Number(ligne.quantite)) }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Totaux -->
          <div class="inv-totals-wrap">
            <div class="inv-totals">
              <div class="inv-totals__row">
                <span>{{ $t('inv_subtotal') }}</span>
                <span>{{ $cur(invoiceData.facture.montant_total) }}</span>
              </div>
              <div class="inv-totals__row">
                <span>{{ $t('inv_shipping') }}</span>
                <span class="inv-totals__free">{{ $t('inv_shipping_free') }}</span>
              </div>
              <div class="inv-totals__row">
                <span>{{ $t('inv_vat') }}</span>
                <span>{{ $cur(0) }}</span>
              </div>
              <div class="inv-totals__row inv-totals__row--final">
                <span>{{ $t('inv_grand_total') }}</span>
                <span>{{ $cur(invoiceData.facture.montant_total) }}</span>
              </div>
            </div>
          </div>

          <!-- Tampon -->
          <div class="inv-stamp" :class="isPaid ? 'inv-stamp--paid' : 'inv-stamp--pending'">
            {{ isPaid ? $t('inv_stamp_paid') : $t('inv_stamp_pending') }}
          </div>

          <!-- Livraison -->
          <div v-if="livraison" class="inv-delivery">
            <div class="inv-delivery__header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              {{ $t('inv_delivery_title') }}
            </div>
            <div class="inv-delivery__grid">
              <div>
                <span class="inv-delivery__label">{{ $t('inv_delivery_address') }}</span>
                <span class="inv-delivery__val">{{ livraison.adresse_livraison }}, {{ livraison.code_postal_livraison }} {{ livraison.ville_livraison }}</span>
              </div>
              <div>
                <span class="inv-delivery__label">{{ $t('inv_delivery_date') }}</span>
                <span class="inv-delivery__val">{{ formatDateShort(livraison.date_livraison_prevue) }}</span>
              </div>
              <div>
                <span class="inv-delivery__label">{{ $t('inv_delivery_status') }}</span>
                <span class="inv-delivery__val">{{ livraison.statut_livraison }}</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="inv-footer">
            <div class="inv-footer__thanks">{{ $t('inv_footer_thanks') }}</div>
            <div class="inv-footer__legal">{{ $t('inv_footer_legal') }}</div>
          </div>

        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 text-muted">
      <p>{{ $t('inv_not_found') }}</p>
      <router-link to="/orders" class="btn btn-outline-secondary btn-sm mt-2">{{ $t('inv_back') }}</router-link>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'InvoiceView',
  data() {
    return { loading: true, invoiceData: null, livraison: null, clientProfile: null };
  },
  computed: {
    isPaid() { return this.invoiceData?.facture?.statut_paiement === 'Payé'; }
  },
  async mounted() { await this.loadAll(); },
  methods: {
    async loadAll() {
      const id = this.$route.params.id_commande;
      try {
        const [f, l, p] = await Promise.all([
          api.get(`/factures/${id}`),
          api.get(`/livraisons/${id}`),
          api.get('/clients/profil')
        ]);
        this.invoiceData = f.data;
        this.livraison = l.data;
        this.clientProfile = p.data;
      } catch { /* afficher ce qu'on a */ } finally { this.loading = false; }
    },
    formatDate(date) {
      const loc = this.$locale.locale === 'fr' ? 'fr-CA' : 'en-CA';
      return new Date(date).toLocaleDateString(loc, { day: '2-digit', month: 'long', year: 'numeric' });
    },
    formatDateShort(date) {
      const loc = this.$locale.locale === 'fr' ? 'fr-CA' : 'en-CA';
      return new Date(date).toLocaleDateString(loc, { day: '2-digit', month: '2-digit', year: 'numeric' });
    },
    printInvoice() { window.print(); }
  }
};
</script>

<style scoped>
.inv-page { background: #eef2f7; min-height: 100vh; }
.inv-toolbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 12px 0; }
.inv-toolbar__inner { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.inv-toolbar__back { display: flex; align-items: center; gap: 6px; color: #64748b; text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.15s; }
.inv-toolbar__back:hover { color: #1e293b; }
.inv-toolbar__print { display: flex; align-items: center; gap: 7px; background: #0f172a; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.inv-toolbar__print:hover { background: #1e293b; }
.inv-wrap { max-width: 900px; margin: 2rem auto; padding: 0 1.5rem 3rem; }
.inv-paper { background: #fff; border-radius: 4px; box-shadow: 0 4px 32px rgba(15,23,42,0.1); padding: 3rem 3.5rem; position: relative; overflow: hidden; }
.inv-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; margin-bottom: 2rem; }
.inv-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; }
.inv-logo__name { font-size: 1.6rem; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
.inv-company { color: #64748b; font-size: 0.82rem; line-height: 2; }
.inv-title-block { text-align: right; margin-bottom: 1.25rem; }
.inv-title { font-size: 2.2rem; font-weight: 900; letter-spacing: 6px; color: #0f172a; }
.inv-num { font-size: 1rem; color: #2563eb; font-weight: 700; margin-top: 4px; }
.inv-meta-grid { display: flex; flex-direction: column; gap: 6px; }
.inv-meta-item { display: flex; justify-content: flex-end; gap: 1rem; font-size: 0.82rem; }
.inv-meta-label { color: #94a3b8; }
.inv-meta-value { color: #1e293b; font-weight: 600; text-align: right; }
.inv-status { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.inv-status--paid { background: #dcfce7; color: #16a34a; }
.inv-status--pending { background: #fef9c3; color: #ca8a04; }
.inv-divider { height: 3px; background: linear-gradient(90deg, #f97316, #2563eb, #7c3aed); border-radius: 2px; margin-bottom: 2rem; }
.inv-addresses { display: flex; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
.inv-address-block--right { text-align: right; }
.inv-section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.5rem; }
.inv-client-name { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.inv-client-info { color: #64748b; font-size: 0.85rem; line-height: 1.9; }
.inv-payment-method { display: flex; align-items: center; gap: 8px; justify-content: flex-end; color: #1e293b; font-weight: 600; font-size: 0.95rem; margin-top: 4px; }
.inv-payment-icon { display: flex; align-items: center; color: #64748b; }
.inv-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
.inv-table thead tr { background: #f8fafc; }
.inv-table th { padding: 11px 16px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.inv-table td { padding: 14px 16px; font-size: 0.9rem; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.inv-table__row--even td { background: #fafbfc; }
.inv-table__desc { width: 50%; }
.inv-table__qty, .inv-table__unit, .inv-table__total { text-align: right; }
.inv-table tbody .inv-table__qty { text-align: center; }
.inv-product-name { font-weight: 600; color: #1e293b; }
.inv-product-ref { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
.inv-totals-wrap { display: flex; justify-content: flex-end; margin-bottom: 2rem; }
.inv-totals { width: 300px; }
.inv-totals__row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.88rem; color: #475569; border-bottom: 1px solid #f1f5f9; }
.inv-totals__free { color: #16a34a; font-weight: 600; }
.inv-totals__row--final { border-bottom: none; border-top: 2px solid #0f172a; margin-top: 6px; padding-top: 12px; font-size: 1.05rem; font-weight: 800; color: #0f172a; }
.inv-stamp { position: absolute; top: 200px; right: 70px; font-size: 2.2rem; font-weight: 900; letter-spacing: 6px; opacity: 0.09; transform: rotate(-20deg); border: 5px solid currentColor; padding: 8px 18px; border-radius: 6px; pointer-events: none; user-select: none; }
.inv-stamp--paid { color: #16a34a; }
.inv-stamp--pending { color: #d97706; }
.inv-delivery { background: #f8fafc; border-left: 3px solid #2563eb; border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; margin-bottom: 2rem; }
.inv-delivery__header { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #2563eb; margin-bottom: 0.75rem; }
.inv-delivery__grid { display: flex; flex-direction: column; gap: 6px; }
.inv-delivery__label { display: inline-block; width: 110px; font-size: 0.8rem; color: #94a3b8; font-weight: 600; }
.inv-delivery__val { font-size: 0.85rem; color: #334155; }
.inv-footer { border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 1rem; text-align: center; }
.inv-footer__thanks { font-size: 0.95rem; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
.inv-footer__legal { font-size: 0.75rem; color: #94a3b8; line-height: 1.8; }
@media print {
  .no-print { display: none !important; }
  .inv-page { background: white; }
  .inv-wrap { margin: 0; padding: 0; max-width: 100%; }
  .inv-paper { box-shadow: none; border-radius: 0; padding: 1.5cm 2cm; }
  .inv-stamp { opacity: 0.07; }
}
</style>
