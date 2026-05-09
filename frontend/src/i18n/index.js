import { reactive } from 'vue';

const state = reactive({
  locale: localStorage.getItem('sv_locale') || 'fr'
});

export function setLocale(l) {
  state.locale = l;
  localStorage.setItem('sv_locale', l);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat(state.locale === 'fr' ? 'fr-CA' : 'en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(Number(amount));
}

// ─── Traductions ─────────────────────────────────────────────────
const t = {
  fr: {
    // Navbar
    nav_home: 'Accueil',
    nav_products: 'Produits',
    nav_orders: 'Commandes',
    nav_profile: 'Profil',
    nav_cart: 'Panier',
    nav_login: 'Connexion',
    nav_logout: 'Déconnexion',

    // Home hero
    home_tag: 'Livraison gratuite dès 50 $',
    home_title: 'Votre boutique',
    home_title_accent: 'en ligne moderne',
    home_sub: 'Des milliers de produits sélectionnés, des offres exclusives et une expérience d\'achat pensée pour vous.',
    home_cta: 'Découvrir les produits',
    home_cta2: 'Suivre mes commandes',
    home_float1: 'Paiement sécurisé',
    home_float2: 'Livraison 3 jours',

    // Home stats
    stats_products: 'Produits disponibles',
    stats_rating: 'Note moyenne',
    stats_delivery: 'Livraison rapide',
    stats_secure: 'Paiement sécurisé',

    // Home categories
    categories_title: 'Nos catégories',
    categories_sub: 'Trouvez exactement ce dont vous avez besoin',
    see_all: 'Voir tout',
    cat_Informatique: 'Informatique',
    cat_Informatique_desc: 'Ordinateurs, écrans, composants',
    cat_Audio: 'Audio',
    cat_Audio_desc: 'Casques, enceintes, écouteurs',
    cat_Maison: 'Maison',
    cat_Maison_desc: 'Électroménager, décoration',
    cat_Sport: 'Sport',
    cat_Sport_desc: 'Équipements, running, fitness',

    // Home features
    feat_delivery: 'Livraison offerte',
    feat_delivery_desc: 'Gratuite dès 50 $ d\'achat, en 3 jours ouvrés.',
    feat_secure: 'Paiement sécurisé',
    feat_secure_desc: 'Stripe, PayPal et paiement à la livraison.',
    feat_support: 'Support réactif',
    feat_support_desc: 'Notre équipe répond dans les 24h.',

    // Products
    shop_title: 'Boutique',
    shop_search: 'Rechercher un produit...',
    shop_all: 'Tous',
    shop_empty: 'Aucun produit trouvé',
    shop_empty_sub: 'Essayez une autre recherche ou catégorie',
    shop_add: 'Ajouter',
    shop_details: 'Détails',
    shop_added: 'Ajouté au panier',
    shop_low_stock: 'Plus que',
    shop_out_of_stock: 'Rupture',
    shop_unit: 'unité',

    // Cart
    cart_title: 'Mon Panier',
    cart_item: 'article',
    cart_items: 'articles',
    cart_empty_title: 'Votre panier est vide',
    cart_empty_sub: 'Ajoutez des produits pour commencer vos achats',
    cart_discover: 'Découvrir les produits',
    cart_unit: '/ unité',
    cart_subtotal: 'Sous-total',
    cart_shipping: 'Livraison',
    cart_free: 'Gratuite',
    cart_total: 'Total TTC',
    cart_checkout: 'Passer la commande',
    cart_continue: 'Continuer mes achats',
    cart_clear: 'Vider le panier',
    cart_secure: 'Paiement 100 % sécurisé',
    cart_confirm_clear: 'Vider le panier ?',

    // Checkout
    checkout_title: 'Validation de la commande',
    checkout_summary: 'Résumé de la commande',
    checkout_unit: '/ unité',
    checkout_total: 'Total TTC',
    checkout_delivery: 'Adresse de livraison',
    checkout_address: 'Adresse',
    checkout_address_ph: '123 rue de la Paix',
    checkout_city: 'Ville',
    checkout_city_ph: 'Montréal',
    checkout_zip: 'Code postal',
    checkout_zip_ph: 'H2X 1Y6',
    checkout_required: 'Champ obligatoire.',
    checkout_fill_delivery: 'Veuillez remplir toutes les informations de livraison.',
    checkout_payment: 'Paiement',
    checkout_card_label: 'Numéro de carte',
    checkout_test: 'Test :',
    checkout_pay: 'Payer',
    checkout_confirm: 'Confirmer la commande',
    checkout_cod_title: 'Paiement à la réception',
    checkout_cod_info: 'Réglez en espèces ou par chèque au livreur. Livraison sous 3 jours ouvrés.',
    checkout_paypal_redirect: 'Vous serez redirigé vers PayPal pour finaliser.',
    checkout_secure: 'Paiement 100 % sécurisé',
    checkout_card_name: 'Carte bancaire',
    checkout_card_desc: 'Visa, Mastercard, American Express',
    checkout_paypal_name: 'PayPal',
    checkout_paypal_desc: 'Payer via votre compte PayPal',
    checkout_cod_name: 'À la livraison',
    checkout_cod_desc: 'Espèces ou chèque à la réception',
    checkout_loading_stripe: 'Chargement du formulaire sécurisé...',
    checkout_loading_paypal: 'Chargement PayPal...',
    checkout_my_address: 'Mon adresse enregistrée',
    checkout_my_address_tag: 'Par défaut',
    checkout_alt_address: 'Utiliser une adresse différente',
    checkout_alt_address_hint: 'Saisir une nouvelle adresse de livraison',
    checkout_no_profile_address: 'Aucune adresse enregistrée dans votre profil.',
    checkout_save_hint: 'Mettez à jour votre adresse depuis votre',
    checkout_profile_link: 'Profil',

    // Orders
    orders_title: 'Mes Commandes',
    orders_sub: 'Suivi de toutes vos commandes',
    orders_login_title: 'Accès réservé',
    orders_login_sub: 'Connectez-vous pour consulter votre historique de commandes.',
    orders_login_btn: 'Se connecter',
    orders_empty_title: 'Aucune commande',
    orders_empty_sub: 'Vous n\'avez pas encore passé de commande.',
    orders_shop_btn: 'Commencer mes achats',
    orders_kpi_orders: 'Commande',
    orders_kpi_orders_pl: 'Commandes',
    orders_kpi_spent: 'Total dépensé',
    orders_kpi_last: 'Dernière commande',
    orders_view_invoice: 'Voir la facture',
    'status_En attente': 'En attente',
    'status_Confirmée': 'Confirmée',
    'status_Expédiée': 'Expédiée',
    'status_Livrée': 'Livrée',
    'status_Annulée': 'Annulée',

    // Invoice
    inv_title: 'FACTURE',
    inv_back: 'Retour aux commandes',
    inv_print: 'Imprimer / Télécharger PDF',
    inv_issued: 'Date d\'émission',
    inv_order_ref: 'Commande',
    inv_status_label: 'Statut',
    inv_billed_to: 'Facturé à',
    inv_payment_method: 'Mode de paiement',
    inv_col_desc: 'Description',
    inv_col_qty: 'Qté',
    inv_col_unit: 'Prix unitaire',
    inv_col_total: 'Total HT',
    inv_subtotal: 'Sous-total HT',
    inv_shipping: 'Frais de livraison',
    inv_shipping_free: 'Offerts',
    inv_vat: 'TVA (0 %)',
    inv_grand_total: 'TOTAL TTC',
    inv_stamp_paid: 'PAYÉ',
    inv_stamp_pending: 'EN ATTENTE',
    inv_delivery_title: 'Informations de livraison',
    inv_delivery_address: 'Adresse',
    inv_delivery_date: 'Date prévue',
    inv_delivery_status: 'Statut',
    inv_footer_thanks: 'Merci pour votre achat sur ShopVue !',
    inv_footer_legal: 'Ce document constitue une facture officielle. Pour toute question, contactez-nous à contact@shopvue.ca. ShopVue Inc.',
    inv_status_paid: 'Payé',
    inv_status_pending: 'En attente',
    inv_not_found: 'Facture introuvable.',
    inv_ref_prefix: 'Réf.',
    inv_company_street: '1234 Rue Sainte-Catherine',
    inv_company_city: 'Montréal, QC H3B 1A1',
    inv_company_email: 'contact@shopvue.ca',
    inv_company_tax: 'TPS/TVQ : 123 456 789 RT0001',
    inv_country: 'Canada',
  },

  en: {
    // Navbar
    nav_home: 'Home',
    nav_products: 'Products',
    nav_orders: 'Orders',
    nav_profile: 'Profile',
    nav_cart: 'Cart',
    nav_login: 'Sign In',
    nav_logout: 'Sign Out',

    // Home hero
    home_tag: 'Free shipping over $50',
    home_title: 'Your modern',
    home_title_accent: 'online store',
    home_sub: 'Thousands of curated products, exclusive deals and a shopping experience designed for you.',
    home_cta: 'Browse Products',
    home_cta2: 'Track My Orders',
    home_float1: 'Secure payment',
    home_float2: '3-day delivery',

    // Home stats
    stats_products: 'Products available',
    stats_rating: 'Average rating',
    stats_delivery: 'Fast delivery',
    stats_secure: 'Secure payment',

    // Home categories
    categories_title: 'Our categories',
    categories_sub: 'Find exactly what you need',
    see_all: 'See all',
    cat_Informatique: 'Computing',
    cat_Informatique_desc: 'Laptops, screens, components',
    cat_Audio: 'Audio',
    cat_Audio_desc: 'Headphones, speakers, earbuds',
    cat_Maison: 'Home',
    cat_Maison_desc: 'Appliances, home decor',
    cat_Sport: 'Sports',
    cat_Sport_desc: 'Equipment, running, fitness',

    // Home features
    feat_delivery: 'Free shipping',
    feat_delivery_desc: 'Free over $50, delivered in 3 business days.',
    feat_secure: 'Secure payment',
    feat_secure_desc: 'Stripe, PayPal and cash on delivery.',
    feat_support: 'Responsive support',
    feat_support_desc: 'Our team responds within 24 hours.',

    // Products
    shop_title: 'Shop',
    shop_search: 'Search a product...',
    shop_all: 'All',
    shop_empty: 'No products found',
    shop_empty_sub: 'Try a different search or category',
    shop_add: 'Add',
    shop_details: 'Details',
    shop_added: 'Added to cart',
    shop_low_stock: 'Only',
    shop_out_of_stock: 'Out of stock',
    shop_unit: 'unit',

    // Cart
    cart_title: 'My Cart',
    cart_item: 'item',
    cart_items: 'items',
    cart_empty_title: 'Your cart is empty',
    cart_empty_sub: 'Add products to start shopping',
    cart_discover: 'Browse products',
    cart_unit: '/ unit',
    cart_subtotal: 'Subtotal',
    cart_shipping: 'Shipping',
    cart_free: 'Free',
    cart_total: 'Total (incl. tax)',
    cart_checkout: 'Proceed to checkout',
    cart_continue: 'Continue shopping',
    cart_clear: 'Clear cart',
    cart_secure: '100% secure payment',
    cart_confirm_clear: 'Clear the cart?',

    // Checkout
    checkout_title: 'Order Checkout',
    checkout_summary: 'Order Summary',
    checkout_unit: '/ unit',
    checkout_total: 'Total (incl. tax)',
    checkout_delivery: 'Delivery address',
    checkout_address: 'Address',
    checkout_address_ph: '123 Main Street',
    checkout_city: 'City',
    checkout_city_ph: 'Montreal',
    checkout_zip: 'Postal code',
    checkout_zip_ph: 'H2X 1Y6',
    checkout_required: 'Required field.',
    checkout_fill_delivery: 'Please fill in all delivery information.',
    checkout_payment: 'Payment',
    checkout_card_label: 'Card number',
    checkout_test: 'Test:',
    checkout_pay: 'Pay',
    checkout_confirm: 'Confirm Order',
    checkout_cod_title: 'Payment on delivery',
    checkout_cod_info: 'Pay in cash or by check upon delivery. Delivered within 3 business days.',
    checkout_paypal_redirect: 'You will be redirected to PayPal to complete.',
    checkout_secure: '100% secure payment',
    checkout_card_name: 'Credit / Debit card',
    checkout_card_desc: 'Visa, Mastercard, American Express',
    checkout_paypal_name: 'PayPal',
    checkout_paypal_desc: 'Pay via your PayPal account',
    checkout_cod_name: 'Cash on delivery',
    checkout_cod_desc: 'Cash or check upon receipt',
    checkout_loading_stripe: 'Loading secure form...',
    checkout_loading_paypal: 'Loading PayPal...',
    checkout_my_address: 'My saved address',
    checkout_my_address_tag: 'Default',
    checkout_alt_address: 'Use a different address',
    checkout_alt_address_hint: 'Enter a new delivery address',
    checkout_no_profile_address: 'No address saved in your profile.',
    checkout_save_hint: 'Update your address from your',
    checkout_profile_link: 'Profile',

    // Orders
    orders_title: 'My Orders',
    orders_sub: 'Track all your orders',
    orders_login_title: 'Access restricted',
    orders_login_sub: 'Please sign in to view your order history.',
    orders_login_btn: 'Sign In',
    orders_empty_title: 'No orders yet',
    orders_empty_sub: 'You haven\'t placed any orders yet.',
    orders_shop_btn: 'Start shopping',
    orders_kpi_orders: 'Order',
    orders_kpi_orders_pl: 'Orders',
    orders_kpi_spent: 'Total spent',
    orders_kpi_last: 'Last order',
    orders_view_invoice: 'View invoice',
    'status_En attente': 'Pending',
    'status_Confirmée': 'Confirmed',
    'status_Expédiée': 'Shipped',
    'status_Livrée': 'Delivered',
    'status_Annulée': 'Cancelled',

    // Invoice
    inv_title: 'INVOICE',
    inv_back: 'Back to orders',
    inv_print: 'Print / Download PDF',
    inv_issued: 'Issue date',
    inv_order_ref: 'Order',
    inv_status_label: 'Status',
    inv_billed_to: 'Bill to',
    inv_payment_method: 'Payment method',
    inv_col_desc: 'Description',
    inv_col_qty: 'Qty',
    inv_col_unit: 'Unit price',
    inv_col_total: 'Amount',
    inv_subtotal: 'Subtotal',
    inv_shipping: 'Shipping',
    inv_shipping_free: 'Free',
    inv_vat: 'Tax (0%)',
    inv_grand_total: 'TOTAL',
    inv_stamp_paid: 'PAID',
    inv_stamp_pending: 'PENDING',
    inv_delivery_title: 'Shipping information',
    inv_delivery_address: 'Address',
    inv_delivery_date: 'Expected date',
    inv_delivery_status: 'Status',
    inv_footer_thanks: 'Thank you for shopping at ShopVue!',
    inv_footer_legal: 'This document constitutes an official invoice. For any questions, contact us at contact@shopvue.ca. ShopVue Inc.',
    inv_status_paid: 'Paid',
    inv_status_pending: 'Pending',
    inv_not_found: 'Invoice not found.',
    inv_ref_prefix: 'Ref.',
    inv_company_street: '1234 Sainte-Catherine Street',
    inv_company_city: 'Montreal, QC H3B 1A1',
    inv_company_email: 'contact@shopvue.ca',
    inv_company_tax: 'BN: 123 456 789 RT0001',
    inv_country: 'Canada',
  }
};

// ─── Plugin Vue ──────────────────────────────────────────────────
export const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$locale = state;

    app.config.globalProperties.$t = (key) => {
      return t[state.locale]?.[key] ?? t['fr'][key] ?? key;
    };

    app.config.globalProperties.$setLocale = (l) => setLocale(l);

    app.config.globalProperties.$cur = (amount) => formatCurrency(amount);
  }
};
