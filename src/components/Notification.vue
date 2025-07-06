<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h2>FruitStore</h2>
        </div>
        
        <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              <i class="icon">🏠</i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">
              <i class="icon">ℹ️</i>
              About
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" class="nav-link" active-class="active">
              <i class="icon">📦</i>
              Product
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/order" class="nav-link" active-class="active">
              <i class="icon">🛒</i>
              Order
            </router-link>
          </li>
        </ul>
        
        <!-- Right side: Notifications + Auth -->
        <div class="nav-right">
          <!-- Notification Icon -->
          <div class="notification-item" @click="toggleCart" title="Shopping Cart">
            <i class="notification-icon">🔔</i>
            <span class="notification-badge" v-if="cartCount > 0">{{ cartCount }}</span>
          </div>

          <!-- Authentication Section -->
          <div v-if="!isAuthenticated" class="auth-section">
            <router-link to="/register" class="nav-btn">Register</router-link>
            <router-link to="/login" class="nav-btn">Login</router-link>
          </div>
          <div v-else class="auth-section">
            <button @click="handleLogout" class="logout-btn">Logout</button>
          </div>
        </div>

        <div class="hamburger" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="modal-overlay" @click="showLogoutModal = false">
      <div class="modal-content" @click.stop>
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div class="modal-buttons">
          <button @click="confirmLogout" class="confirm-btn">Yes, Logout</button>
          <button @click="showLogoutModal = false" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()

const props = defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
})

const isMobileMenuOpen = ref(false)
const user = ref(null)
const showLogoutModal = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleCart = () => {
  alert(`Cart clicked! You have ${props.cartCount} items in your cart.`)
}

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token') && !!user.value
})

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = async () => {
  try {
    await api.post('/logout')
  } catch (error) {
    console.error('Logout API error:', error)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    user.value = null
    showLogoutModal.value = false
    alert('Logged out successfully!')
    router.push('/login')
  }
}

onMounted(async () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (error) {
      console.error('Error parsing stored user:', error)
      localStorage.removeItem('user')
    }
  }

  if (isAuthenticated.value) {
    try {
      const response = await api.get('/fruits')
      console.log('Fruits fetched successfully:', response.data)
    } catch (error) {
      console.error('Failed to fetch fruits from API:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        user.value = null
      }
    }
  }
})
</script>

<style>
/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-logo h2 {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  list-style: none;
  gap: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 0 4px;
}

.nav-link:hover, .nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 1.2rem;
}

/* Right Side Navigation */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Notification */
.notification-item {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.notification-icon {
  font-size: 1.3rem;
  display: block;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Authentication Section */
.auth-section {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(10px);
}

.welcome-text {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.nav-btn, .logout-btn {
  padding: 8px 16px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  font-size: 0.9rem;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.logout-btn {
  background: #dc3545;
  color: white;
}

.nav-btn:hover, .logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logout-btn:hover {
  background: #c82333;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 4px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.hamburger.active .bar:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

/* Main Content */
.main-content {
  padding: 20px;
  min-height: calc(100vh - 70px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  color: #333;
  margin-bottom: 15px;
}

.modal-content p {
  color: #666;
  margin-bottom: 25px;
}

.modal-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.confirm-btn, .cancel-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn {
  background: #dc3545;
  color: white;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.confirm-btn:hover, .cancel-btn:hover {
  transform: translateY(-1px);
}

/* Mobile Responsive */
@media screen and (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 20px 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .hamburger {
    display: flex;
  }

  .nav-right {
    gap: 10px;
  }

  .auth-section {
    padding: 6px 12px;
  }

  .welcome-text {
    display: none;
  }
}
</style>
