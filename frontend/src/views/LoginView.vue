<template>
  <div class="login-page py-5">
    <div class="container">
      <div class="login-shell mx-auto shadow-sm bg-white rounded-3 overflow-hidden">
        <div class="login-top text-center py-4">
          <h1 class="login-logo mb-1">shop<span>vue</span></h1>
          <p class="text-muted mb-0">Connectez-vous pour accéder à vos commandes et recommandations.</p>
        </div>

        <div class="login-body p-4 p-md-5">
          <div v-if="message" class="alert alert-danger">{{ message }}</div>

          <h2 class="h4 mb-4">Connexion</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control form-control-lg" placeholder="Entrer votre email" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Mot de passe</label>
              <input v-model="form.mot_de_passe" type="password" class="form-control form-control-lg" placeholder="Mot de passe" required>
            </div>
            <button type="submit" class="btn btn-warning btn-lg w-100">Se connecter</button>
          </form>

          <div class="login-footer text-center mt-4">
            <p class="mb-2">Vous n'avez pas encore de compte ?</p>
            <router-link class="btn btn-outline-secondary" to="/register">Créer un compte</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      form: { email: '', mot_de_passe: '' },
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await api.post('/auth/login', this.form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('client', JSON.stringify(res.data.client));
        this.$router.push('/products');
      } catch (error) {
        this.message = error.response?.data?.message || 'Erreur de connexion';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  background: linear-gradient(180deg, #eef2f6 0%, #ffffff 100%);
  min-height: calc(100vh - 70px);
}

.login-shell {
  max-width: 520px;
}

.login-top {
  background: #232f3e;
  color: #ffffff;
}

.login-logo {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0;
}

.login-logo span {
  color: #febd69;
}

.login-body {
  background: #ffffff;
}

.login-footer p {
  margin-bottom: 0.75rem;
}

.btn-warning {
  background-color: #febd69;
  border-color: #f3a847;
  color: #111;
}

.btn-warning:hover {
  background-color: #f3a847;
  border-color: #d48806;
}

.btn-outline-secondary {
  border-color: #d1d5db;
  color: #374151;
}

.btn-outline-secondary:hover {
  background-color: #f3f4f6;
}
</style>
