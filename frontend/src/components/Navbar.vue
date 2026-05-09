<template>
  <nav class="sv-nav">
    <div class="sv-nav__inner container-xl">

      <!-- Brand -->
      <router-link class="sv-nav__brand" to="/">
        <span class="sv-nav__brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </span>
        ShopVue
      </router-link>

      <!-- Desktop Links -->
      <ul class="sv-nav__links d-none d-lg-flex">
        <li><router-link class="sv-nav__link" to="/">{{ $t('nav_home') }}</router-link></li>
        <li><router-link class="sv-nav__link" to="/products">{{ $t('nav_products') }}</router-link></li>
        <li><router-link class="sv-nav__link" to="/orders">{{ $t('nav_orders') }}</router-link></li>
        <li><router-link class="sv-nav__link" to="/profile">{{ $t('nav_profile') }}</router-link></li>
      </ul>

      <!-- Actions -->
      <div class="sv-nav__actions">
        <!-- Language toggle -->
        <div class="lang-toggle">
          <button
            class="lang-btn"
            :class="{ 'lang-btn--active': $locale.locale === 'fr' }"
            @click="$setLocale('fr')"
          >FR</button>
          <span class="lang-sep">|</span>
          <button
            class="lang-btn"
            :class="{ 'lang-btn--active': $locale.locale === 'en' }"
            @click="$setLocale('en')"
          >EN</button>
        </div>

        <!-- Cart -->
        <router-link class="sv-nav__cart" to="/cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
          </svg>
          <span class="d-none d-sm-inline">{{ $t('nav_cart') }}</span>
          <span v-if="cartCount > 0" class="sv-nav__badge">{{ cartCount }}</span>
        </router-link>

        <!-- Auth -->
        <router-link v-if="!isLoggedIn" class="sv-nav__btn sv-nav__btn--primary" to="/login">
          {{ $t('nav_login') }}
        </router-link>
        <button v-else class="sv-nav__btn sv-nav__btn--ghost" @click="logout">
          {{ $t('nav_logout') }}
        </button>

        <!-- Mobile toggle -->
        <button class="sv-nav__toggle d-lg-none" @click="menuOpen = !menuOpen">
          <svg v-if="!menuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="sv-nav__mobile" :class="{ 'sv-nav__mobile--open': menuOpen }">
      <div class="container-xl">
        <router-link class="sv-nav__mobile-link" to="/" @click="menuOpen = false">{{ $t('nav_home') }}</router-link>
        <router-link class="sv-nav__mobile-link" to="/products" @click="menuOpen = false">{{ $t('nav_products') }}</router-link>
        <router-link class="sv-nav__mobile-link" to="/orders" @click="menuOpen = false">{{ $t('nav_orders') }}</router-link>
        <router-link class="sv-nav__mobile-link" to="/profile" @click="menuOpen = false">{{ $t('nav_profile') }}</router-link>
        <div class="sv-nav__mobile-lang">
          <button class="lang-btn" :class="{ 'lang-btn--active': $locale.locale === 'fr' }" @click="$setLocale('fr'); menuOpen = false">Français</button>
          <button class="lang-btn" :class="{ 'lang-btn--active': $locale.locale === 'en' }" @click="$setLocale('en'); menuOpen = false">English</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import cartStore from '../store/cart';

export default {
  data() { return { menuOpen: false }; },
  computed: {
    isLoggedIn() { return !!localStorage.getItem('token'); },
    cartCount() { return cartStore.cartCount.value; }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('client');
      this.menuOpen = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.sv-nav {
  background: #fff;
  border-bottom: 1px solid #e8edf2;
  position: sticky;
  top: 0;
  z-index: 100;
}
.sv-nav__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 64px;
  padding-inline: 1.25rem;
}
.sv-nav__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 800;
  color: #f97316;
  text-decoration: none;
  letter-spacing: -0.3px;
  flex-shrink: 0;
}
.sv-nav__brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #fff7ed;
  border-radius: 10px;
  color: #f97316;
}
.sv-nav__links {
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.25rem;
}
.sv-nav__link {
  display: block;
  padding: 6px 12px;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  border-radius: 8px;
  transition: color 0.15s, background 0.15s;
}
.sv-nav__link:hover { color: #111827; background: #f3f4f6; }
.sv-nav__link.router-link-exact-active { color: #f97316; background: #fff7ed; font-weight: 600; }

.sv-nav__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

/* Language toggle */
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 2px;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 3px;
}
.lang-sep { color: #d1d5db; font-size: 0.75rem; }
.lang-btn {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.lang-btn--active {
  background: #fff;
  color: #f97316;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Cart */
.sv-nav__cart {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  position: relative;
  transition: all 0.15s;
}
.sv-nav__cart:hover { background: #f3f4f6; color: #111827; }
.sv-nav__badge {
  position: absolute;
  top: -6px; right: -6px;
  min-width: 18px; height: 18px;
  padding: 0 4px;
  background: #f97316;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

/* Buttons */
.sv-nav__btn {
  padding: 7px 16px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s;
  text-decoration: none;
}
.sv-nav__btn--primary { background: #f97316; color: white; }
.sv-nav__btn--primary:hover { background: #ea6c0a; color: white; }
.sv-nav__btn--ghost { background: transparent; color: #6b7280; border: 1px solid #e5e7eb; }
.sv-nav__btn--ghost:hover { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }

.sv-nav__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  color: #374151;
}

/* Mobile */
.sv-nav__mobile { display: none; border-top: 1px solid #f3f4f6; padding: 0.5rem 0 1rem; }
.sv-nav__mobile--open { display: block; }
.sv-nav__mobile-link {
  display: block;
  padding: 10px 1.25rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}
.sv-nav__mobile-link:hover { color: #f97316; }
.sv-nav__mobile-link.router-link-exact-active { color: #f97316; font-weight: 600; }
.sv-nav__mobile-lang {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem 0;
}
.sv-nav__mobile-lang .lang-btn {
  font-size: 0.82rem;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #6b7280;
}
.sv-nav__mobile-lang .lang-btn.lang-btn--active {
  background: #fff7ed;
  color: #f97316;
  border-color: #fed7aa;
  box-shadow: none;
}
</style>
