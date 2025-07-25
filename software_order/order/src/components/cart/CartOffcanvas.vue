<template>
  <div class="offcanvas offcanvas-end cart-offcanvas" id="offcanvasCart" tabindex="-1">
    <div class="offcanvas-header">
      <div class="header-content">
        <h5 class="offcanvas-title">
          <i class="bi bi-cart3 me-2"></i>
          Giỏ hàng
        </h5>
        <div class="cart-summary" v-if="products.length > 0">
          <span class="item-count">{{ products.length }} món</span>
        </div>
      </div>
      <button 
        type="button" 
        class="btn-close-custom" 
        data-bs-dismiss="offcanvas"
        aria-label="Đóng giỏ hàng"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="offcanvas-body p-0">
      <!-- Empty Cart State -->
      <div v-if="products.length === 0" class="empty-cart">
        <div class="empty-cart-content">
          <div class="empty-cart-icon">
            <i class="bi bi-cart-x"></i>
          </div>
          <h6 class="empty-cart-title">Giỏ hàng trống</h6>
          <p class="empty-cart-text">Hãy thêm món ăn yêu thích vào giỏ hàng!</p>
          <button 
            class="btn btn-primary btn-browse"
            data-bs-dismiss="offcanvas"
          >
            <i class="bi bi-plus-circle me-2"></i>
            Xem thực đơn
          </button>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-else class="cart-content">
        <div class="cart-items">
          <transition-group name="cart-item" tag="div">
            <div 
              v-for="(product, index) in products" 
              :key="product.productId"
              class="cart-item"
            >
              <div class="item-image">
                <img 
                  :src="`http://localhost:8080/images/${product.productImage}`"
                  :alt="product.productName"
                  loading="lazy"
                />
              </div>
              
              <div class="item-details">
                <div class="item-header">
                  <h6 class="item-name">{{ product.productName }}</h6>
                  <button 
                    class="btn-remove"
                    @click="removeItem(product.productId)"
                    aria-label="Xóa sản phẩm"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
                
                <div class="item-footer">
                  <div class="quantity-controls">
                    <button 
                      class="quantity-btn decrease"
                      @click="decreaseItem(product.productId)"
                      :disabled="product.quantity <= 1"
                      aria-label="Giảm số lượng"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="quantity">{{ product.quantity }}</span>
                    <button 
                      class="quantity-btn increase"
                      @click="increaseItem(product.productId)"
                      aria-label="Tăng số lượng"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  
                  <div class="item-price">
                    {{ formatPrice(product.price * product.quantity) }}
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Cart Footer -->
        <div class="cart-footer">
          <div class="total-section">
            <div class="total-row">
              <span class="total-label">Tạm tính:</span>
              <span class="total-amount">{{ formatPrice(totalAmount) }}</span>
            </div>
            <div class="total-row final">
              <span class="total-label">Tổng cộng:</span>
              <span class="total-amount">{{ formatPrice(totalAmount) }}</span>
            </div>
          </div>
          
          <div class="action-buttons">
            <button 
              class="btn btn-outline-primary btn-add-more"
              data-bs-dismiss="offcanvas"
            >
              <i class="bi bi-plus-circle me-2"></i>
              Thêm món
            </button>
            <button 
              class="btn btn-primary btn-checkout"
              :disabled="isCheckoutLoading"
              @click="handleCheckout"
            >
              <span v-if="!isCheckoutLoading">
                <i class="bi bi-credit-card me-2"></i>
                Thanh toán
              </span>
              <span v-else>
                <i class="bi bi-arrow-repeat spin me-2"></i>
                Đang xử lý...
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Props
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  totalAmount: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['increase-item', 'decrease-item', 'remove-item', 'checkout'])

// Local state
const isCheckoutLoading = ref(false)

// Methods
const formatPrice = (price) => {
  return price?.toLocaleString('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }) || '0₫'
}

const increaseItem = (productId) => {
  emit('increase-item', productId)
}

const decreaseItem = (productId) => {
  emit('decrease-item', productId)
}

const removeItem = (productId) => {
  emit('remove-item', productId)
}

const handleCheckout = async () => {
  if (props.products.length === 0) return
  
  isCheckoutLoading.value = true
  try {
    await emit('checkout')
  } finally {
    setTimeout(() => {
      isCheckoutLoading.value = false
    }, 1000)
  }
}
</script>

<style scoped>
.cart-offcanvas {
  width: 100%;
  max-width: 420px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
}

.offcanvas-header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.offcanvas-title {
  font-weight: 700;
  color: #212529;
  margin: 0;
  font-size: 1.25rem;
}

.cart-summary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.btn-close-custom {
  width: 40px;
  height: 40px;
  border: none;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #6c757d;
}

.btn-close-custom:hover {
  background: #e9ecef;
  transform: scale(1.1);
  color: #495057;
}

/* Empty Cart */
.empty-cart {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.empty-cart-content {
  text-align: center;
  max-width: 280px;
}

.empty-cart-icon {
  font-size: 4rem;
  color: #dee2e6;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.empty-cart-title {
  color: #495057;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.empty-cart-text {
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.btn-browse {
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

/* Cart Content */
.cart-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-items::-webkit-scrollbar {
  width: 6px;
}

.cart-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.cart-items::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f1f3f4;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.item-image {
  flex-shrink: 0;
}

.item-image img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
  line-height: 1.3;
  flex: 1;
  margin-right: 0.5rem;
}

.btn-remove {
  width: 32px;
  height: 32px;
  border: none;
  background: #fff5f5;
  color: #dc3545;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.1);
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.25rem;
  border-radius: 25px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quantity-btn:hover:not(:disabled) {
  background: #007bff;
  color: white;
  transform: scale(1.1);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #495057;
}

.item-price {
  font-weight: 700;
  color: #28a745;
  font-size: 1rem;
}

/* Cart Footer */
.cart-footer {
  background: white;
  border-top: 1px solid #e9ecef;
  padding: 1.5rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.total-section {
  margin-bottom: 1.5rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.total-row.final {
  padding-top: 0.75rem;
  border-top: 2px solid #e9ecef;
  margin-bottom: 0;
  font-size: 1.1rem;
}

.total-label {
  color: #495057;
  font-weight: 500;
}

.total-row.final .total-label {
  font-weight: 700;
  color: #212529;
}

.total-amount {
  font-weight: 700;
  color: #28a745;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-add-more,
.btn-checkout {
  flex: 1;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  border: 2px solid;
  transition: all 0.3s ease;
}

.btn-add-more {
  border-color: #007bff;
  color: #007bff;
  background: transparent;
}

.btn-add-more:hover {
  background: #007bff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-checkout {
  background: linear-gradient(135deg, #28a745, #20c997);
  border-color: #28a745;
  color: white;
}

.btn-checkout:hover:not(:disabled) {
  background: linear-gradient(135deg, #20c997, #28a745);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
}

.btn-checkout:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cart-item-enter-active {
  animation: slideInRight 0.5s ease;
}

.cart-item-leave-active {
  animation: slideOutRight 0.3s ease;
}

.cart-item-move {
  transition: transform 0.3s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}

/* Responsive */
@media (max-width: 576px) {
  .cart-offcanvas {
    max-width: 100vw;
  }
  
  .item-image img {
    width: 60px;
    height: 60px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-add-more,
  .btn-checkout {
    flex: none;
  }
}
</style>