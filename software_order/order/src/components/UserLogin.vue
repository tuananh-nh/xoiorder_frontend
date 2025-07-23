<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

// Type definitions for Google API
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: () => void
        }
      }
    }
  }
}

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

// Environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const handleCredentialResponse = async (response: { credential: string }) => {
  console.log('Google credential response:', response)
  
  if (!response?.credential) {
    errorMessage.value = 'Không nhận được thông tin đăng nhập từ Google!'
    console.error(errorMessage.value)
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch(`${API_BASE_URL}/order/sign-in/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: response.credential,
        isAdmin: false
      }),
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    
    if (data.token) {
      localStorage.setItem('auth_token', data.token)
      router.push('/order/products')
    } else {
      throw new Error('Không nhận được token từ máy chủ!')
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Đăng nhập thất bại!'
    errorMessage.value = message
    console.error('Đăng nhập thất bại:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const waitForGoogle = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        use_fedcm_for_prompt: true
      })
    } else {
      setTimeout(waitForGoogle, 100)
    }
  }
  waitForGoogle()
})

const loginWithGoogle = () => {
  console.log('Click login with Google')
  
  if (isLoading.value) return
  
  if (window.google?.accounts?.id) {
    errorMessage.value = ''
    window.google.accounts.id.prompt()
  } else {
    errorMessage.value = 'Google API chưa sẵn sàng'
    console.error(errorMessage.value)
  }
}
</script>

<template>
  <div class="login-container">
    <div 
      @click="loginWithGoogle" 
      @keydown.enter="loginWithGoogle"
      @keydown.space="loginWithGoogle"
      class="google-login-btn" 
      :class="{ 'loading': isLoading, 'disabled': isLoading }"
      role="button" 
      tabindex="0"
      :aria-disabled="isLoading"
    >
      <div v-if="isLoading" class="spinner"></div>
      <img
        v-else
        src="https://developers.google.com/identity/images/g-logo.png"
        width="18"
        class="me-2"
        alt="Google logo"
      />
      <span>{{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập bằng Google' }}</span>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.google-login-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 35px;
  color: #020817;
  padding: 0 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s;
  min-height: 40px;
  position: relative;
}

.google-login-btn:hover:not(.disabled) {
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.google-login-btn:focus {
  outline: 2px solid #4c9ffe;
}

.google-login-btn.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.google-login-btn.loading {
  pointer-events: none;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #4c9ffe;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  text-align: center;
  padding: 8px 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  max-width: 300px;
}

.me-2 {
  margin-right: 8px;
}
</style>