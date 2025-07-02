<template>
    <div class="order-page">
      <h1>Order Fruits</h1>
      <div class="cards-container">
        <div class="fruit-card" v-for="fruit in fruits" :key="fruit.id">
          <div class="card-content">
            <h3>{{ fruit.name }}</h3>
            <p class="price">${{ fruit.price.toFixed(2) }}</p>
            <div class="quantity-controls">
              <button 
                @click="decreaseQuantity(fruit.id)" 
                :disabled="fruit.quantity <= 0"
                class="btn-decrease"
              >
                -
              </button>
              <span class="quantity">{{ fruit.quantity }}</span>
              <button 
                @click="increaseQuantity(fruit.id)" 
                class="btn-increase"
              >
                +
              </button>
            </div>
            <div class="total-price">
              Total: ${{ (fruit.price * fruit.quantity).toFixed(2) }}
            </div>
            <button 
              @click="orderFruit(fruit)" 
              :disabled="fruit.quantity <= 0"
              class="btn-order"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      <div class="grand-total" v-if="grandTotal > 0">
        <h3>Grand Total: ${{ grandTotal.toFixed(2) }}</h3>
        <button @click="orderAll" class="btn-order-all">Order All</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const emit = defineEmits(['update-cart-count', 'add-order'])
  
  const fruits = ref([
    {
      id: 1,
      name: 'Apple',
      price: 2.50,
      quantity: 0
    },
    {
      id: 2,
      name: 'Banana',
      price: 1.80,
      quantity: 0
    },
    {
      id: 3,
      name: 'Orange',
      price: 3.20,
      quantity: 0
    }
  ])
  
  const grandTotal = computed(() => {
    return fruits.value.reduce((total, fruit) => {
      return total + (fruit.price * fruit.quantity);
    }, 0);
  })
  
  const totalCartItems = computed(() => {
    return fruits.value.reduce((total, fruit) => {
      return total + fruit.quantity;
    }, 0);
  })
  
  const increaseQuantity = (fruitId) => {
    const fruit = fruits.value.find(f => f.id === fruitId);
    if (fruit) {
      fruit.quantity++;
      emitCartUpdate();
    }
  }
  
  const decreaseQuantity = (fruitId) => {
    const fruit = fruits.value.find(f => f.id === fruitId);
    if (fruit && fruit.quantity > 0) {
      fruit.quantity--;
      emitCartUpdate();
    }
  }
  
  const emitCartUpdate = () => {
    emit('update-cart-count', totalCartItems.value);
  }
  
  const orderFruit = (fruit) => {
    if (fruit.quantity > 0) {
      const orderData = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        items: [{
          name: fruit.name,
          price: fruit.price,
          quantity: fruit.quantity,
          total: fruit.price * fruit.quantity
        }],
        totalAmount: fruit.price * fruit.quantity,
        status: 'Completed'
      };
  
      emit('add-order', orderData);
      alert(`Ordered ${fruit.quantity} ${fruit.name}(s) for $${(fruit.price * fruit.quantity).toFixed(2)}`);
      fruit.quantity = 0;
      emitCartUpdate();
    }
  }
  
  const orderAll = () => {
    const orderItems = fruits.value.filter(fruit => fruit.quantity > 0);
    if (orderItems.length > 0) {
      const orderData = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        items: orderItems.map(fruit => ({
          name: fruit.name,
          price: fruit.price,
          quantity: fruit.quantity,
          total: fruit.price * fruit.quantity
        })),
        totalAmount: grandTotal.value,
        status: 'Completed'
      };
  
      emit('add-order', orderData);
  
      let orderSummary = 'Order Summary:\n';
      orderItems.forEach(fruit => {
        orderSummary += `${fruit.quantity} ${fruit.name}(s) - $${(fruit.price * fruit.quantity).toFixed(2)}\n`;
      });
      orderSummary += `\nTotal: $${grandTotal.value.toFixed(2)}`;
      alert(orderSummary);
      
      fruits.value.forEach(fruit => {
        fruit.quantity = 0;
      });
      emitCartUpdate();
    }
  }
  </script>
  
  <style scoped>
  .order-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .cards-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px 0;
  }
  
  .fruit-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    width: 250px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
  }
  
  .fruit-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .card-content h3 {
    margin: 0 0 10px 0;
    color: #333;
    text-align: center;
  }
  
  .price {
    font-size: 1.5em;
    font-weight: bold;
    color: #2c5530;
    text-align: center;
    margin: 10px 0;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin: 15px 0;
  }
  
  .btn-decrease, .btn-increase {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-decrease:hover, .btn-increase:hover {
    background: #0056b3;
  }
  
  .btn-decrease:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .quantity {
    font-size: 1.2em;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
  }
  
  .total-price {
    text-align: center;
    font-weight: bold;
    color: #2c5530;
    margin: 10px 0;
  }
  
  .btn-order {
    width: 100%;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }
  
  .btn-order:hover {
    background: #218838;
  }
  
  .btn-order:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .grand-total {
    text-align: center;
    margin-top: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .btn-order-all {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 12px 30px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }
  
  .btn-order-all:hover {
    background: #c82333;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }
  </style>
  