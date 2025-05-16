<script>
import {defineComponent} from 'vue'
import RestaurantPendingOrdersWidget from "../components/restaurant-pending-orders-widget.component.vue";
import RestaurantLastSuppliesWidget from "../components/restaurant-last-supplies-widget.component.vue";
import RestaurantAlertsWidget from "../components/restaurant-alerts-widget.component.vue";

export default defineComponent({
  name: "restaurant-summary-overview",
  components: {RestaurantAlertsWidget, RestaurantLastSuppliesWidget, RestaurantPendingOrdersWidget}
})
</script>

<template>
  <div class="restaurant-summary-overview">
    <div class="summary-row summary-row-1">
      <restaurant-pending-orders-widget class="widget widget-pending"/>
      <restaurant-alerts-widget class="widget widget-alerts"/>
    </div>
    <div class="summary-row summary-row-2">
      <restaurant-last-supplies-widget class="widget widget-supplies"/>
    </div>
  </div>
</template>

<style scoped>
.restaurant-summary-overview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.summary-row-1 {
  display: flex;
  gap: 1.5rem;
}

.summary-row-2 {
  display: flex;
}

.widget-pending {
  flex: 2;/* 66% aprox */
}

.widget-alerts {
  flex: 1; /* 33% aprox */
}

.widget-supplies {
  width: 100%;
  max-width: 1400px;
}

@media (max-width: 1190px) {
  .summary-row-1 {
    flex-direction: column;
  }

  .widget-pending,
  .widget-alerts,
  .widget-supplies {
    width: 100% !important;

  }

  .summary-row-2 {
    flex-direction: column;
  }
}
</style>