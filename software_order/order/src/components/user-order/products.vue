<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    router.push('/sign-in')
  }
})

const logout = () => {
  localStorage.removeItem('auth_token')
  router.push('/sign-in')
}
</script>

<template>
  <div class="products-container">
    <header class="products-header">
      <h1>Sản phẩm</h1>
      <button @click="logout" class="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        Đăng xuất
      </button>
    </header>
    
    <div class="products-content">
      <div class="welcome-message">
        <h2>Chào mừng bạn đến với cửa hàng!</h2>
        <p>Bạn đã đăng nhập thành công bằng tài khoản Google.</p>
      </div>
      
      <div class="products-grid">
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-utensils"></i>
          </div>
          <h3>Xôi Gà</h3>
          <p class="price">25.000 VNĐ</p>
          <button class="order-btn">Đặt hàng</button>
        </div>
        
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-leaf"></i>
          </div>
          <h3>Xôi Lá Cẩm</h3>
          <p class="price">20.000 VNĐ</p>
          <button class="order-btn">Đặt hàng</button>
        </div>
        
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-seedling"></i>
          </div>
          <h3>Xôi Đậu Xanh</h3>
          <p class="price">22.000 VNĐ</p>
          <button class="order-btn">Đặt hàng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  min-height: 100vh;
  background-color: #f7fafc;
}

.products-header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.products-header h1 {
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.logout-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #c53030;
}

.products-content {
  padding: 2rem;
}

.welcome-message {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-message h2 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.welcome-message p {
  color: #718096;
  font-size: 1.1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.product-image i {
  font-size: 2rem;
  color: white;
}

.product-card h3 {
  color: #2d3748;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.price {
  color: #e53e3e;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.order-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
  width: 100%;
}

.order-btn:hover {
  opacity: 0.9;
}
</style>