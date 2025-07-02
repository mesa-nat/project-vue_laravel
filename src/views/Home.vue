<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to FruitStore</h1>
        <p class="hero-subtitle">Fresh, Organic, and Delicious Fruits Delivered to Your Door</p>
        <router-link to="/product" class="hero-btn">Shop Now</router-link>
      </div>
      <div class="hero-image">
        <div class="fruit-emoji">🍎🍌🍊🥝🍇</div>
      </div>
    </section>

    <!-- Featured Fruits Section -->
    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">Our Fresh Fruits</h2>
        <p class="section-subtitle">Handpicked for quality and freshness</p>
        
        <div class="fruits-grid">
          <div class="fruit-card" v-for="fruit in featuredFruits" :key="fruit.id">
            <div class="fruit-image">
              <span class="fruit-emoji">{{ fruit.emoji }}</span>
            </div>
            <div class="fruit-content">
              <h3 class="fruit-name">{{ fruit.name }}</h3>
              <p class="fruit-price">${{ fruit.price.toFixed(2) }}</p>
              <p class="fruit-description">{{ fruit.description }}</p>
              <div class="fruit-benefits">
                <span class="benefit-tag" v-for="benefit in fruit.benefits" :key="benefit">
                  {{ benefit }}
                </span>
              </div>
              <router-link to="/product" class="fruit-btn">Add to Cart</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
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

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Start Your Healthy Journey?</h2>
          <p>Join thousands of satisfied customers who trust FruitStore for their daily fruit needs</p>
          <div class="cta-buttons">
            <router-link to="/product" class="cta-btn primary">Browse Products</router-link>
            <router-link to="/about" class="cta-btn secondary">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api' // adjust path as needed

const featuredFruits = ref([
  {
    id: 1,
    name: 'Fresh Apples',
    price: 2.50,
    emoji: '🍎',
    description: 'Crispy and sweet apples packed with vitamins and fiber. Perfect for snacking or baking.',
    benefits: ['Vitamin C', 'Fiber', 'Antioxidants']
  },
  {
    id: 2,
    name: 'Ripe Bananas',
    price: 1.80,
    emoji: '🍌',
    description: 'Naturally sweet bananas rich in potassium and energy. Great for smoothies and breakfast.',
    benefits: ['Potassium', 'Energy', 'B6']
  },
  {
    id: 3,
    name: 'Juicy Oranges',
    price: 3.20,
    emoji: '🍊',
    description: 'Fresh citrus oranges bursting with vitamin C and natural sweetness. Perfect for juice.',
    benefits: ['Vitamin C', 'Folate', 'Citrus']
  },
  {
    id: 4,
    name: 'Sweet Strawberries',
    price: 4.50,
    emoji: '🍓',
    description: 'Delicious strawberries packed with antioxidants and natural sweetness.',
    benefits: ['Antioxidants', 'Vitamin C', 'Manganese']
  },
  {
    id: 5,
    name: 'Fresh Grapes',
    price: 3.80,
    emoji: '🍇',
    description: 'Sweet and juicy grapes perfect for snacking or making fresh juice.',
    benefits: ['Resveratrol', 'Vitamin K', 'Antioxidants']
  },
  {
    id: 6,
    name: 'Tropical Kiwi',
    price: 2.90,
    emoji: '🥝',
    description: 'Exotic kiwi fruits with unique taste and loaded with vitamin C and fiber.',
    benefits: ['Vitamin C', 'Fiber', 'Vitamin K']
  }
])

// Fetch names from API and update the names only
onMounted(async () => {
  try {
    const response = await api.get('/fruits'); // Adjust endpoint if needed
    const namesFromAPI = response.data.data;

    // Update only the name of each matching fruit by ID
    featuredFruits.value.forEach(fruit => {
      const matched = namesFromAPI.find(item => item.id === fruit.id);
      if (matched) {
        fruit.name = matched.name;
      }
    });

  } catch (error) {
    console.error('Failed to fetch fruit names from API:', error);
  }
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.hero-content {
  flex: 1;
  max-width: 500px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-btn {
  display: inline-block;
  padding: 15px 35px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
}

.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
  text-decoration: none;
  color: #667eea;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fruit-emoji {
  font-size: 6rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Featured Section */
.featured-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 50px;
}

.fruits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.fruit-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.fruit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.fruit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.fruit-image {
  text-align: center;
  margin-bottom: 20px;
}

.fruit-image .fruit-emoji {
  font-size: 4rem;
  display: block;
  margin-bottom: 10px;
}

.fruit-content {
  text-align: center;
}

.fruit-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.fruit-price {
  font-size: 1.8rem;
  font-weight: 800;
  color: #28a745;
  margin-bottom: 15px;
}

.fruit-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.fruit-benefits {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 25px;
}

.benefit-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.fruit-btn {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.fruit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  text-decoration: none;
  color: white;
}

/* Features Section */
.features-section {
  padding: 80px 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.feature-card {
  text-align: center;
  padding: 40px 20px;
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 2px solid #f8f9fa;
}

.feature-card:hover {
  border-color: #667eea;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 15px 35px;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.cta-btn.primary {
  background: white;
  color: #667eea;
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
}

.cta-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
  text-decoration: none;
  color: #667eea;
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}
</style>