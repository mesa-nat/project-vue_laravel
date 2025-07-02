<template>
  <div>
    <notification :cart-count="cartCount" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Notification from './components/Notification.vue'

const cartCount = ref(0)
const orderHistory = ref([])

const updateCartCount = (count) => {
  cartCount.value = count
}

const addOrderToHistory = (orderData) => {
  orderHistory.value.unshift(orderData) // Add to beginning of array (newest first)
}

provide('updateCartCount', updateCartCount)
provide('addOrderToHistory', addOrderToHistory)
provide('orderHistory', orderHistory)
</script>

<style>
</style>
