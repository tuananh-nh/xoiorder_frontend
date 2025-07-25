<template>
  <nav class="app-navbar navbar navbar-expand-lg py-2 px-3">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Logo Section -->
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img 
          src="@/assets/images/LogoXoi.jpg" 
          alt="Logo Xôi" 
          class="brand-logo"
          loading="lazy"
        />
      </router-link>

      <!-- Right Side Actions -->
      <div class="navbar-actions d-flex align-items-center gap-3">
        <!-- Menu Toggle -->
        <button 
          class="action-btn menu-btn"
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasMenu"
          aria-label="Mở menu tra cứu"
        >
          <i class="bi bi-search"></i>
        </button>

        <!-- Cart Button -->
        <button 
          class="action-btn cart-btn position-relative"
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasCart"
          aria-label="Xem giỏ hàng"
        >
          <i class="bi bi-cart3"></i>
          <transition name="badge-bounce">
            <span 
              v-if="cartItemCount > 0" 
              class="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill"
            >
              {{ cartItemCount > 99 ? '99+' : cartItemCount }}
            </span>
          </transition>
        </button>

        <!-- User Profile Dropdown -->
        <div class="dropdown">
          <button
            class="user-avatar-btn"
            role="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            aria-label="Menu tài khoản"
          >
            <img 
              src="@/assets/images/avata.jpg" 
              alt="Avatar người dùng" 
              class="user-avatar"
              loading="lazy"
            />
            <div class="user-status-indicator"></div>
          </button>
          
          <ul class="dropdown-menu dropdown-menu-end user-dropdown shadow-lg">
            <li class="user-info">
              <div class="user-name">{{ userInfo.name }}</div>
              <div class="user-email">{{ userInfo.email }}</div>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link class="dropdown-item dropdown-link" to="/account/setting">
                <i class="fas fa-cog"></i>
                <span>Cài đặt tài khoản</span>
              </router-link>
            </li>
            <li>
              <button class="dropdown-item dropdown-link logout-btn" @click="handleLogout">
                <i class="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  cartItemCount: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['logout'])

// User info (could be from a store in real app)
const userInfo = {
  name: 'Gia Huy',
  email: 'trannguyengiahuy123@gmail.com'
}

// Methods
const handleLogout = () => {
  emit('logout')
}
</script>

<style scoped>
.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.brand-logo {
  height: 50px;
  width: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.05);
}

.navbar-actions {
  gap: 1rem;
}

.action-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #495057;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #007bff, #0056b3);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.action-btn:hover::before {
  opacity: 1;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
  color: white;
}

.action-btn i {
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
}

.cart-badge {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4);
}

.user-avatar-btn {
  border: none;
  background: transparent;
  position: relative;
  padding: 0;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.user-avatar-btn:hover {
  transform: scale(1.05);
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #007bff, #28a745) border-box;
  transition: all 0.3s ease;
}

.user-status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #28a745;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-dropdown {
  min-width: 260px;
  border: none;
  border-radius: 16px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.user-info {
  padding: 1rem 1.5rem 0.5rem;
}

.user-name {
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.875rem;
  color: #6c757d;
}

.dropdown-link {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #495057;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
}

.dropdown-link:hover {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #007bff;
  transform: translateX(4px);
}

.dropdown-link i {
  width: 18px;
  text-align: center;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #dc354510, #dc354520);
  color: #dc3545;
}

/* Animations */
.badge-bounce-enter-active {
  animation: badgeBounce 0.5s ease;
}

.badge-bounce-leave-active {
  animation: badgeBounce 0.3s ease reverse;
}

@keyframes badgeBounce {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.3) rotate(90deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 576px) {
  .navbar-actions {
    gap: 0.5rem;
  }
  
  .action-btn {
    width: 40px;
    height: 40px;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
  }
  
  .brand-logo {
    height: 40px;
  }
}
</style>