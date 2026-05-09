<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
/* ─── Reset & Base ───────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

html {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #f8fafc;
  color: #1e293b;
  line-height: 1.5;
}

img { max-width: 100%; display: block; }
button { font-family: inherit; }
a { color: inherit; }

/* ─── Container ─────────────────────────────────────────────────── */
.container-xl {
  max-width: 1200px;
  margin: 0 auto;
}

/* ─── Scrollbar ─────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* ─── Print global ──────────────────────────────────────────────── */
@media print {
  .sv-nav { display: none !important; }
}
</style>
