<template>
  <div class="main-layout">
    <!-- Navigation -->
    <AppNavbar 
      :cart-item-count="totalItems" 
      @logout="handleLogout" 
    />

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        <ProductHome @cart-updated="fetchCart" />
      </div>
    </main>

    <!-- Cart Offcanvas -->
    <CartOffcanvas
      :products="products"
      :total-amount="totalAmount"
      @increase-item="increaseItem"
      @decrease-item="decreaseItem"
      @remove-item="removeItem"
      @checkout="handleCheckout"
    />

    <!-- Search Offcanvas -->
    <SearchOffcanvas @order-selected="handleOrderSelected" />

    <!-- Toast Notifications -->
    <ToastNotification ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AppNavbar from './AppNavbar.vue'
import CartOffcanvas from '../cart/CartOffcanvas.vue'
import SearchOffcanvas from '../search/SearchOffcanvas.vue'
import ToastNotification from '../ui/ToastNotification.vue'
import ProductHome from '@/views/product/product_home.vue'

// State
const userId = 'C176ECEF-E536-4FC5-BDDB-8EFC3C9238C8'
const products = ref([])
const orderId = ref(null)
const toastRef = ref(null)

// Computed
const totalItems = computed(() =>
  products.value.reduce((sum, item) => sum + item.quantity, 0)
)

const totalAmount = computed(() =>
  products.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
)

// API Functions
const fetchCart = async () => {
  try {
    const res = await fetch(`http://localhost:8080/order/cart?userId=${userId}`)
    const data = await res.json()

    products.value = data.items || []
    orderId.value = data.orderId || null

    if (orderId.value) {
      localStorage.setItem('orderId', orderId.value)
    }
  } catch (err) {
    console.error('Không thể tải giỏ hàng:', err)
    showToast('Không thể tải giỏ hàng', 'error')
  }
}

const updateCart = async (url, method, body = null) => {
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    })

    if (!res.ok) {
      throw new Error('Lỗi khi cập nhật giỏ hàng')
    }

    await fetchCart()
    return true
  } catch (err) {
    console.error('Lỗi cập nhật giỏ hàng:', err)
    showToast('Có lỗi xảy ra khi cập nhật giỏ hàng', 'error')
    return false
  }
}

// Cart Actions
const increaseItem = async (productId) => {
  const success = await updateCart('http://localhost:8080/order/cart/increase', 'PUT', {
    orderId: orderId.value,
    productId,
    quantity: 1,
  })
  
  if (success) {
    showToast('Đã tăng số lượng', 'success')
  }
}

const decreaseItem = async (productId) => {
  const product = products.value.find(p => p.productId === productId)
  if (!product) return

  if (product.quantity === 1) {
    removeItem(productId)
  } else {
    const success = await updateCart('http://localhost:8080/order/cart/decrease', 'PUT', {
      orderId: orderId.value,
      productId,
      quantity: 1,
    })
    
    if (success) {
      showToast('Đã giảm số lượng', 'success')
    }
  }
}

const removeItem = async (productId) => {
  const url = `http://localhost:8080/order/cart/remove?orderId=${orderId.value}&productId=${productId}`
  const success = await updateCart(url, 'DELETE')
  
  if (success) {
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'success')
  }
}

const handleCheckout = async () => {
  if (products.value.length === 0) {
    showToast('Giỏ hàng trống', 'warning')
    return
  }

  try {
    showToast('Đang xử lý thanh toán...', 'info', null, 2000)
    
    // Simulate checkout API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart on successful checkout
    products.value = []
    orderId.value = null
    localStorage.removeItem('orderId')
    
    showToast('Thanh toán thành công!', 'success', 'Đơn hàng đã được xác nhận', 4000)
    
    // Close cart offcanvas
    const cartOffcanvas = document.getElementById('offcanvasCart')
    if (cartOffcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvas)
      if (bsOffcanvas) {
        bsOffcanvas.hide()
      }
    }
    
  } catch (error) {
    console.error('Checkout error:', error)
    showToast('Lỗi trong quá trình thanh toán', 'error')
  }
}

// Other Actions
const handleLogout = async () => {
  try {
    showToast('Đang đăng xuất...', 'info', null, 1500)
    
    // Simulate logout API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear user data
    localStorage.clear()
    
    // Redirect to login (if using router)
    // router.push('/login')
    
    showToast('Đã đăng xuất thành công', 'success')
    
  } catch (error) {
    console.error('Logout error:', error)
    showToast('Lỗi khi đăng xuất', 'error')
  }
}

const handleOrderSelected = (order) => {
  showToast(`Đã chọn đơn hàng ${order.code}`, 'info')
  console.log('Selected order:', order)
  
  // Close search offcanvas
  const searchOffcanvas = document.getElementById('offcanvasMenu')
  if (searchOffcanvas) {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(searchOffcanvas)
    if (bsOffcanvas) {
      bsOffcanvas.hide()
    }
  }
}

// Toast Helper
const showToast = (message, type = 'success', title = null, duration = 3000) => {
  if (toastRef.value) {
    switch (type) {
      case 'success':
        toastRef.value.showSuccess(message, title, duration)
        break
      case 'error':
        toastRef.value.showError(message, title, duration)
        break
      case 'warning':
        toastRef.value.showWarning(message, title, duration)
        break
      case 'info':
        toastRef.value.showInfo(message, title, duration)
        break
      default:
        toastRef.value.showSuccess(message, title, duration)
    }
  }
}

// Lifecycle
onMounted(() => {
  fetchCart()
  window.addEventListener('cart-updated', fetchCart)
  
  // Add padding to body for fixed navbar
  document.body.style.paddingTop = '80px'
})

onBeforeUnmount(() => {
  window.removeEventListener('cart-updated', fetchCart)
  document.body.style.paddingTop = '0'
})

// Global error handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  showToast('Đã xảy ra lỗi không mong muốn', 'error')
})
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.main-content {
  min-height: calc(100vh - 80px);
  padding-top: 80px; /* Account for fixed navbar */
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Global improvements */
:deep(.btn) {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.btn:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.form-control) {
  border-radius: 8px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

:deep(.form-control:focus) {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

:deep(.card) {
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

:deep(.card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Loading states */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem 0.5rem;
  }
  
  .main-content {
    padding-top: 70px;
  }
}

@media (max-width: 576px) {
  .content-wrapper {
    padding: 0.5rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .main-layout {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
    color: #e2e8f0;
  }
  
  :deep(.card) {
    background: #2d3748;
    color: #e2e8f0;
  }
  
  :deep(.form-control) {
    background: #4a5568;
    border-color: #718096;
    color: #e2e8f0;
  }
  
  :deep(.form-control:focus) {
    background: #4a5568;
    border-color: #63b3ed;
    color: #e2e8f0;
  }
}

/* Print styles */
@media print {
  .main-layout {
    background: white !important;
  }
  
  nav,
  .offcanvas,
  .toast-container {
    display: none !important;
  }
  
  .main-content {
    padding-top: 0 !important;
  }
}
</style>