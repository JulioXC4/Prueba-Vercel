<template>
  <pv-dialog
      :header="isEdit ? 'Editar Insumo' : 'Crear Insumo'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      modal
      class="w-4"
  >
    <template #header>
      <div class="p-2">
        <h2 class="text-xl font-semibold">
          {{ isEdit ? 'Editar Insumo' : 'Crear Insumo' }}
        </h2>
        <p class="text-sm font-light text-gray-500">
          {{ isEdit ? 'Modifica la información del insumo.' : 'Completa los detalles del nuevo insumo para añadirlo a tu lista.' }}
        </p>
      </div>
    </template>
    <div class="p-2">
      <!-- Nombre del insumo -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nombre de insumo</label>
        <pv-input-text id="name" v-model="form.name" placeholder="Ej: Tomate, Harina, Aceite..." class="w-full mb-3" />
      </div>

      <!-- Categoría -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
        <pv-dropdown
            id="category"
            :options="categories"
            v-model="form.category"
            placeholder="Seleccionar categoría"
            class="w-full  mb-3"
        />
      </div>

      <!-- Unidad -->
      <div>
        <label for="unit" class="block text-sm font-medium text-gray-700 mb-2">Unidad de medida</label>
        <pv-dropdown
            id="unit"
            :options="units"
            v-model="form.unit"
            placeholder="Seleccionar unidad"
            class="w-full  mb-3"
        />
      </div>

      <!-- Descripción -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Descripción (opcional)</label>
        <pv-input-text
            id="description"
            v-model="form.description"
            placeholder="Detalles adicionales del insumo..."
            class="w-full  mb-3"
        />
      </div>

      <!-- Perecible -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">¿Perecible?</label>
        <div class="flex flex-column gap-4 mb-3">
          <div class="flex items-center gap-2">
            <input
                type="radio"
                id="nonPerishable"
                value="No"
                v-model="form.perishable"
                class="accent-green-600"
            />
            <label for="nonPerishable" class="text-sm">No es perecible</label>
          </div>
          <div class="flex items-center gap-2">
            <input
                type="radio"
                id="perishable"
                value="Sí"
                v-model="form.perishable"
                class="accent-green-600"
            />
            <label for="perishable" class="text-sm">Sí es perecible</label>
          </div>
        </div>
      </div>

      <!-- Mínimo de stock -->
      <div v-if="props.role === 'admin'">
        <label for="min" class="block text-sm font-medium text-gray-700 mb-2">Mínimo de stock</label>
        <pv-input-number
            id="min"
            v-model="form.min"
            :min="0"
            placeholder="Ej: 10"
            class="w-full  mb-3"
        />
      </div>

      <!-- Máximo de stock -->
      <div v-if="props.role === 'admin'">
        <label for="max" class="block text-sm font-medium text-gray-700 mb-2">Máximo de stock</label>
        <pv-input-number
            id="max"
            v-model="form.max"
            :min="0"
            placeholder="Ej: 100"
            class="w-full  mb-3"
        />
      </div>

      <div v-if="props.role !== 'admin'">
        <label for="unitPrice" class="block text-sm font-medium text-gray-700 mb-2">Precio unitario ($)</label>
        <pv-input-number
            id="unitPrice"
            v-model="form.unitPrice"
            mode="currency"
            currency="USD"
            locale="en-US"
            :min="0"
            :step="0.01"
            placeholder="Ej: 3.50"
            class="w-full mb-3"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-content-around pt-4">
        <pv-button
            :label="isEdit ? 'EDITAR' : 'CREAR'"
            :icon="isEdit ? 'pi pi-pen-to-square' : 'pi pi-save'"
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
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  isEdit: Boolean,
  role: {
    type: String,
    default: 'admin'
  },
  supplyToEdit: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      category: null,
      unit: null,
      perishable: 'No',
      min: 0,
      max: 0
    })
  },
  categories: Array,
  units: Array
});

const emit = defineEmits(['update:visible', 'create', 'update', 'cancel']);

const form = ref({
  name: '',
  description: '',
  category: null,
  unit: null,
  perishable: 'No',
  min: 0,
  max: 0
});

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    category: null,
    unit: null,
    perishable: 'No',
    min: 0,
    max: 0,
    unitPrice: null
  };
};

watch(
    () => props.supplyToEdit,
    (newVal) => {
      if (props.isEdit && newVal) {
        form.value = {
          name: newVal.name || '',
          description: newVal.description || '',
          category: newVal.category || null,
          unit: newVal.unit || null,
          perishable: newVal.perishable || 'No',
          min: props.role === 'admin' ? newVal.min || 0 : 0,
          max: props.role === 'admin' ? newVal.max || 0 : 0,
          unitPrice: props.role !== 'admin' ? newVal.unitPrice || 0 : null
        };
      } else {
        resetForm();
      }
    },
    { immediate: true }
);

const submit = () => {
  const commonData = {
    name: form.value.name,
    description: form.value.description,
    category: form.value.category,
    unit: form.value.unit,
    perishable: form.value.perishable
  };
  let payload = {};

  if (props.role === 'admin') {
    payload = {
      ...commonData,
      min: form.value.min,
      max: form.value.max
    };
  } else {
    payload = {
      ...commonData,
      unitPrice: form.value.unitPrice
    };
  }

  props.isEdit ? emit('update', payload) : emit('create', payload);
  resetForm();
  emit('update:visible', false);
};

const cancel = () => {
  resetForm();
  emit('cancel');
  emit('update:visible', false);
};
</script>
