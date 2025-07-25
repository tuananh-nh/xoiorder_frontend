<template>
  <div class="offcanvas offcanvas-end search-offcanvas" id="offcanvasMenu" tabindex="-1">
    <div class="offcanvas-header">
      <div class="header-content">
        <h5 class="offcanvas-title">
          <i class="bi bi-search me-2"></i>
          Tra cứu đơn hàng
        </h5>
      </div>
      <button 
        type="button" 
        class="btn-close-custom" 
        data-bs-dismiss="offcanvas"
        aria-label="Đóng tra cứu"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="offcanvas-body">
      <div class="search-container">
        <!-- Search Form -->
        <form @submit.prevent="handleSearch" class="search-form">
          <div class="search-input-group">
            <div class="input-wrapper">
              <i class="bi bi-search input-icon"></i>
              <input 
                type="text" 
                class="search-input"
                v-model="searchQuery"
                placeholder="Nhập số điện thoại hoặc mã đơn hàng"
                :disabled="isLoading"
                ref="searchInputRef"
              />
              <button 
                v-if="searchQuery"
                type="button"
                class="clear-btn"
                @click="clearSearch"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
            
            <button 
              type="submit" 
              class="search-btn"
              :disabled="!searchQuery.trim() || isLoading"
            >
              <span v-if="!isLoading">
                <i class="bi bi-search me-2"></i>
                Tìm kiếm
              </span>
              <span v-else>
                <i class="bi bi-arrow-repeat spin me-2"></i>
                Đang tìm...
              </span>
            </button>
          </div>
          
          <!-- Search Tips -->
          <div class="search-tips">
            <div class="tip-item">
              <i class="bi bi-telephone"></i>
              <span>Số điện thoại: 0987654321</span>
            </div>
            <div class="tip-item">
              <i class="bi bi-hash"></i>
              <span>Mã đơn hàng: DH001234</span>
            </div>
          </div>
        </form>

        <!-- Search Results -->
        <div class="search-results" v-if="searchResults.length > 0 || hasSearched">
          <div class="results-header">
            <h6>Kết quả tìm kiếm</h6>
            <span class="results-count">{{ searchResults.length }} đơn hàng</span>
          </div>
          
          <div v-if="searchResults.length === 0" class="no-results">
            <div class="no-results-icon">
              <i class="bi bi-search"></i>
            </div>
            <p class="no-results-text">Không tìm thấy đơn hàng nào</p>
            <small class="no-results-hint">Vui lòng kiểm tra lại thông tin tìm kiếm</small>
          </div>
          
          <div v-else class="results-list">
            <transition-group name="result-item" tag="div">
              <div 
                v-for="order in searchResults" 
                :key="order.id"
                class="result-item"
                @click="viewOrderDetail(order)"
              >
                <div class="order-header">
                  <div class="order-code">{{ order.code }}</div>
                  <div class="order-status" :class="`status-${order.status}`">
                    {{ getStatusText(order.status) }}
                  </div>
                </div>
                
                <div class="order-info">
                  <div class="info-row">
                    <i class="bi bi-calendar3"></i>
                    <span>{{ formatDate(order.createdAt) }}</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-currency-dollar"></i>
                    <span>{{ formatPrice(order.total) }}</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-box-seam"></i>
                    <span>{{ order.itemCount }} món</span>
                  </div>
                </div>
                
                <div class="order-actions">
                  <i class="bi bi-chevron-right"></i>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!hasSearched && searchResults.length === 0" class="empty-state">
          <div class="empty-state-content">
            <div class="empty-state-icon">
              <i class="bi bi-file-earmark-text"></i>
            </div>
            <h6 class="empty-state-title">Tra cứu đơn hàng</h6>
            <p class="empty-state-text">
              Nhập số điện thoại hoặc mã đơn hàng để kiểm tra tình trạng đơn hàng của bạn
            </p>
            
            <!-- Quick Actions -->
            <div class="quick-actions">
              <button class="quick-action-btn" @click="fillSamplePhone">
                <i class="bi bi-telephone"></i>
                <span>Dùng SĐT mẫu</span>
              </button>
              <button class="quick-action-btn" @click="fillSampleOrder">
                <i class="bi bi-hash"></i>
                <span>Dùng mã mẫu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

// Props & Emits
const emit = defineEmits(['order-selected'])

// Local state
const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const hasSearched = ref(false)
const searchInputRef = ref(null)

// Mock data for demonstration
const mockOrders = [
  {
    id: 1,
    code: 'DH001234',
    status: 'completed',
    createdAt: new Date('2024-01-15'),
    total: 150000,
    itemCount: 3,
    phone: '0987654321'
  },
  {
    id: 2,
    code: 'DH001235',
    status: 'pending',
    createdAt: new Date('2024-01-16'),
    total: 89000,
    itemCount: 2,
    phone: '0987654321'
  }
]

// Methods
const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  isLoading.value = true
  hasSearched.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock search logic
    const query = searchQuery.value.toLowerCase().trim()
    searchResults.value = mockOrders.filter(order => 
      order.code.toLowerCase().includes(query) ||
      order.phone.includes(query)
    )
    
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  hasSearched.value = false
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const viewOrderDetail = (order) => {
  emit('order-selected', order)
  // Close offcanvas programmatically if needed
}

const fillSamplePhone = () => {
  searchQuery.value = '0987654321'
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const fillSampleOrder = () => {
  searchQuery.value = 'DH001234'
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Đang xử lý',
    confirmed: 'Đã xác nhận',
    preparing: 'Đang chuẩn bị',
    ready: 'Sẵn sàng',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  }
  return statusMap[status] || 'Không xác định'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const formatPrice = (price) => {
  return price?.toLocaleString('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }) || '0₫'
}

// Auto-focus when offcanvas opens
onMounted(() => {
  const offcanvasElement = document.getElementById('offcanvasMenu')
  if (offcanvasElement) {
    offcanvasElement.addEventListener('shown.bs.offcanvas', () => {
      nextTick(() => {
        searchInputRef.value?.focus()
      })
    })
  }
})
</script>

<style scoped>
.search-offcanvas {
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
}

.offcanvas-title {
  font-weight: 700;
  color: #212529;
  margin: 0;
  font-size: 1.25rem;
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

.search-container {
  padding: 1.5rem;
  height: 100%;
}

.search-form {
  margin-bottom: 2rem;
}

.search-input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #6c757d;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.search-input:disabled {
  background: #f8f9fa;
  color: #6c757d;
}

.clear-btn {
  position: absolute;
  right: 1rem;
  width: 24px;
  height: 24px;
  border: none;
  background: #6c757d;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.clear-btn:hover {
  background: #495057;
  transform: scale(1.1);
}

.search-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0056b3, #004085);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.search-tips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.tip-item i {
  color: #007bff;
  width: 16px;
}

/* Search Results */
.search-results {
  margin-top: 1rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.results-header h6 {
  margin: 0;
  font-weight: 600;
  color: #212529;
}

.results-count {
  background: #007bff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.no-results {
  text-align: center;
  padding: 2rem 1rem;
}

.no-results-icon {
  font-size: 3rem;
  color: #dee2e6;
  margin-bottom: 1rem;
}

.no-results-text {
  color: #495057;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.no-results-hint {
  color: #6c757d;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-item {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  cursor: pointer;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-code {
  font-weight: 700;
  color: #212529;
  font-size: 1.1rem;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-confirmed {
  background: #d4edda;
  color: #155724;
}

.status-preparing {
  background: #cce7ff;
  color: #004085;
}

.status-ready {
  background: #d1ecf1;
  color: #0c5460;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}

.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #495057;
}

.info-row i {
  color: #007bff;
  width: 16px;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  color: #007bff;
}

/* Empty State */
.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state-content {
  text-align: center;
  max-width: 300px;
}

.empty-state-icon {
  font-size: 4rem;
  color: #dee2e6;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.empty-state-title {
  color: #495057;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.empty-state-text {
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
  color: #495057;
  min-width: 100px;
}

.quick-action-btn:hover {
  border-color: #007bff;
  background: #f8fbff;
  color: #007bff;
  transform: translateY(-2px);
}

.quick-action-btn i {
  font-size: 1.5rem;
}

.quick-action-btn span {
  font-size: 0.8rem;
  font-weight: 500;
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

.result-item-enter-active {
  animation: slideInUp 0.4s ease;
}

.result-item-leave-active {
  animation: slideOutDown 0.3s ease;
}

.result-item-move {
  transition: transform 0.3s ease;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOutDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
}

/* Responsive */
@media (max-width: 576px) {
  .search-offcanvas {
    max-width: 100vw;
  }
  
  .search-container {
    padding: 1rem;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .quick-action-btn {
    min-width: auto;
  }
}
</style>