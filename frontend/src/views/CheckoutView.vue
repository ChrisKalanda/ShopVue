<template>
  <div class="checkout-page py-5">
    <div class="container" style="max-width: 960px;">
      <h2 class="fw-bold mb-4">{{ $t('checkout_title') }}</h2>

      <div v-if="message" class="alert alert-danger alert-dismissible mb-4" role="alert">
        {{ message }}
        <button type="button" class="btn-close" @click="message = ''"></button>
      </div>

      <div class="row g-4">
        <!-- ─── Colonne gauche ─────────────────────────────────── -->
        <div class="col-lg-7">

          <!-- Résumé commande -->
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-white py-3">
              <h6 class="mb-0 fw-bold">{{ $t('checkout_summary') }}</h6>
            </div>
            <div class="card-body">
              <div v-for="item in cartItems" :key="item.id_produit" class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center gap-3">
                  <img v-if="item.image" :src="item.image" alt="" class="rounded" style="width:48px;height:48px;object-fit:cover;"/>
                  <div>
                    <div class="fw-medium" style="font-size:.95rem;">{{ item.nom }}</div>
                    <div class="text-muted" style="font-size:.82rem;">{{ $cur(item.prix) }} {{ $t('checkout_unit') }}</div>
                  </div>
                </div>
                <div class="text-end">
                  <span class="badge bg-secondary me-2">x{{ item.quantite }}</span>
                  <span class="fw-medium">{{ $cur(Number(item.prix) * Number(item.quantite)) }}</span>
                </div>
              </div>
              <hr class="my-3">
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold fs-6">{{ $t('checkout_total') }}</span>
                <span class="fw-bold fs-5 text-primary">{{ $cur(cartTotal) }}</span>
              </div>
            </div>
          </div>

          <!-- ═══ Adresse de livraison ═══ -->
          <div class="card shadow-sm">
            <div class="card-header bg-white py-3">
              <h6 class="mb-0 fw-bold">{{ $t('checkout_delivery') }}</h6>
            </div>
            <div class="card-body">

              <!-- Chargement profil -->
              <div v-if="loadingProfile" class="text-center py-3">
                <div class="spinner-border spinner-border-sm text-secondary"></div>
              </div>

              <div v-else>
                <!-- ─ Carte adresse du profil ─ -->
                <div
                  v-if="profileAddress"
                  class="addr-card"
                  :class="{ 'addr-card--active': !useAlt }"
                  @click="useAlt = false"
                >
                  <div class="addr-card__radio">
                    <div class="addr-radio" :class="{ 'addr-radio--active': !useAlt }"></div>
                  </div>
                  <div class="addr-card__body">
                    <div class="addr-card__title">
                      {{ $t('checkout_my_address') }}
                      <span class="addr-card__tag">{{ $t('checkout_my_address_tag') }}</span>
                    </div>
                    <div class="addr-card__line">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {{ profileAddress.prenom }} {{ profileAddress.nom }}
                    </div>
                    <div class="addr-card__line">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {{ profileAddress.adresse }}
                    </div>
                    <div class="addr-card__line addr-card__line--muted">
                      {{ profileAddress.code_postal }} {{ profileAddress.ville }}, Canada
                    </div>
                  </div>
                  <div v-if="!useAlt" class="addr-card__check">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>

                <!-- ─ Carte adresse alternative ─ -->
                <div
                  class="addr-card addr-card--alt"
                  :class="{ 'addr-card--active': useAlt }"
                  @click="useAlt = true"
                >
                  <div class="addr-card__radio">
                    <div class="addr-radio" :class="{ 'addr-radio--active': useAlt }"></div>
                  </div>
                  <div class="addr-card__body">
                    <div class="addr-card__title">{{ $t('checkout_alt_address') }}</div>
                    <div v-if="!useAlt" class="addr-card__hint">{{ $t('checkout_alt_address_hint') }}</div>
                    <div v-if="useAlt && altFilled" class="addr-card__line">
                      {{ livraison.adresse_livraison }}, {{ livraison.code_postal_livraison }} {{ livraison.ville_livraison }}
                    </div>
                  </div>
                  <div v-if="useAlt" class="addr-card__check">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>

                <!-- Formulaire adresse alternative -->
                <transition name="form-slide">
                  <div v-if="useAlt" class="alt-form">
                    <div class="mb-3">
                      <label class="form-label fw-medium">{{ $t('checkout_address') }} <span class="text-danger">*</span></label>
                      <input
                        v-model="livraison.adresse_livraison"
                        class="form-control"
                        :placeholder="$t('checkout_address_ph')"
                        :class="{ 'is-invalid': deliveryErrors.adresse }"
                      >
                      <div v-if="deliveryErrors.adresse" class="invalid-feedback">{{ $t('checkout_required') }}</div>
                    </div>
                    <div class="row g-3">
                      <div class="col-md-8">
                        <label class="form-label fw-medium">{{ $t('checkout_city') }} <span class="text-danger">*</span></label>
                        <input
                          v-model="livraison.ville_livraison"
                          class="form-control"
                          :placeholder="$t('checkout_city_ph')"
                          :class="{ 'is-invalid': deliveryErrors.ville }"
                        >
                        <div v-if="deliveryErrors.ville" class="invalid-feedback">{{ $t('checkout_required') }}</div>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label fw-medium">{{ $t('checkout_zip') }} <span class="text-danger">*</span></label>
                        <input
                          v-model="livraison.code_postal_livraison"
                          class="form-control"
                          :placeholder="$t('checkout_zip_ph')"
                          :class="{ 'is-invalid': deliveryErrors.cp }"
                        >
                        <div v-if="deliveryErrors.cp" class="invalid-feedback">{{ $t('checkout_required') }}</div>
                      </div>
                    </div>
                  </div>
                </transition>

                <!-- Avertissement si aucune adresse dans le profil -->
                <div v-if="!profileAddress && !loadingProfile" class="alert alert-light border mt-3 py-2 px-3 small">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {{ $t('checkout_no_profile_address') }}
                  {{ $t('checkout_save_hint') }}
                  <router-link to="/profile" class="fw-semibold text-primary">{{ $t('checkout_profile_link') }}</router-link>.
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ─── Colonne droite : paiement ─────────────────────── -->
        <div class="col-lg-5">
          <div class="card shadow-sm">
            <div class="card-header bg-white py-3">
              <h6 class="mb-0 fw-bold">{{ $t('checkout_payment') }}</h6>
            </div>
            <div class="card-body">
              <div class="mb-4">
                <div
                  v-for="method in paymentMethods"
                  :key="method.id"
                  @click="selectMethod(method.id)"
                  :class="['method-card mb-2', mode_paiement === method.id ? 'method-card--active' : '']"
                >
                  <div class="d-flex align-items-center gap-3">
                    <div class="method-icon" :style="{ background: method.color }">
                      <component :is="method.icon" />
                    </div>
                    <div class="flex-grow-1">
                      <div class="fw-medium" style="font-size:.93rem;">{{ $t(method.labelKey) }}</div>
                      <div class="text-muted" style="font-size:.78rem;">{{ $t(method.descKey) }}</div>
                    </div>
                    <div :class="['radio-dot', mode_paiement === method.id ? 'radio-dot--active' : '']"></div>
                  </div>
                </div>
              </div>

              <!-- Stripe -->
              <div v-show="mode_paiement === 'Carte'">
                <div v-if="!stripeReady" class="text-center py-3">
                  <div class="spinner-border spinner-border-sm text-secondary"></div>
                  <span class="ms-2 text-muted small">{{ $t('checkout_loading_stripe') }}</span>
                </div>
                <div v-show="stripeReady">
                  <label class="form-label small fw-medium">{{ $t('checkout_card_label') }}</label>
                  <div id="stripe-card-element" class="stripe-field mb-2"></div>
                  <div v-if="stripeError" class="text-danger small mt-1 mb-3">{{ stripeError }}</div>
                  <div class="alert alert-light border py-2 px-3 small mb-3">
                    <strong>{{ $t('checkout_test') }}</strong> 4242 4242 4242 4242 — exp: 12/34 — CVC: 123
                  </div>
                  <button @click="payWithStripe" :disabled="loading || !stripeReady" class="btn btn-primary w-100 py-2">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <svg v-else class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    {{ $t('checkout_pay') }} {{ $cur(cartTotal) }}
                  </button>
                </div>
              </div>

              <!-- PayPal -->
              <div v-if="mode_paiement === 'PayPal'">
                <div v-if="!paypalReady" class="text-center py-3">
                  <div class="spinner-border spinner-border-sm text-secondary"></div>
                  <span class="ms-2 text-muted small">{{ $t('checkout_loading_paypal') }}</span>
                </div>
                <div v-if="paypalError" class="text-danger small mb-2">{{ paypalError }}</div>
                <div id="paypal-button-container"></div>
                <div v-if="paypalReady && !paypalError" class="text-muted small mt-2 text-center">
                  {{ $t('checkout_paypal_redirect') }}
                </div>
              </div>

              <!-- À la livraison -->
              <div v-if="mode_paiement === 'À la livraison'">
                <div class="alert alert-warning py-3 px-3 mb-3">
                  <div class="fw-medium mb-1">{{ $t('checkout_cod_title') }}</div>
                  <div class="small">{{ $t('checkout_cod_info') }}</div>
                </div>
                <button @click="submitFinalOrder('À la livraison', null)" :disabled="loading" class="btn btn-success w-100 py-2">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <svg v-else class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  {{ $t('checkout_confirm') }}
                </button>
              </div>
            </div>

            <div class="card-footer bg-white text-center py-2">
              <span class="text-muted small">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {{ $t('checkout_secure') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import cartStore from '../store/cart';

const IconCard  = { template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>` };
const IconPaypal = { template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M7 12c0-3.3 2.7-6 6-6h1.5C16.9 6 19 8.1 19 10.5S16.9 15 14.5 15H7"/><path d="M7 16l-2 6"/></svg>` };
const IconTruck  = { template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>` };

export default {
  name: 'CheckoutView',
  components: { IconCard, IconPaypal, IconTruck },

  data() {
    return {
      // Adresse
      profileAddress: null,
      loadingProfile: true,
      useAlt: false,
      livraison: { adresse_livraison: '', ville_livraison: '', code_postal_livraison: '' },
      deliveryErrors: { adresse: false, ville: false, cp: false },

      // Paiement
      mode_paiement: 'Carte',
      message: '',
      loading: false,

      paymentMethods: [
        { id: 'Carte',         labelKey: 'checkout_card_name',    descKey: 'checkout_card_desc',    icon: 'IconCard',   color: '#0d6efd' },
        { id: 'PayPal',        labelKey: 'checkout_paypal_name',  descKey: 'checkout_paypal_desc',  icon: 'IconPaypal', color: '#003087' },
        { id: 'À la livraison', labelKey: 'checkout_cod_name',    descKey: 'checkout_cod_desc',     icon: 'IconTruck',  color: '#198754' }
      ],

      // Stripe
      stripe: null, stripeCardEl: null,
      stripeReady: false, stripeError: '',

      // PayPal
      paypalReady: false, paypalError: '', paypalRendered: false
    };
  },

  computed: {
    cartItems()  { return cartStore.state.items; },
    cartTotal()  { return cartStore.getTotal(); },
    altFilled()  {
      return this.livraison.adresse_livraison.trim() &&
             this.livraison.ville_livraison.trim() &&
             this.livraison.code_postal_livraison.trim();
    }
  },

  async mounted() {
    if (!localStorage.getItem('token')) { this.$router.push('/login'); return; }
    if (this.cartItems.length === 0)     { this.$router.push('/cart'); return; }
    await this.loadProfile();
    this.loadStripe();
  },

  watch: {
    mode_paiement(val) {
      if (val === 'PayPal' && !this.paypalRendered)
        this.$nextTick(() => this.loadPayPal());
    }
  },

  methods: {
    // ── Profil ────────────────────────────────────────────────────
    async loadProfile() {
      try {
        const res = await api.get('/clients/profil');
        const p = res.data;
        if (p.adresse && p.ville && p.code_postal) {
          this.profileAddress = {
            nom: p.nom, prenom: p.prenom,
            adresse: p.adresse, ville: p.ville, code_postal: p.code_postal
          };
          // Pré-remplir le formulaire alternatif avec les mêmes valeurs
          this.livraison = {
            adresse_livraison:     p.adresse,
            ville_livraison:       p.ville,
            code_postal_livraison: p.code_postal
          };
          this.useAlt = false;
        } else {
          // Pas d'adresse → ouvrir directement le formulaire
          this.useAlt = true;
        }
      } catch {
        this.useAlt = true;
      } finally {
        this.loadingProfile = false;
      }
    },

    // ── Helpers ───────────────────────────────────────────────────
    selectMethod(id) {
      if (this.mode_paiement === id) return;
      this.mode_paiement = id;
      this.message = ''; this.stripeError = ''; this.paypalError = '';
    },

    getEffectiveLivraison() {
      if (!this.useAlt && this.profileAddress) {
        return {
          adresse_livraison:     this.profileAddress.adresse,
          ville_livraison:       this.profileAddress.ville,
          code_postal_livraison: this.profileAddress.code_postal
        };
      }
      return this.livraison;
    },

    validateDelivery() {
      this.deliveryErrors = { adresse: false, ville: false, cp: false };
      if (!this.useAlt && this.profileAddress) return true; // adresse profil toujours valide

      let valid = true;
      if (!this.livraison.adresse_livraison.trim())     { this.deliveryErrors.adresse = true; valid = false; }
      if (!this.livraison.ville_livraison.trim())        { this.deliveryErrors.ville   = true; valid = false; }
      if (!this.livraison.code_postal_livraison.trim())  { this.deliveryErrors.cp      = true; valid = false; }
      if (!valid) this.message = this.$t('checkout_fill_delivery');
      return valid;
    },

    // ── Stripe ───────────────────────────────────────────────────
    loadStripe() {
      if (window.Stripe) { this.initStripe(); return; }
      const s = document.createElement('script');
      s.src = 'https://js.stripe.com/v3/';
      s.onload = () => this.initStripe();
      document.head.appendChild(s);
    },
    initStripe() {
      const pubKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      if (!pubKey) { this.stripeError = 'Clé Stripe manquante.'; this.stripeReady = true; return; }
      this.stripe = window.Stripe(pubKey);
      this.stripeCardEl = this.stripe.elements().create('card', {
        style: {
          base: { fontSize: '15px', color: '#212529', fontFamily: 'system-ui,sans-serif', '::placeholder': { color: '#9ca3af' } },
          invalid: { color: '#dc3545' }
        }
      });
      this.$nextTick(() => {
        const el = document.getElementById('stripe-card-element');
        if (el) {
          this.stripeCardEl.mount('#stripe-card-element');
          this.stripeCardEl.on('change', e => { this.stripeError = e.error ? e.error.message : ''; });
          this.stripeReady = true;
        }
      });
    },
    async payWithStripe() {
      if (!this.validateDelivery()) return;
      this.loading = true; this.stripeError = '';
      try {
        const { data } = await api.post('/payments/stripe/create-intent', { amount: this.cartTotal });
        const result   = await this.stripe.confirmCardPayment(data.clientSecret, { payment_method: { card: this.stripeCardEl } });
        if (result.error) { this.stripeError = result.error.message; return; }
        if (result.paymentIntent.status === 'succeeded')
          await this.submitFinalOrder('Carte', result.paymentIntent.id);
      } catch (err) { this.stripeError = err.response?.data?.message || err.message; }
      finally { this.loading = false; }
    },

    // ── PayPal ───────────────────────────────────────────────────
    loadPayPal() {
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
      if (!clientId) { this.paypalError = 'Client ID PayPal manquant.'; this.paypalReady = true; return; }
      if (window.paypal) { this.renderPayPalButtons(); return; }
      const s = document.createElement('script');
      s.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=CAD`;
      s.onload = () => this.renderPayPalButtons();
      s.onerror = () => { this.paypalError = 'Impossible de charger PayPal.'; this.paypalReady = true; };
      document.head.appendChild(s);
    },
    renderPayPalButtons() {
      this.paypalReady = true;
      this.$nextTick(() => {
        const container = document.getElementById('paypal-button-container');
        if (!container) return;
        container.innerHTML = '';
        window.paypal.Buttons({
          style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', height: 44 },
          createOrder: async () => {
            if (!this.validateDelivery()) throw new Error('Livraison incomplète');
            const { data } = await api.post('/payments/paypal/create-order', { amount: this.cartTotal });
            return data.id;
          },
          onApprove: async (data) => {
            this.loading = true; this.paypalError = '';
            try {
              const res = await api.post(`/payments/paypal/capture/${data.orderID}`);
              if (res.data.status === 'COMPLETED') await this.submitFinalOrder('PayPal', data.orderID);
            } catch (err) { this.paypalError = err.response?.data?.message || 'Erreur PayPal.'; }
            finally { this.loading = false; }
          },
          onError:  err  => { this.paypalError = 'Erreur PayPal : ' + String(err); },
          onCancel: ()   => { this.paypalError = 'Paiement annulé.'; }
        }).render('#paypal-button-container');
        this.paypalRendered = true;
      });
    },

    // ── Création commande ────────────────────────────────────────
    async submitFinalOrder(modePaiement, paymentRef) {
      if (!this.validateDelivery()) return;
      this.loading = true; this.message = '';
      try {
        const res = await api.post('/commandes', {
          panier:           cartStore.state.items,
          livraison:        this.getEffectiveLivraison(),
          mode_paiement:    modePaiement,
          payment_reference: paymentRef
        });
        cartStore.clearCart();
        this.$router.push(`/invoice/${res.data.id_commande}`);
      } catch (err) {
        this.message = err.response?.data?.message || 'Erreur lors de la création de la commande.';
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.checkout-page { background: #f8fafc; min-height: 100vh; }

/* ─── Address cards ──────────────────────────────────────────── */
.addr-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  margin-bottom: 10px;
  background: white;
  position: relative;
}
.addr-card:hover { border-color: #94a3b8; background: #fafafa; }
.addr-card--active {
  border-color: #f97316;
  background: #fff8f3;
  box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
}
.addr-card--alt { border-style: dashed; }
.addr-card--alt.addr-card--active { border-style: solid; }

.addr-card__radio { flex-shrink: 0; padding-top: 2px; }
.addr-radio {
  width: 18px; height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  transition: all 0.15s;
}
.addr-radio--active {
  border-color: #f97316;
  box-shadow: inset 0 0 0 4px #f97316;
}

.addr-card__body { flex: 1; min-width: 0; }
.addr-card__title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.addr-card__tag {
  display: inline-block;
  background: #fff7ed;
  color: #f97316;
  border: 1px solid #fed7aa;
  padding: 1px 8px;
  border-radius: 100px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.addr-card__line {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  color: #475569;
  margin-bottom: 2px;
}
.addr-card__line--muted { color: #94a3b8; font-size: 0.78rem; }
.addr-card__hint { font-size: 0.8rem; color: #94a3b8; }

.addr-card__check {
  flex-shrink: 0;
  width: 26px; height: 26px;
  background: #f97316;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

/* ─── Alternative form ───────────────────────────────────────── */
.alt-form {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.1rem 1.1rem 0.5rem;
  margin-top: 4px;
  background: #fafcff;
}
.form-slide-enter-active { transition: all 0.25s ease; }
.form-slide-leave-active { transition: all 0.2s ease; }
.form-slide-enter-from, .form-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* ─── Payment method cards ───────────────────────────────────── */
.method-card {
  border: 2px solid #dee2e6;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  user-select: none;
}
.method-card:hover { border-color: #adb5bd; background: #f8f9fa; }
.method-card--active { border-color: #0d6efd; background: #f0f5ff; }
.method-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.radio-dot { width: 18px; height: 18px; border: 2px solid #ced4da; border-radius: 50%; flex-shrink: 0; transition: all 0.15s; }
.radio-dot--active { border-color: #0d6efd; box-shadow: inset 0 0 0 4px #0d6efd; }

/* ─── Stripe field ───────────────────────────────────────────── */
.stripe-field {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 13px 14px;
  background: #fff;
  min-height: 48px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.stripe-field:focus-within {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13,110,253,0.25);
}
</style>
