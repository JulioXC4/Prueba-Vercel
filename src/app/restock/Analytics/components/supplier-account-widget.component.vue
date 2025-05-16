<script> export default {
  name: 'SupplierAccountWidget', data() {
    return {weeklyEarnings: 1875.50, purchasedSupplies: 42, isMobile: false};
  }, mounted() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport);
  }, beforeUnmount() {
    window.removeEventListener('resize', this.checkViewport);
  }, methods: {
    checkViewport() {
      this.isMobile = window.innerWidth <= 800;
    }
  }
} </script>
<template>
  <div>
    <div v-if="isMobile" class="mobile-header mb-3"><h3 class="text-lg font-semibold">Account</h3></div>
    <div class="account-widget">
      <div v-if="!isMobile" class="mb-3"><h3 class="text-lg font-semibold">Account</h3></div>
      <div class="content">
        <div class="account-section"><h4 class="text-green-700 font-light m-0">Weekly Earnings</h4>
          <div class="amount-row align-items-center justify-content-center"><p class="amount">S/. {{
              weeklyEarnings
            }}</p> <i class="pi pi-arrow-up trend-icon pl-2"/></div>
        </div>
        <div class="account-section"><h4 class="text-green-700 font-light m-0">Purchased Supplies</h4>
          <div class="amount-row align-items-center justify-content-center"><p class="amount">{{
              purchasedSupplies
            }}</p> <i class="pi pi-arrow-up trend-icon pl-2"/></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped> .account-widget {
  background: #fff;
  padding: 10px 30px 30px 30px;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}

.content {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.account-section h4 {
  color: #4F8A5B;
  font-weight: lighter;
  margin-top: 0;
}

.amount-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  color: #4F8A5B;
  margin: 0;
}

.trend-icon {
  color: #4F8A5B;
  font-size: 28px;
}

@media (max-width: 800px) {
  .account-widget {
    padding: 16px;
    min-height: 100px;
    align-content: center;
  }

  .mobile-header h3 {
    font-family: Poppins, sans-serif;
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 10px;
  }
} </style>