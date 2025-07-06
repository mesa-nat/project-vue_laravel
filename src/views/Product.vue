<template>
  <div class="product-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-section">
      <div class="container">
        <div class="loading-spinner"></div>
        <p>Loading fresh products...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-section">
      <div class="container">
        <div class="error-message">
          <h3>⚠️ Unable to load products</h3>
          <p>{{ error }}</p>
          <button @click="fetchProducts" class="hero-btn">Try Again</button>
        </div>
      </div>
    </div>

    <!-- Products Section - Using same classes as Home.vue -->
    <section v-else class="featured-section">
      <div class="container">
        <h2 class="section-title">Our Fresh Products</h2>
        <p class="section-subtitle">Fresh from our database - Handpicked for quality and freshness</p>
        
        <!-- Products Grid - Using same classes as Home.vue -->
        <div class="fruits-grid">
          <div class="fruit-card" v-for="product in products" :key="product.id">
            <div class="fruit-image">
              <img 
                v-if="product.image_url" 
                :src="product.image_url" 
                :alt="product.name"
                class="product-img"
                @error="handleImageError"
              />
              <span v-else class="fruit-emoji">🍎</span>
            </div>
            <div class="fruit-content">
              <h3 class="fruit-name">{{ product.name }}</h3>
              <p class="fruit-price">${{ parseFloat(product.price).toFixed(2) }}</p>
              <p v-if="product.description" class="fruit-description">{{ product.description }}</p>
              
              <!-- Benefits from database -->
              <div v-if="product.benefits && product.benefits.length > 0" class="fruit-benefits">
                <span class="benefit-tag" v-for="benefit in product.benefits" :key="benefit">
                  {{ benefit }}
                </span>
              </div>
              
              <button @click="addToCart(product)" class="fruit-btn" :disabled="addingToCart === product.id">
                {{ addingToCart === product.id ? 'Adding...' : 'Add to Cart' }}
              </button>
            </div>
          </div>
        </div>

        <!-- No Products Found -->
        <div v-if="products.length === 0 && !loading" class="no-products">
          <div class="fruit-card">
            <div class="fruit-content">
              <h3 class="fruit-name">No products found</h3>
              <p class="fruit-description">No products available at the moment</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section - Reuse from Home -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Why Choose FruitStore?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3>100% Organic</h3>
            <p>All our fruits are grown without harmful pesticides and chemicals</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Fresh fruits delivered to your doorstep within 24 hours</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive prices with no compromise on quality</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3>Premium Quality</h3>
            <p>Hand-selected fruits that meet our high quality standards</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-toast">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

// Reactive data
const products = ref([])
const loading = ref(true)
const error = ref(null)
const addingToCart = ref(null)
const successMessage = ref('')

// Methods
const fetchProducts = async () => {
  loading.value = true
  error.value = null
  
  try {
    console.log('Fetching products from API...')
    const response = await api.get('/fruits')
    
    console.log('API Response:', response.data)
    
    if (response.data && response.data.data) {
      products.value = response.data.data
      console.log('Products loaded:', products.value.length)
    } else {
      throw new Error('Invalid response format')
    }
  } catch (err) {
    console.error('Error fetching products:', err)
    
    if (err.response?.status === 401) {
      error.value = 'Please login to view products'
    } else if (err.response?.status === 403) {
      error.value = 'You do not have permission to view products'
    } else {
      error.value = err.message || 'Failed to load products'
    }
  } finally {
    loading.value = false
  }
}

const addToCart = async (product) => {
  addingToCart.value = product.id
  
  try {
    // Simulate API call for adding to cart
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    showSuccessMessage(`${product.name} added to cart!`)
    
  } catch (err) {
    console.error('Error adding to cart:', err)
    showSuccessMessage('Failed to add to cart. Please try again.')
  } finally {
    addingToCart.value = null
  }
}

const handleImageError = (event) => {
  console.log('Image failed to load:', event.target.src)
  event.target.style.display = 'none'
  // Show emoji instead
  event.target.parentElement.innerHTML = '<span class="fruit-emoji">🍎</span>'
}

const showSuccessMessage = (message) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})
</script>
<style>
.product-img {
  width: 100%;
  height: 200px; /* Set fixed height */
  object-fit: cover; /* Maintain aspect ratio */
  border-radius: 10px;
}
</style>