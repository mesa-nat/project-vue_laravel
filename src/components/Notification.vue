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
          
          <!-- Notification Icons Section -->
          <div class="nav-notifications">
            <div class="notification-item" @click="toggleCart" title="Shopping Cart">
                <i class="notification-icon">🔔</i>
              <span class="notification-badge" v-if="cartCount > 0">{{ cartCount }}</span>
            </div>
          </div>
  
          <div class="hamburger" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
            <span class="bar"></span>
          </div>
        </div>
      </nav>
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    cartCount: {
      type: Number,
      default: 0
    }
  })
  
  const isMobileMenuOpen = ref(false)
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
  
  const toggleCart = () => {
    alert(`Cart clicked! You have ${props.cartCount} items in your cart.`)
  }

  </script>
  
  <style>
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
  
  .nav-menu {
    display: flex;
    list-style: none;
    gap: 0;
  }
  
  .nav-item {
    position: relative;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-radius: 8px;
    margin: 0 4px;
  }
  
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .nav-link.active {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .icon {
    font-size: 1.2rem;
  }
  
  /* Notification Icons Styles */
  .nav-notifications {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .notification-item {
    position: relative;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  
  .notification-item:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  
  .profile-item {
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  .profile-item:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  
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
  
  .main-content {
    padding: 20px;
    min-height: calc(100vh - 70px);
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
  
    .nav-item {
      margin: 8px 0;
    }
  
    .nav-link {
      padding: 15px 20px;
      margin: 0 20px;
      justify-content: center;
    }
  
    .hamburger {
      display: flex;
    }
  
    .nav-container {
      padding: 0 15px;
    }
  
    .nav-logo h2 {
      font-size: 1.5rem;
    }
  
    .nav-notifications {
      gap: 10px;
    }
  
    .notification-item {
      padding: 6px;
    }
  
    .notification-icon {
      font-size: 1.1rem;
    }
  
    .notification-badge {
      width: 16px;
      height: 16px;
      font-size: 0.6rem;
    }
  }
  
  @media screen and (max-width: 480px) {
    .nav-container {
      height: 60px;
    }
    
    .nav-logo h2 {
      font-size: 1.3rem;
    }
    
    .main-content {
      padding: 15px;
      min-height: calc(100vh - 60px);
    }
    
    .nav-menu {
      top: 60px;
    }
  
    .nav-notifications {
      gap: 8px;
    }
  
    .notification-item {
      padding: 5px;
    }
  
    .notification-icon {
      font-size: 1rem;
    }
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
  }
  </style>
  