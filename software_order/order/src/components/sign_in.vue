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
  <div @click="loginWithGoogle" class="google-login-btn" role="button" tabindex="0">
    <img
      src="https://developers.google.com/identity/images/g-logo.png"
      width="18"
      class="me-2"
      alt="Google logo"
    />
    <span>Đăng nhập bằng Google</span>
  </div>
</template>

<style scoped>
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
}

.google-login-btn:hover {
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.google-login-btn:focus {
  outline: 2px solid #4c9ffe;
}
</style>