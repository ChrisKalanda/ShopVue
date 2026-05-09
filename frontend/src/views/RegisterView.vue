<template>
  <div class="register-page py-5">
    <div class="container">
      <div class="register-shell mx-auto shadow-sm">
        <div class="register-header text-center py-4">
          <h1 class="register-logo mb-1">shop<span>vue</span></h1>
          <p class="text-muted mb-0">Créez un compte et profitez d’un accès rapide à vos commandes.</p>
        </div>

        <div class="register-body bg-white rounded-3 p-4 p-md-5">
          <div class="row gx-4">
            <div class="col-lg-5 register-side pe-lg-4 mb-4 mb-lg-0">
              <div class="side-card p-4 rounded-3">
                <h2 class="h5 mb-3">Nouveau client ?</h2>
                <p>En créant un compte, vous pouvez :</p>
                <ul class="register-benefits ps-3">
                  <li>Suivre vos commandes</li>
                  <li>Gérer vos adresses</li>
                  <li>Retrouver vos factures</li>
                </ul>
                <router-link class="btn btn-outline-primary w-100 mt-3" to="/login">J’ai déjà un compte</router-link>
              </div>
            </div>

            <div class="col-lg-7">
              <div class="mb-4">
                <h2 class="h4 mb-3">Créer un compte</h2>
                <p class="text-muted">Entrez vos informations pour vous enregistrer et accéder à votre espace client.</p>
              </div>

              <div v-if="message" class="alert" :class="success ? 'alert-success' : 'alert-danger'">{{ message }}</div>

              <form @submit.prevent="register">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Nom</label>
                    <input v-model="form.nom" type="text" class="form-control" placeholder="Nom" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Prénom</label>
                    <input v-model="form.prenom" type="text" class="form-control" placeholder="Prénom" required>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Email</label>
                    <input v-model="form.email" type="email" class="form-control" placeholder="Email" required>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Mot de passe</label>
                    <input v-model="form.mot_de_passe" type="password" class="form-control" placeholder="Mot de passe" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Téléphone</label>
                    <input v-model="form.telephone" type="text" class="form-control" placeholder="Téléphone">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Ville</label>
                    <input v-model="form.ville" type="text" class="form-control" placeholder="Ville">
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Adresse</label>
                    <input v-model="form.adresse" type="text" class="form-control" placeholder="Adresse complète">
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Code postal</label>
                    <input v-model="form.code_postal" type="text" class="form-control" placeholder="Code postal">
                  </div>
                </div>

                <button type="submit" class="btn btn-warning btn-lg w-100 mt-4">Créer votre compte</button>
              </form>
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
  data() {
    return {
      form: {
        nom: '', prenom: '', email: '', telephone: '', adresse: '', ville: '', code_postal: '', mot_de_passe: ''
      },
      message: '',
      success: false
    };
  },
  methods: {
    async register() {
      try {
        const res = await api.post('/auth/register', this.form);
        this.success = true;
        this.message = res.data.message;
        this.$router.push('/login');
      } catch (error) {
        this.success = false;
        this.message = error.response?.data?.message || 'Erreur lors de l’inscription';
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  background: linear-gradient(180deg, #f3f3f3 0%, #ffffff 100%);
  min-height: calc(100vh - 70px);
}

.register-shell {
  max-width: 980px;
  background: #f8f9fa;
  border-radius: 12px;
}

.register-header {
  background: #232f3e;
  color: #ffffff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.register-logo {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #ffffff;
}

.register-logo span {
  color: #febd69;
}

.register-body {
  min-height: 520px;
}

.register-side .side-card {
  background: #f0f2f7;
  min-height: 100%;
}

.register-benefits {
  list-style-type: disc;
}

.register-benefits li {
  margin-bottom: 0.75rem;
}

.form-label {
  font-weight: 600;
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
</style>
