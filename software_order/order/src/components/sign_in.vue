<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const handleCredentialResponse = async (response: { credential: string }) => {
  console.log('Google credential response:', response)
  if (!response?.credential) {
    console.error('Không nhận được thông tin đăng nhập từ Google!')
    return
  }
  try {
    const res = await fetch('http://localhost:8080/order/sign-in/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: response.credential,
        isAdmin: false
      }),
      credentials: 'include'
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('auth_token', data.token)
      router.push('/order/products')
    } else {
      throw new Error('Không nhận được token từ máy chủ!')
    }
  } catch (err) {
    console.error('Đăng nhập thất bại:', err)
  }
}

onMounted(() => {
  const waitForGoogle = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: '121168738374-670plotppkmnhvulve2gqn2tugf4huk2.apps.googleusercontent.com',
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
  if (window.google?.accounts?.id) {
    window.google.accounts.id.prompt()
  } else {
    console.error('Google API chưa sẵn sàng')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Đăng nhập</h2>
      <p class="login-subtitle">Chào mừng bạn quay trở lại!</p>
      
      <div @click="loginWithGoogle" class="google-login-btn" role="button" tabindex="0">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          width="18"
          class="me-2"
          alt="Google logo"
        />
        <span>Đăng nhập bằng Google</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #718096;
  margin-bottom: 2rem;
  font-size: 1rem;
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
  width: 100%;
  margin: 1rem 0;
}

.google-login-btn:hover {
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.google-login-btn:focus {
  outline: 2px solid #4c9ffe;
  outline-offset: 2px;
}

.me-2 {
  margin-right: 0.5rem;
}
</style>