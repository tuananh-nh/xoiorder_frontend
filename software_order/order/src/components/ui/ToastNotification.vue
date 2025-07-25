<template>
  <teleport to="body">
    <div class="toast-container">
      <transition-group name="toast" tag="div">
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          :class="['toast-notification', `toast-${toast.type}`]"
          @click="removeToast(toast.id)"
        >
          <div class="toast-icon">
            <i :class="getToastIcon(toast.type)"></i>
          </div>
          
          <div class="toast-content">
            <div class="toast-title" v-if="toast.title">{{ toast.title }}</div>
            <div class="toast-message">{{ toast.message }}</div>
          </div>
          
          <button class="toast-close" @click.stop="removeToast(toast.id)">
            <i class="bi bi-x"></i>
          </button>
          
          <div class="toast-progress" :style="{ animationDuration: `${toast.duration}ms` }"></div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Toast state
const toasts = ref([])
let toastId = 0

// Toast types and their icons
const toastIcons = {
  success: 'bi bi-check-circle-fill',
  error: 'bi bi-exclamation-triangle-fill',
  warning: 'bi bi-exclamation-circle-fill',
  info: 'bi bi-info-circle-fill'
}

// Methods
const getToastIcon = (type) => toastIcons[type] || toastIcons.info

const addToast = (message, type = 'success', title = null, duration = 3000) => {
  const id = ++toastId
  const toast = {
    id,
    message,
    type,
    title,
    duration
  }
  
  toasts.value.push(toast)
  
  // Auto remove toast after duration
  setTimeout(() => {
    removeToast(id)
  }, duration)
  
  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const clearAllToasts = () => {
  toasts.value = []
}

// Global toast functions
const showSuccess = (message, title = null, duration = 3000) => {
  return addToast(message, 'success', title, duration)
}

const showError = (message, title = 'Lỗi', duration = 4000) => {
  return addToast(message, 'error', title, duration)
}

const showWarning = (message, title = 'Cảnh báo', duration = 3500) => {
  return addToast(message, 'warning', title, duration)
}

const showInfo = (message, title = null, duration = 3000) => {
  return addToast(message, 'info', title, duration)
}

// Event listeners for global toast events
const handleToastEvent = (event) => {
  const { message, type, title, duration } = event.detail
  addToast(message, type, title, duration)
}

onMounted(() => {
  window.addEventListener('show-toast', handleToastEvent)
})

onUnmounted(() => {
  window.removeEventListener('show-toast', handleToastEvent)
})

// Expose methods to parent components
defineExpose({
  showSuccess,
  showError,
  showWarning,
  showInfo,
  clearAllToasts
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
  max-width: 400px;
  width: 100%;
}

.toast-notification {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  cursor: pointer;
  pointer-events: all;
  position: relative;
  overflow: hidden;
  min-height: 60px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.toast-notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  pointer-events: none;
}

.toast-success {
  border-left-color: #28a745;
  background: linear-gradient(135deg, #ffffff, #f8fff9);
}

.toast-error {
  border-left-color: #dc3545;
  background: linear-gradient(135deg, #ffffff, #fff8f8);
}

.toast-warning {
  border-left-color: #ffc107;
  background: linear-gradient(135deg, #ffffff, #fffef8);
}

.toast-info {
  border-left-color: #007bff;
  background: linear-gradient(135deg, #ffffff, #f8fbff);
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-top: 0.125rem;
}

.toast-success .toast-icon {
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.toast-error .toast-icon {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
}

.toast-warning .toast-icon {
  color: #ffc107;
  background: rgba(255, 193, 7, 0.1);
}

.toast-info .toast-icon {
  color: #007bff;
  background: rgba(0, 123, 255, 0.1);
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #212529;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.toast-message {
  font-size: 0.875rem;
  color: #495057;
  line-height: 1.4;
  word-wrap: break-word;
}

.toast-close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #6c757d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.125rem;
}

.toast-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #495057;
  transform: scale(1.1);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    rgba(40, 167, 69, 0.3) 0%, 
    rgba(40, 167, 69, 0.7) 50%, 
    rgba(40, 167, 69, 1) 100%
  );
  animation: progress linear;
  transform-origin: left;
}

.toast-error .toast-progress {
  background: linear-gradient(90deg, 
    rgba(220, 53, 69, 0.3) 0%, 
    rgba(220, 53, 69, 0.7) 50%, 
    rgba(220, 53, 69, 1) 100%
  );
}

.toast-warning .toast-progress {
  background: linear-gradient(90deg, 
    rgba(255, 193, 7, 0.3) 0%, 
    rgba(255, 193, 7, 0.7) 50%, 
    rgba(255, 193, 7, 1) 100%
  );
}

.toast-info .toast-progress {
  background: linear-gradient(90deg, 
    rgba(0, 123, 255, 0.3) 0%, 
    rgba(0, 123, 255, 0.7) 50%, 
    rgba(0, 123, 255, 1) 100%
  );
}

/* Animations */
.toast-enter-active {
  animation: toastSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.toast-leave-active {
  animation: toastSlideOut 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.toast-move {
  transition: transform 0.3s ease;
}

@keyframes toastSlideIn {
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
  60% {
    opacity: 0.8;
    transform: translateX(-10px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes toastSlideOut {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
}

@keyframes progress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

/* Responsive */
@media (max-width: 576px) {
  .toast-container {
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .toast-notification {
    margin-bottom: 0.5rem;
    padding: 0.875rem;
  }
  
  .toast-title {
    font-size: 0.85rem;
  }
  
  .toast-message {
    font-size: 0.8rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast-notification {
    background: #2d3748;
    border-color: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
  }
  
  .toast-notification::before {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  }
  
  .toast-title {
    color: #f7fafc;
  }
  
  .toast-message {
    color: #cbd5e0;
  }
  
  .toast-close {
    color: #a0aec0;
  }
  
  .toast-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
  }
}
</style>