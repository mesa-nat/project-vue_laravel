<template>
    <div>
      <CardProduct @update-cart-count="handleCartUpdate" @add-order="handleAddOrder" />
    </div>
  </template>
  
  <script setup>
  import CardProduct from '@/components/CardProduct.vue'
  import { inject } from 'vue'
  
  const updateCartCount = inject('updateCartCount')
  const addOrderToHistory = inject('addOrderToHistory')
  
  const handleCartUpdate = (count) => {
    updateCartCount(count)
  }
  
  const handleAddOrder = (orderData) => {
    addOrderToHistory(orderData)
  }
  </script>
  
  <style lang="scss" scoped>
  </style>
  