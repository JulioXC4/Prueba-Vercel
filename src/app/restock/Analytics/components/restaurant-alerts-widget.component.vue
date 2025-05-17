<script setup> import {ref, onMounted} from 'vue'

const alerts = ref([
  {ingredient: 'Tomates', status: 'Low stock'},
  {ingredient: 'Lechuga', status: 'Max stock'},
  {ingredient: 'Cebolla', status: 'Low stock'},
  {ingredient: 'Papas', status: 'Low stock'},
])
const displayedColumns = ['ingredient', 'status'] </script>
<template>
  <div><h3 class="widget-title">Last alerts</h3>
    <div class="widget-container">
      <div class="scroll-wrapper">
        <pv-data-table :value="alerts" responsiveLayout="scroll" class="mat-elevation-z1">
          <pv-column field="ingredient" header="Supplies">
            <template #body="slotProps"><span class="ingredient">{{ slotProps.data.ingredient }}</span></template>
          </pv-column>
          <pv-column field="status" header="Status">
            <template #body="slotProps">
              <button
                  :class="{ 'low-stock': slotProps.data.status === 'Low stock', 'max-stock': slotProps.data.status === 'Max stock' }"
                  class="status-btn"> {{ slotProps.data.status }}
              </button>
            </template>
          </pv-column>
        </pv-data-table>
      </div>
    </div>
  </div>
</template>
<style scoped> .widget-title {
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-size: 23px;
  margin-bottom: 10px;
}

.widget-container {
  background: #fff;
  padding: 10px 30px;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  max-height: 300px;
}

.scroll-wrapper {
  max-height: 270px;
  overflow-y: auto;
}

.p-datatable thead th {
  font-weight: bold;
  font-size: 12px;
  color: #757575;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.p-datatable tbody td {
  color: #333;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.status-btn {
  font-size: 13px;
  font-weight: 400;
  border-radius: 4px;
  height: 30px;
  width: 100%;
  border: none;
}

.low-stock {
  background-color: #FFEAEA;
  color: #FF5252;
}

.max-stock {
  background-color: #FFF1E0;
  color: #FB8C00;
}

@media (max-width: 1190px) {
  .status-btn {
    width: 75%;
  }
}

@media (max-width: 600px) {
  .status-btn {
    width: 75%;
  }
} </style>