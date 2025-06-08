<template>
  <div class="order-sticky-rice container">
    <div class="order-sticky-rice__infor-customer">
      <!-- Thông tin người nhận -->
      <h5>THÔNG TIN NGƯỜI NHẬN</h5>

      <div class="mb-3 container-box">
        <div class="box">
          <i class="fa-solid fa-phone icon-black"></i>
          <input type="text" v-model="phone" placeholder="Số điện thoại của người nhận" class="infor-customer__phone" />
        </div>
        <div class="box">
          <i class="fa-regular fa-user icon-black"></i>
          <input type="text" v-model="name" placeholder="Tên người nhận" class="infor-customer__username" />
        </div>
      </div>

      <div class="mb-3">
        <div class="box-fluid">
          <i class="fa-solid fa-location-dot icon-black"></i>
          <input type="text" v-model="address" placeholder="Địa chỉ giao hàng" class="infor-customer__address" />
        </div>
      </div>

      <div class="mb-3">
        <div class="box-fluid">
          <i class="fa-regular fa-pen-to-square icon-black"></i>
          <textarea v-model="note" placeholder="Ghi chú đơn hàng (nếu có)" class="infor-customer__note"></textarea>
        </div>
      </div>

    </div>

    <div class="order-sticky-rice__cart">
      <div class="d-flex justify-content-between cart__header">
        <h5>
            Giỏ hàng
        </h5>
        <button class="btn btn-primary">
            Thêm món
        </button>
      </div>

      <div class="cart__items scroll-container">
        <!-- item1 -->
        <div class="row items_item">
            <div class="col-3">
                <img class="items__item--image" src="https://image.foodbook.vn/images/20240803/1722665750068-xoi_thit_kho_cha_mo_trung_kho-2.jpg?width=160" alt="">
            </div>
            <div class="col-9">
                <div class="row">
                    <p class="items__item--name col-10">
                        Xôi chả mỡ, chà bông
                    </p>
                    <i class="fa-regular fa-trash-can col-2"></i>
                </div>
                <div class="row">
                  <div class="col-8">
                    <i class="fa-regular fa-square-plus"></i>
                    <b class="">1</b>
                    <i class="fa-regular fa-square-minus"></i>
                  </div>
                  <div class="col-4">
                    <p class="items__item--price">20.000đ</p>
                  </div>
                </div>
            </div>
        </div>

        <!-- item2 -->
        <div class="row items_item">
            <div class="col-3">
                <img class="items__item--image" src="https://image.foodbook.vn/images/20240803/1722665750068-xoi_thit_kho_cha_mo_trung_kho-2.jpg?width=160" alt="">
            </div>
            <div class="col-9">
                <div class="row">
                    <p class="items__item--name col-10">
                        Xôi chả mỡ, chà bông
                    </p>
                    <i class="fa-regular fa-trash-can col-2"></i>
                </div>
                <div class="row">
                  <div class="col-8">
                    <i class="fa-regular fa-square-plus"></i>
                    <b class="">1</b>
                    <i class="fa-regular fa-square-minus"></i>
                  </div>
                  <div class="col-4">
                    <p class="items__item--price">20.000đ</p>
                  </div>
                </div>
            </div>
        </div>

        <!-- item3 -->
        <div class="row items_item">
            <div class="col-3">
                <img class="items__item--image" src="https://image.foodbook.vn/images/20240803/1722665750068-xoi_thit_kho_cha_mo_trung_kho-2.jpg?width=160" alt="">
            </div>
            <div class="col-9">
                <div class="row">
                    <p class="items__item--name col-10">
                        Xôi chả mỡ, chà bông
                    </p>
                    <i class="fa-regular fa-trash-can col-2"></i>
                </div>
                <div class="row">
                  <div class="col-8">
                    <i class="fa-regular fa-square-plus"></i>
                    <b class="">1</b>
                    <i class="fa-regular fa-square-minus"></i>
                  </div>
                  <div class="col-4">
                    <p class="items__item--price">20.000đ</p>
                  </div>
                </div>
            </div>
        </div>

        <!-- item4 -->
        <div class="row items_item">
            <div class="col-3">
                <img class="items__item--image" src="https://image.foodbook.vn/images/20240803/1722665750068-xoi_thit_kho_cha_mo_trung_kho-2.jpg?width=160" alt="">
            </div>
            <div class="col-9">
                <div class="row">
                    <p class="items__item--name col-10">
                        Xôi chả mỡ, chà bông
                    </p>
                    <i class="fa-regular fa-trash-can col-2"></i>
                </div>
                <div class="row">
                  <div class="col-8">
                    <i class="fa-regular fa-square-plus"></i>
                    <b class="">1</b>
                    <i class="fa-regular fa-square-minus"></i>
                  </div>
                  <div class="col-4">
                    <p class="items__item--price">20.000đ</p>
                  </div>
                </div>
            </div>
        </div>

        <!-- item5 -->
        <div class="row items_item">
            <div class="col-3">
                <img class="items__item--image" src="https://image.foodbook.vn/images/20240803/1722665750068-xoi_thit_kho_cha_mo_trung_kho-2.jpg?width=160" alt="">
            </div>
            <div class="col-9">
                <div class="row">
                    <p class="items__item--name col-10">
                        Xôi chả mỡ, chà bông
                    </p>
                    <i class="fa-regular fa-trash-can col-2"></i>
                </div>
                <div class="row">
                  <div class="col-8">
                    <i class="fa-regular fa-square-plus"></i>
                    <b class="">1</b>
                    <i class="fa-regular fa-square-minus"></i>
                  </div>
                  <div class="col-4">
                    <p class="items__item--price">20.000đ</p>
                  </div>
                </div>
            </div>
        </div>
      
      

      </div>

      <div class="d-flex justify-content-between cart__footer mt-3">
        <div>
          <b>
            Tổng
          </b>
          <span class="cart--total-items bg-info text-white">
            2 món
          </span>
        </div>
        <b class="">
          110.000đ
        </b>
      </div>

      <button class="btn btn-danger btn-order w-100 mt-4">
        Đặt Hàng
      </button>
    </div>
    
    <div class="order-sticky-rice__payment-method">
      <h5>Phương thức thanh toán</h5>
      <p>(Thông tin phương thức thanh toán sẽ hiển thị tại đây)</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
.order-sticky-rice {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "infor-customer infor-customer cart"
    "payment-method payment-method cart"
    "paragraph paragraph cart";
  gap: 1rem;
}

.infor-customer__phone,
.infor-customer__username,
.infor-customer__address,
.infor-customer__note {
  border: none;
  outline: none;
  background: transparent;
  width: 19.5rem;
  margin-left: 0.5rem;
}




.infor-customer__address,
.infor-customer__note {
  width: 94%;
}

.container-box {
  display: flex;
  justify-content: space-between;
}

.box,
.box-fluid {
  border: #e2e8f0 solid 0.6px;
  border-radius: 6px;
  padding: 0.4rem 0rem 0.4rem 0.3rem;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  align-items: center;
}

.box {
  width: 21.5rem;
}

.order-sticky-rice__infor-customer {
  grid-area: infor-customer;
  border: #e2e8f0 solid 0.6px;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
}

.order-sticky-rice__cart {
  grid-area: cart;
  border: #e2e8f0 solid 0.6px;
  border-radius: 0.4rem;
  padding: 1rem;
}

.order-sticky-rice__payment-method {
  grid-area: payment-method;
}

.btn-submit {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.icon-black {
  color: #020817;
}

.cart__header {
  border-bottom: #e2e8f0 solid 0.6px;
  padding-bottom: 0.5rem;
}


.box > i {
  width: 0.9rem;
}

.box-fluid > i {
  width: 0.9rem;
}





@media screen and (max-width: 768px) {
  .order-sticky-rice {
    grid-template-columns: 1fr;
    grid-template-areas:
      "infor-customer"
      "cart"
      "payment-method";
  }

  .container-box {
    display: block;
  }

  .box {
    width: 100%;
    margin-bottom: 0.9rem;
  }

  .infor-customer__phone,
  .infor-customer__username {
    width: 93%;
  }
}

.items__item--image{
    width: 4.5rem;
    border-radius: 6px;
}

.fa-square-plus{
    cursor:pointer;
    margin-right: 1rem;
}
.fa-square-minus{
    cursor:pointer;
    margin-left: 1rem;
}

.scroll-container {
    max-height: 25rem; /* Giới hạn chiều cao */
    overflow-y: auto;
    padding: 10px;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.cart__items > .items_item{
  border-bottom: #e2e8f0 solid 0.6px;
  padding: 0.5rem 0;
}

.cart--total-items{
  padding: 0.3rem 0.3rem;
  border-radius: 0.4rem;
  font-weight: 600;
}

.items__item--price{
  color: #32CD32;
  font-weight: 600;
}

.btn-order {
  cursor: pointer;
  font-weight: 600;
}
</style>
