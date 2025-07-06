<template>
    <div class="login-page">
      <div class="login-container">
        <div class="login-card">
          <h2 class="login-title">Welcome Back</h2>
          <p class="login-subtitle">Sign in to your FruitStore account</p>
          
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                :class="{ 'error': errors.email }"
                placeholder="Enter your email"
                required
              />
              <span v-if="errors.email" class="error-message">{{ errors.email[0] }}</span>
            </div>
  
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="form.password"
                :class="{ 'error': errors.password }"
                placeholder="Enter your password"
                required
              />
              <span v-if="errors.password" class="error-message">{{ errors.password[0] }}</span>
            </div>
  
            <button 
              type="submit" 
              class="login-btn"
              :disabled="loading"
            >
              {{ loading ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>
  
          <div class="register-link">
            <p>Don't have an account? <router-link to="/register">Create Account</router-link></p>
          </div>
  
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '../api'
  
  const router = useRouter()
  
  const form = reactive({
    email: '',
    password: ''
  })
  
  const errors = ref({})
  const loading = ref(false)
  const successMessage = ref('')
  
  const handleLogin = async () => {
    loading.value = true
    errors.value = {}
    successMessage.value = ''
  
    try {
      const response = await api.post('/login', form)
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      successMessage.value = 'Login successful! Redirecting...'
      
      // Redirect to home after 1 second
      setTimeout(() => {
        router.push('/')
      }, 1000)
      
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      } else {
        errors.value = { general: ['Login failed. Please check your credentials.'] }
      }
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Same styles as Register.vue but with login-specific classes */
  .login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
  }
  
  .login-card {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }
  
  .login-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .login-subtitle {
    color: #666;
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 0.95rem;
  }
  
  .form-group input {
    padding: 15px;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .form-group input.error {
    border-color: #dc3545;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 5px;
  }
  
  .login-btn {
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
  }
  
  .login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .register-link {
    text-align: center;
    margin-top: 20px;
  }
  
  .register-link p {
    color: #666;
  }
  
  .register-link a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  
  .success-message {
    background: #d4edda;
    color: #155724;
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    font-weight: 600;
  }
  </style>
  