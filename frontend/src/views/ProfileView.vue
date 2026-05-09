<template>
  <div class="profile-page" style="background: #f5f5f5; min-height: 100vh;">
    <!-- Header -->
    <section class="header-section py-5" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
      <div class="container">
        <div class="d-flex align-items-center gap-4">
          <div class="avatar" style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 3rem; border: 3px solid white;">👤</div>
          <div>
            <h1 class="display-6 fw-bold mb-0">Mon Profil</h1>
            <p class="text-white-50 mt-2">Gérez vos informations personnelles</p>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-5">
      <!-- Not Logged In Alert -->
      <div v-if="!isLoggedIn" class="card shadow-sm" style="border-radius: 12px; border: 2px solid #667eea;">
        <div class="card-body text-center py-5">
          <h3 style="font-size: 2rem; color: #e0e0e0; margin-bottom: 1rem;">🔐</h3>
          <h4>Accès réservé aux utilisateurs</h4>
          <p class="text-muted mb-4">Veuillez vous connecter pour accéder à votre profil.</p>
          <router-link to="/login" class="btn btn-lg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 30px; border-radius: 8px;">Se connecter</router-link>
        </div>
      </div>

      <!-- Profile Form -->
      <div v-else class="row g-4">
        <!-- Messages -->
        <div class="col-12" v-if="message">
          <div class="alert" :class="success ? 'alert-success' : 'alert-danger'" style="border-radius: 12px; border-left: 4px solid;">
            <strong>{{ message }}</strong>
          </div>
        </div>

        <!-- Personal Information Section -->
        <div class="col-lg-6">
          <div class="card shadow-sm" style="border-radius: 12px; border-top: 4px solid #667eea;">
            <div class="card-body p-4">
              <div class="d-flex align-items-center gap-3 mb-4">
                <span style="font-size: 1.5rem;">📋</span>
                <h5 class="fw-bold mb-0">Informations personnelles</h5>
              </div>
              <form @submit.prevent="saveProfile">
                <div class="mb-3">
                  <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Prénom</label>
                  <input v-model="form.prenom" class="form-control" placeholder="Votre prénom" style="border-radius: 8px; padding: 10px 12px;">
                </div>
                <div class="mb-3">
                  <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Nom</label>
                  <input v-model="form.nom" class="form-control" placeholder="Votre nom" style="border-radius: 8px; padding: 10px 12px;">
                </div>
                <div class="mb-3">
                  <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Email</label>
                  <input v-model="form.email" class="form-control" disabled style="border-radius: 8px; padding: 10px 12px; background: #f5f5f5;">
                  <small class="text-muted">Non modifiable</small>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Téléphone</label>
                  <input v-model="form.telephone" class="form-control" placeholder="+33 6 12 34 56 78" style="border-radius: 8px; padding: 10px 12px;">
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Address Section -->
        <div class="col-lg-6">
          <div class="card shadow-sm" style="border-radius: 12px; border-top: 4px solid #764ba2;">
            <div class="card-body p-4">
              <div class="d-flex align-items-center gap-3 mb-4">
                <span style="font-size: 1.5rem;">📍</span>
                <h5 class="fw-bold mb-0">Adresse</h5>
              </div>
              <form @submit.prevent="saveProfile">
                <div class="mb-3">
                  <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Adresse complète</label>
                  <input v-model="form.adresse" class="form-control" placeholder="123 Rue de la Paix" style="border-radius: 8px; padding: 10px 12px;">
                </div>
                <div class="row g-2">
                  <div class="col-md-8">
                    <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Ville</label>
                    <input v-model="form.ville" class="form-control" placeholder="Paris" style="border-radius: 8px; padding: 10px 12px;">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-600" style="color: #333; font-size: 0.95rem;">Code postal</label>
                    <input v-model="form.code_postal" class="form-control" placeholder="75001" style="border-radius: 8px; padding: 10px 12px;">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Account Status Section -->
        <div class="col-12">
          <div class="card shadow-sm" style="border-radius: 12px; background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); border-left: 4px solid #4caf50;">
            <div class="card-body p-4">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h5 class="fw-bold mb-2" style="color: #2e7d32;">✓ Compte actif</h5>
                  <p class="text-muted mb-0">Votre compte est en bon état. Vous pouvez acheter librement.</p>
                </div>
                <div class="col-md-4 text-md-end">
                  <span class="badge" style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: white; padding: 10px 15px; font-size: 0.95rem;">Membre depuis 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="col-12 text-center">
          <button @click="saveProfile" class="btn btn-lg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 40px; border-radius: 8px; font-weight: 600; font-size: 1.05rem; transition: all 0.3s;" @mouseover="$event.target.style.transform = 'translateY(-2px)'" @mouseleave="$event.target.style.transform = 'translateY(0)'">
            💾 Enregistrer les modifications
          </button>
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
      form: { nom: '', prenom: '', email: '', telephone: '', adresse: '', ville: '', code_postal: '' },
      message: '',
      success: false
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    async loadProfile() {
      if (!this.isLoggedIn) return;
      try {
        const res = await api.get('/clients/profil');
        this.form = res.data;
      } catch (error) {
        this.message = error.response?.data?.message || 'Erreur de chargement du profil';
      }
    },
    async saveProfile() {
      try {
        const payload = {
          nom: this.form.nom,
          prenom: this.form.prenom,
          telephone: this.form.telephone,
          adresse: this.form.adresse,
          ville: this.form.ville,
          code_postal: this.form.code_postal
        };
        const res = await api.put('/clients/profil', payload);
        this.success = true;
        this.message = res.data.message;
        setTimeout(() => this.message = '', 4000);
      } catch (error) {
        this.success = false;
        this.message = error.response?.data?.message || 'Erreur de mise à jour';
      }
    }
  },
  mounted() {
    this.loadProfile();
  }
};
</script>

<style scoped>
.header-section {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
.card {
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}
</style>
