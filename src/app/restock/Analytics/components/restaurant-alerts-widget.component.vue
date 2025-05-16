<script> export default {
  name: "RestaurantAlertsWidget", data() {
    return {
      alerts: [{ingredient: 'Tomate', status: 'Low stock'}, {
        ingredient: 'Papa amarilla',
        status: 'Max stock'
      }, {ingredient: 'Cebolla roja', status: 'Low stock'}, {ingredient: 'Zanahoria', status: 'Max stock'}]
    };
  }, methods: {
    statusClass(status) {
      return status === 'Max stock' ? 'orange-button' : 'red-button';
    }
  }
};
</script>
<template>
  <div><h3 class="widget-title">Last Alerts</h3>
    <div class="widget-container">
      <div class="scroll-wrapper" :style="{ overflowY: alerts.length > 3 ? 'auto' : 'visible' }">
        <pv-data-table :value="alerts" responsiveLayout="scroll" class="alerts-table">
          <pv-column field="ingredient" header="Ingredient" class="bg-white text-sm text-gray-800"/>
          <pv-column header="Status" class="bg-white">
            <template #body="slotProps">
              <pv-button :label="slotProps.data.status" :class="statusClass(slotProps.data.status)" size="small"/>
            </template>
          </pv-column>
        </pv-data-table>
      </div>
    </div>
  </div>
</template>
<style>
.widget-title {
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-size: 23px;
  margin-bottom: 10px;
}

.widget-container {
  background: #fff;
  padding: 20px 30px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  max-height: 300px;
}

.scroll-wrapper {
  max-height: 260px;
  overflow-y: auto;
}

.red-button {
  background-color: #FFEAEA;
  color: #FF5252;
  font-size: 13px;
  font-weight: 400;
  border-radius: 4px;
  height: 25px;
  width: 100%;
}

.orange-button {
  background-color: #FFF1E0;
  color: #FB8C00;
  font-size: 13px;
  font-weight: 400;
  border-radius: 4px;
  height: 30px;
  width: 100%;
}

@media (max-width: 1190px) {
  .red-button, .orange-button {
    width: 75%;
  }
} </style>