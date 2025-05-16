<template>
  <pv-dialog
      :header="isEdit ? 'Editar Registro de Insumo' : 'Agregar Insumo al Inventario'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      modal
      class="w-4"
  >
    <template #header>
      <div class="p-2">
        <h2 class="text-xl font-semibold">
          {{ isEdit ? 'Editar Registro de Insumo' : 'Agregar Insumo al Inventario' }}
        </h2>
        <p class="text-sm font-light text-gray-500">
          {{ isEdit
            ? 'Modifica la información del registro de inventario.'
            : 'Completa los detalles para agregar el insumo al inventario.' }}
        </p>
      </div>
    </template>

    <div class="p-2">
      <!-- Insumo -->
      <div>
        <label for="supply" class="block text-sm font-medium text-gray-700 mb-2">Insumo</label>
        <template v-if="!isEdit">
          <pv-dropdown
              id="supply"
              :options="supplies"
              optionLabel="name"
              v-model="form.supply"
              placeholder="Seleccionar insumo"
              class="w-full mb-3"
          />
        </template>
        <template v-else>
          <pv-input-text
              :value="form.supply?.name"
              disabled
              class="w-full mb-3"
          />
        </template>
      </div>

      <!-- Cantidad -->
      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
        <pv-input-number
            id="stock"
            v-model="form.stock"
            :min="0"
            mode="decimal"
            class="w-full mb-3"
            placeholder="Ej: 50"
        />
      </div>

      <!-- Proveedor solo visible para admin -->
      <div v-if="role === 'admin'">
        <label for="provider" class="block text-sm font-medium text-gray-700 mb-2">Proveedor (opcional)</label>
        <pv-dropdown
            id="provider"
            :options="providers"
            v-model="form.provider"
            placeholder="Seleccionar proveedor"
            class="w-full mb-3"
        />
      </div>

      <!-- Fecha de expiración -->
      <div v-if="form.perishable">
        <label for="expiry" class="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
        <pv-calendar
            id="expiry"
            v-model="form.expiry"
            showIcon
            class="w-full mb-3"
            placeholder="Seleccionar fecha"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-content-around pt-4">
        <pv-button
            :label="isEdit ? 'GUARDAR' : 'AÑADIR'"
            :icon="isEdit ? 'pi pi-pen-to-square' : 'pi pi-plus-circle'"
            class="green-button"
            @click="submit"
        />
        <pv-button
            label="CANCELAR"
            icon="pi pi-times-circle"
            severity="danger"
            class="red-button"
            @click="cancel"
        />
      </div>
    </div>
  </pv-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const props = defineProps({
  visible: Boolean,
  isEdit: Boolean,
  role: {
    type: String,
    default: 'admin'
  },
  isPerishable: Boolean,
  supplies: Array,
  providers: Array,
  itemToEdit: {
    type: Object,
    default: () => ({
      supply: null,
      stock: 0,
      provider: null,
      expiry: null
    })
  }
});

const emit = defineEmits(['update:visible', 'create', 'update', 'cancel']);

const form = ref({
  supply: null,
  stock: 0,
  provider: null,
  expiry: null,
  perishable: false
});

watch(() => form.value.supply, (selectedSupply) => {
  form.value.perishable = selectedSupply?.perishable === 'Sí';
});

const resetForm = () => {
  form.value = {
    supply: null,
    stock: 0,
    provider: null,
    expiry: null,
    perishable: false
  };
};

watch(
    () => props.itemToEdit,
    (newVal) => {
      if (props.isEdit && newVal) {
        form.value = { ...newVal };
      } else {
        resetForm();
      }
    },
    { immediate: true }
);

const submit = () => {
  if (!form.value.supply) {
    alert('Por favor, seleccione un insumo');
    return;
  }

  const expiryStr = formatDate(form.value.expiry);

  const newItem = {
    name: form.value.supply.name,
    category: form.value.supply.category,
    unit: form.value.supply.unit,
    stock: form.value.stock,
    min: form.value.supply.min,
    max: form.value.supply.max,
    perishable: form.value.supply.perishable,
    expiry: form.value.perishable ? expiryStr : null
  };

  props.isEdit ? emit('update', newItem) : emit('create', newItem);

  resetForm();
  emit('update:visible', false);
};

const cancel = () => {
  resetForm();
  emit('cancel');
  emit('update:visible', false);
};
</script>
