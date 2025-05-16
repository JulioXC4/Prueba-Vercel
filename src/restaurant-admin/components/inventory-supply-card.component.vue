<template>
  <div class="border-1 surface-border border-round p-3 m-2 text-center bg-green-100" >
    <h4>{{ supply.name }}</h4>
    <p><strong>{{ supply.category }}</strong> - {{ supply.unit }}</p>
    <p class="text-sm">{{ supply.description }}</p>


    <pv-button
        icon="pi pi-pen-to-square"
        label="EDITAR"
        size="small"
        class="green-button"
        @click="$emit('edit', supply)"
    />
  </div>
</template>

<script>
export default {
  name: 'InventorySupplyCard',
  props: {
    supply: {
      type: Object,
      required: true
    }
  }
};
</script>
