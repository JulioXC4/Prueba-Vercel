<script> export default {
  name: 'SupplierAlertsWidget', data() {
    return {
      alerts: [{
        restaurant: 'El carbonazo',
        status: 'Request',
        orderPlaced: '15 minutes ago'
      }, {restaurant: 'Cevicheria Beto’s', status: 'Request', orderPlaced: '1 hour ago'}, {
        restaurant: 'La Rueda',
        status: 'Request',
        orderPlaced: '3 hours ago'
      }],
      isMobile: false,
      displayedColumns: ['restaurant', 'status', 'orderPlaced', 'details'],
      mobileColumns: ['restaurant', 'status']
    };
  }, computed: {
    columnsToShow() {
      return this.isMobile ? this.mobileColumns : this.displayedColumns;
    }
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
}; </script>
<template>
  <div>
    <div v-if="isMobile" class="mobile-header mb-3"><h3 class="text-lg font-semibold">Last Alerts</h3></div>
    <div class="widget-container">
      <div v-if="!isMobile" class="mb-3"><h3 class="text-lg font-semibold">Last Alerts</h3></div>
      <div class="scroll-wrapper" :style="{ overflowY: alerts.length > 3 ? 'auto' : 'visible' }">
        <pv-data-table :value="alerts" responsiveLayout="scroll">
          <pv-column v-if="columnsToShow.includes('restaurant')" field="restaurant" header="Restaurant"
                     class="text-sm"/>
          <pv-column v-if="columnsToShow.includes('status')" field="status" header="Status">
            <template #body="slotProps">
              <pv-button :label="slotProps.data.status"
                         class="bg-green-700 text-white w-8rem text-sm font-normal border-round-sm h-2rem"/>
            </template>
          </pv-column>
          <pv-column v-if="columnsToShow.includes('orderPlaced')" field="orderPlaced" header="Order placed"
                     class="text-sm"/>
          <pv-column v-if="columnsToShow.includes('details')" header="Details">
            <template #body><i class="pi pi-book text-base"/></template>
          </pv-column>
        </pv-data-table>
      </div>
    </div>
  </div>
</template>
<style scoped> .widget-container {
  background: #fff;
  padding: 10px 30px 30px 30px;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}

.scroll-wrapper {
  max-height: 250px;
  overflow-y: auto;
}

@media (max-width: 800px) {
  .mobile-header h3 {
    font-family: Poppins, sans-serif;
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .widget-container {
    padding: 1em;
  }
} </style>