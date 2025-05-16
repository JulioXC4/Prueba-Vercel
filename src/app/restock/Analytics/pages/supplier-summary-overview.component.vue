<script>
import {defineComponent} from "vue";
import SupplierAccountWidget from "../components/supplier-account-widget.component.vue";
import SupplierAlertsWidget from "../components/supplier-alerts-widget.component.vue";
import SupplierFrequentCustomersWidget from "../components/supplier-frequent-customers-widget.component.vue";
export default defineComponent({
  name: 'supplier-summary-overview',
  components: {SupplierAlertsWidget, SupplierAccountWidget, SupplierFrequentCustomersWidget}
})
</script>
<template>
  <div class="analytics-grid"> <!-- Fila 1: Alerts + Account -->
    <div class="row1">
      <div class="widget-alerts">
        <supplier-alerts-widget/>
      </div>
      <div class="widget-account">
        <supplier-account-widget/>
      </div>
    </div>
    <!-- Fila 2: Frequent customers -->
    <div class="row2">
      <div class="widget-frequent">
        <supplier-frequent-customers-widget/>
      </div>
    </div>
  </div>
</template>
<style> .analytics-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

/* Fila 1: dos widgets */
.row1 {
  display: flex;
  gap: 1rem;
}

/* Fila 2: centrado horizontal */
.row2 {
  display: flex;
  justify-content: center;
}

/* Widgets */
.widget-alerts {
  flex: 2;
}

.widget-account {
  flex: 1;
}

.widget-frequent {
  width: 100%;
}

@media (max-width: 1190px) {
  .row1 {
    flex-direction: column;
  }

  .row2 {
    flex-direction: column;
    align-items: center;
  }

  .widget-alerts, .widget-account, .widget-frequent {
    width: 100% !important;
  }
} </style>