<template>
  <div class="order-history-page">
    <h1>Order History</h1>
    
    <div v-if="orderHistory.length === 0" class="no-orders">
      <div class="empty-state">
        <i class="empty-icon">📋</i>
        <h3>No Orders Yet</h3>
        <p>You haven't placed any orders yet. Start shopping to see your order history here!</p>
        <router-link to="/product" class="btn-shop-now">
          Shop Now
        </router-link>
      </div>
    </div>

    <div v-else class="orders-container">
      <div class="order-card" v-for="order in orderHistory" :key="order.id">
        <div class="order-header">
          <div class="order-info">
            <h3>Order #{{ order.id }}</h3>
            <p class="order-date">{{ order.date }} at {{ order.time }}</p>
          </div>
          <div class="order-status">
            <span class="status-badge" :class="order.status.toLowerCase()">
              {{ order.status }}
            </span>
          </div>
        </div>
        
        <div class="order-items">
          <div class="item" v-for="item in order.items" :key="item.name">
            <div class="item-details">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-quantity">Qty: {{ item.quantity }}</span>
            </div>
            <div class="item-price">
              <span class="unit-price">${{ item.price.toFixed(2) }} each</span>
              <span class="total-price">${{ item.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        
        <div class="order-footer">
          <div class="order-total">
            <strong>Total: ${{ order.totalAmount.toFixed(2) }}</strong>
          </div>
          <div class="order-actions">
           
            <button @click="viewDetails(order)" class="btn-details">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const orderHistory = inject('orderHistory')
const router = useRouter()

const reorder = (order) => {
  let reorderSummary = 'Reorder Items:\n';
  order.items.forEach(item => {
    reorderSummary += `${item.quantity} ${item.name}(s) - $${item.total.toFixed(2)}\n`;
  });
  reorderSummary += `\nTotal: $${order.totalAmount.toFixed(2)}`;
  
  if (confirm(`${reorderSummary}\n\nWould you like to add these items to your cart?`)) {
    alert('Items added to cart! Redirecting to products page...');
    router.push('/product');
  }
}

const viewDetails = (order) => {
  let detailsSummary = `Order Details:\n\nOrder ID: #${order.id}\nDate: ${order.date}\nTime: ${order.time}\nStatus: ${order.status}\n\nItems:\n`;
  order.items.forEach(item => {
    detailsSummary += `• ${item.name} - Qty: ${item.quantity} - $${item.price.toFixed(2)} each = $${item.total.toFixed(2)}\n`;
  });
  detailsSummary += `\nTotal Amount: $${order.totalAmount.toFixed(2)}`;
  alert(detailsSummary);
}
</script>

<style scoped>
.order-history-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 140px);
  background: #f8f9fa;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Empty State Styles */
.no-orders {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  border: 1px solid #e9ecef;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  display: block;
  opacity: 0.7;
}

.empty-state h3 {
  color: #495057;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
}

.empty-state p {
  color: #6c757d;
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 1rem;
}

.btn-shop-now {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-shop-now:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  text-decoration: none;
  color: white;
}

/* Orders Container */
.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Order Card Styles */
.order-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.order-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Order Header */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.order-info h3 {
  color: #495057;
  margin: 0 0 5px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.order-date {
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.order-status {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.completed {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.status-badge.cancelled {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Order Items */
.order-items {
  padding: 20px 25px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f1f3f4;
  transition: background-color 0.2s ease;
}

.item:last-child {
  border-bottom: none;
}

.item:hover {
  background-color: #f8f9fa;
  margin: 0 -25px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 8px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  font-weight: 600;
  color: #495057;
  font-size: 1.1rem;
}

.item-quantity {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
}

.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.unit-price {
  color: #6c757d;
  font-size: 0.85rem;
}

.total-price {
  font-weight: 700;
  color: #28a745;
  font-size: 1.1rem;
}

/* Order Footer */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.order-total {
  font-size: 1.3rem;
  color: #495057;
}

.order-total strong {
  color: #28a745;
  font-weight: 700;
}

.order-actions {
  display: flex;
  gap: 12px;
}

.btn-reorder, .btn-details {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-reorder {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.btn-reorder:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.btn-details {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-details:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .order-history-page {
    padding: 15px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .order-card {
    border-radius: 12px;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 15px 20px;
  }

  .order-info h3 {
    font-size: 1.1rem;
  }

  .order-items {
    padding: 15px 20px;
  }

  .item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 0;
  }

  .item-price {
    align-items: flex-start;
    width: 100%;
  }

  .order-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
    padding: 15px 20px;
  }

  .order-actions {
    width: 100%;
    justify-content: space-between;
  }

  .btn-reorder, .btn-details {
    flex: 1;
    padding: 12px 16px;
    font-size: 0.85rem;
  }

  .empty-state {
    margin: 0 10px;
    padding: 30px 20px;
  }

  .empty-state h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .order-history-page {
    padding: 10px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .order-header, .order-items, .order-footer {
    padding: 12px 15px;
  }

  .order-info h3 {
    font-size: 1rem;
  }

  .order-date {
    font-size: 0.8rem;
  }

  .status-badge {
    padding: 4px 12px;
    font-size: 0.75rem;
  }

  .item-name {
    font-size: 1rem;
  }

  .item-quantity {
    font-size: 0.8rem;
  }

  .total-price {
    font-size: 1rem;
  }

  .order-total {
    font-size: 1.1rem;
  }
}

/* Animation for new orders */
@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.order-card {
  animation: slideInFromTop 0.5s ease-out;
}

/* Hover effects for better UX */
.order-card:hover .order-info h3 {
  color: #667eea;
  transition: color 0.3s ease;
}

</style>