<template>
  <div class="home">

    <!-- ═══ HERO ═══ -->
    <section class="hero">
      <div class="hero__bg-shapes">
        <div class="hero__shape hero__shape--1"></div>
        <div class="hero__shape hero__shape--2"></div>
      </div>
      <div class="container-xl hero__inner">
        <div class="hero__content">
          <div class="hero__tag">{{ $t('home_tag') }}</div>
          <h1 class="hero__title">
            {{ $t('home_title') }}<br>
            <span class="hero__title-accent">{{ $t('home_title_accent') }}</span>
          </h1>
          <p class="hero__sub">{{ $t('home_sub') }}</p>
          <div class="hero__actions">
            <router-link class="btn-hero btn-hero--primary" to="/products">
              {{ $t('home_cta') }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </router-link>
            <router-link class="btn-hero btn-hero--ghost" to="/orders">{{ $t('home_cta2') }}</router-link>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__img-wrap">
            <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80" alt="ShopVue" class="hero__img"/>
          </div>
          <div class="hero__float hero__float--top">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{{ $t('home_float1') }}</span>
          </div>
          <div class="hero__float hero__float--bottom">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <span>{{ $t('home_float2') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ STATS ═══ -->
    <section class="stats">
      <div class="container-xl stats__inner">
        <div class="stats__item">
          <div class="stats__number">30+</div>
          <div class="stats__label">{{ $t('stats_products') }}</div>
        </div>
        <div class="stats__item">
          <div class="stats__number">4.8★</div>
          <div class="stats__label">{{ $t('stats_rating') }}</div>
        </div>
        <div class="stats__item">
          <div class="stats__number">3j</div>
          <div class="stats__label">{{ $t('stats_delivery') }}</div>
        </div>
        <div class="stats__item">
          <div class="stats__number">100%</div>
          <div class="stats__label">{{ $t('stats_secure') }}</div>
        </div>
      </div>
    </section>

    <!-- ═══ CATÉGORIES ═══ -->
    <section class="section container-xl">
      <div class="section__head">
        <div>
          <h2 class="section__title">{{ $t('categories_title') }}</h2>
          <p class="section__sub">{{ $t('categories_sub') }}</p>
        </div>
        <router-link class="section__link" to="/products">
          {{ $t('see_all') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </router-link>
      </div>
      <div class="categories">
        <router-link
          v-for="cat in categories"
          :key="cat.key"
          :to="`/products?categorie=${encodeURIComponent(cat.key)}`"
          class="cat-card"
        >
          <div class="cat-card__img-wrap">
            <img :src="cat.image" :alt="$t('cat_' + cat.key)" class="cat-card__img" loading="lazy"/>
            <div class="cat-card__overlay"></div>
          </div>
          <div class="cat-card__content">
            <div class="cat-card__title">{{ $t('cat_' + cat.key) }}</div>
            <div class="cat-card__desc">{{ $t('cat_' + cat.key + '_desc') }}</div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- ═══ AVANTAGES ═══ -->
    <section class="features-section">
      <div class="container-xl">
        <div class="features">
          <div class="feature">
            <div class="feature__icon" style="background:#eff6ff">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div>
              <div class="feature__title">{{ $t('feat_delivery') }}</div>
              <div class="feature__desc">{{ $t('feat_delivery_desc') }}</div>
            </div>
          </div>
          <div class="feature">
            <div class="feature__icon" style="background:#f0fdf4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div class="feature__title">{{ $t('feat_secure') }}</div>
              <div class="feature__desc">{{ $t('feat_secure_desc') }}</div>
            </div>
          </div>
          <div class="feature">
            <div class="feature__icon" style="background:#fdf4ff">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <div>
              <div class="feature__title">{{ $t('feat_support') }}</div>
              <div class="feature__desc">{{ $t('feat_support_desc') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          key: 'Informatique',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&h=380&q=80'
        },
        {
          key: 'Audio',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=380&q=80'
        },
        {
          key: 'Maison',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&h=380&q=80'
        },
        {
          key: 'Sport',
          image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=380&q=80'
        }
      ]
    };
  }
};
</script>

<style scoped>
.home { background: #f8fafc; }

/* Hero */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
  padding: 5rem 0 4rem;
}
.hero__bg-shapes { position: absolute; inset: 0; pointer-events: none; }
.hero__shape { position: absolute; border-radius: 50%; filter: blur(80px); }
.hero__shape--1 { width: 500px; height: 500px; background: rgba(249,115,22,0.12); top: -150px; right: -100px; }
.hero__shape--2 { width: 300px; height: 300px; background: rgba(37,99,235,0.12); bottom: -100px; left: 100px; }
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding-inline: 1.5rem;
}
@media (max-width: 768px) { .hero__inner { grid-template-columns: 1fr; } .hero__visual { display: none; } }
.hero__tag {
  display: inline-block;
  background: rgba(249,115,22,0.15);
  color: #fb923c;
  border: 1px solid rgba(249,115,22,0.3);
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}
.hero__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: #f1f5f9;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 1rem;
}
.hero__title-accent {
  background: linear-gradient(90deg, #f97316, #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero__sub { color: #94a3b8; font-size: 1rem; line-height: 1.7; margin-bottom: 2rem; max-width: 420px; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-hero--primary { background: #f97316; color: white; }
.btn-hero--primary:hover { background: #ea6c0a; color: white; transform: translateY(-1px); }
.btn-hero--ghost { background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); }
.btn-hero--ghost:hover { background: rgba(255,255,255,0.14); color: white; }
.hero__visual { position: relative; }
.hero__img-wrap { border-radius: 16px; overflow: hidden; box-shadow: 0 32px 64px rgba(0,0,0,0.4); }
.hero__img { width: 100%; display: block; }
.hero__float {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1e293b;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.hero__float--top { top: -16px; left: -20px; }
.hero__float--bottom { bottom: -16px; right: -20px; }

/* Stats */
.stats { background: white; border-bottom: 1px solid #e2e8f0; }
.stats__inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-inline: 1.5rem;
}
@media (max-width: 640px) { .stats__inner { grid-template-columns: repeat(2, 1fr); } }
.stats__item { padding: 1.75rem 1rem; text-align: center; border-right: 1px solid #f1f5f9; }
.stats__item:last-child { border-right: none; }
.stats__number { font-size: 1.6rem; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
.stats__label { font-size: 0.82rem; color: #64748b; margin-top: 4px; }

/* Sections */
.section { padding: 4rem 1.5rem; }
.section__head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
.section__title { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0; }
.section__sub { color: #64748b; font-size: 0.88rem; margin: 4px 0 0; }
.section__link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f97316;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}
.section__link:hover { color: #ea6c0a; }

/* Categories with images */
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media (max-width: 900px) { .categories { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .categories { grid-template-columns: 1fr; } }

.cat-card {
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  display: block;
  position: relative;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.cat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
.cat-card__img-wrap { position: relative; height: 200px; overflow: hidden; }
.cat-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s; }
.cat-card:hover .cat-card__img { transform: scale(1.06); }
.cat-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.1) 60%, transparent 100%);
}
.cat-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.1rem;
}
.cat-card__title { font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 2px; }
.cat-card__desc { font-size: 0.75rem; color: rgba(255,255,255,0.75); }

/* Features */
.features-section { background: white; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 3rem 0; }
.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; padding-inline: 1.5rem; }
@media (max-width: 768px) { .features { grid-template-columns: 1fr; } }
.feature { display: flex; align-items: flex-start; gap: 1rem; }
.feature__icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.feature__title { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.feature__desc { font-size: 0.82rem; color: #64748b; line-height: 1.6; }
</style>
