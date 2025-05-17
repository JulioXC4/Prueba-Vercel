<script>
import inventorySupplyCreateAndEdit from './inventory-supply-create-and-edit.component.vue';
import inventorySupplyAddAndEdit from './inventory-supply-add-and-edit.component.vue';
import InventorySupplyCard from './inventory-supply-card.component.vue';

export default {
  name: 'InventoryComponent',
  components: {
    inventorySupplyCreateAndEdit,
    inventorySupplyAddAndEdit,
    InventorySupplyCard
  },
  computed: {
    filteredInventory() {
      const currentInventory = this.role === 'admin' ? this.adminInventory : this.supplierInventory;
      console.log('Filtered Inventory:', currentInventory);
      if (!this.search.trim()) return currentInventory;
      const term = this.search.toLowerCase();
      return currentInventory.filter(item => item.name.toLowerCase().includes(term));
    },
    currentInventory: {
      get() {
        return this.role === 'admin' ? this.adminInventory : this.supplierInventory;
      },
      set(newVal) {
        if (this.role === 'admin') {
          this.adminInventory = newVal;
        } else {
          this.supplierInventory = newVal;
        }
      }
    }
  },
  data() {
    return {
      role: 'supplier',
      showSupplyModal: false,
      search: '',
      showInventoryModal: false,
      selectedInventoryItem: null,
      isEditing: false,
      supplyToEdit: null,
      itemToDelete: null,
      showDeleteModal: false,
      newSupply: {
        name: '',
        category: null,
        unit: null,
        description: ''
      },
      categories: ['Verduras', 'Carnes', 'Granos', 'Lácteos', 'Bebidas'],
      units: ['kg', 'l', 'unidades', 'g', 'ml'],
      supplies: [
        {
          name: 'Tomate',
          category: 'Verduras',
          unit: 'kg',
          description: 'Tomate fresco, orgánico, ideal para ensaladas y salsas.',
          min: 15,
          max: 50,
          perishable: 'Sí',
          unitPrice: 20.50
        },
        {
          name: 'Pollo',
          category: 'Carnes',
          unit: 'kg',
          description: 'Pechuga de pollo sin piel, rica en proteínas, lista para cocinar.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 12.50
        },
        {
          name: 'Leche',
          category: 'Lácteos',
          unit: 'l',
          description: 'Leche entera pasteurizada, ideal para consumo diario o recetas.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 7.50
        },
        {
          name: 'Papa',
          category: 'Verduras',
          unit: 'kg',
          description: 'Papa blanca andina, firme y versátil para todo tipo de platos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 7.50
        },
        {
          name: 'Carne molida',
          category: 'Carnes',
          unit: 'kg',
          description: 'Carne de res molida fresca, perfecta para hamburguesas y guisos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 10.50
        },
        {
          name: 'Agua mineral',
          category: 'Bebidas',
          unit: 'l',
          description: 'Agua mineral sin gas, purificada, embotellada en origen natural.',
          min: 10,
          max: 50,
          perishable: 'No',
          unitPrice: 20.50
        },
        {
          name: 'Yogurt',
          category: 'Lácteos',
          unit: 'l',
          description: 'Yogurt natural sin azúcar, con cultivos vivos, fuente de probióticos.',
          min: 10,
          max: 50,
          perishable: 'No',
          unitPrice: 15.50
        },
        {
          name: 'Zanahoria',
          category: 'Verduras',
          unit: 'kg',
          description: 'Zanahoria fresca, crocante y dulce, rica en betacarotenos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 12.50
        },
        {
          name: 'Lentejas',
          category: 'Granos',
          unit: 'kg',
          description: 'Lentejas secas seleccionadas, ideales para guisos y ensaladas.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 70.50
        },
        {
          name: 'Cebolla',
          category: 'Verduras',
          unit: 'kg',
          description: 'Cebolla roja fresca, de sabor intenso, ideal para sofritos y ensaladas.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          unitPrice: 18.50
        }
      ],
      adminInventory: [
        {
          name: 'Tomate',
          category: 'Verduras',
          unit: 'kg',
          description: 'Tomate fresco, orgánico, ideal para ensaladas y salsas.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-06-01',
          stock: 20
        },
        {
          name: 'Pollo',
          category: 'Carnes',
          unit: 'kg',
          description: 'Pechuga de pollo sin piel, rica en proteínas, lista para cocinar.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-05-10',
          stock: 15
        },
        {
          name: 'Leche',
          category: 'Lácteos',
          unit: 'l',
          description: 'Leche entera pasteurizada, ideal para consumo diario o recetas.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-05-18',
          stock: 25
        },
        {
          name: 'Papa',
          category: 'Verduras',
          unit: 'kg',
          description: 'Papa blanca andina, firme y versátil para todo tipo de platos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-06-10',
          stock: 30
        },
        {
          name: 'Carne molida',
          category: 'Carnes',
          unit: 'kg',
          description: 'Carne de res molida fresca, perfecta para hamburguesas y guisos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-05-19',
          stock: 10
        },
        {
          name: 'Agua mineral',
          category: 'Bebidas',
          unit: 'l',
          description: 'Agua mineral sin gas, purificada, embotellada en origen natural.',
          min: 10,
          max: 50,
          perishable: 'No',
          expiry: null,
          stock: 50
        },
        {
          name: 'Yogurt',
          category: 'Lácteos',
          unit: 'l',
          description: 'Yogurt natural sin azúcar, con cultivos vivos, fuente de probióticos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-05-18',
          stock: 18
        },
        {
          name: 'Zanahoria',
          category: 'Verduras',
          unit: 'kg',
          description: 'Zanahoria fresca, crocante y dulce, rica en betacarotenos.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-06-12',
          stock: 22
        },
        {
          name: 'Lentejas',
          category: 'Granos',
          unit: 'kg',
          description: 'Lentejas secas seleccionadas, ideales para guisos y ensaladas.',
          min: 10,
          max: 50,
          perishable: 'No',
          expiry: null,
          stock: 40
        },
        {
          name: 'Cebolla',
          category: 'Verduras',
          unit: 'kg',
          description: 'Cebolla roja fresca, de sabor intenso, ideal para sofritos y ensaladas.',
          min: 10,
          max: 50,
          perishable: 'Sí',
          expiry: '2025-06-05',
          stock: 35
        }
      ],
      supplierInventory: [
        {
          name: 'Tomate',
          category: 'Verduras',
          unit: 'kg',
          description: 'Tomate fresco, orgánico, ideal para ensaladas y salsas.',
          perishable: 'Sí',
          unitPrice: 2.50,
          stock: 500,
          expiry: '2025-06-01'
        },
        {
          name: 'Pollo',
          category: 'Carnes',
          unit: 'kg',
          description: 'Pechuga de pollo sin piel, rica en proteínas, lista para cocinar.',
          perishable: 'Sí',
          unitPrice: 5.75,
          stock: 300,
          expiry: '2025-05-10'
        },
        {
          name: 'Leche',
          category: 'Lácteos',
          unit: 'l',
          description: 'Leche entera pasteurizada, ideal para consumo diario o recetas.',
          perishable: 'Sí',
          unitPrice: 1.20,
          stock: 400,
          expiry: '2025-05-18'
        },
        {
          name: 'Papa',
          category: 'Verduras',
          unit: 'kg',
          description: 'Papa blanca andina, firme y versátil para todo tipo de platos.',
          perishable: 'Sí',
          unitPrice: 1.10,
          stock: 450,
          expiry: '2025-06-10'
        },
        {
          name: 'Carne molida',
          category: 'Carnes',
          unit: 'kg',
          description: 'Carne de res molida fresca, perfecta para hamburguesas y guisos.',
          perishable: 'Sí',
          unitPrice: 6.40,
          stock: 200,
          expiry: '2025-05-19'
        },
        {
          name: 'Agua mineral',
          category: 'Bebidas',
          unit: 'l',
          description: 'Agua mineral sin gas, purificada, embotellada en origen natural.',
          perishable: 'No',
          unitPrice: 0.90,
          stock: 1000,
          expiry: null
        },
        {
          name: 'Yogurt',
          category: 'Lácteos',
          unit: 'l',
          description: 'Yogurt natural sin azúcar, con cultivos vivos, fuente de probióticos.',
          perishable: 'Sí',
          unitPrice: 1.80,
          stock: 320,
          expiry: '2025-05-18'
        },
        {
          name: 'Zanahoria',
          category: 'Verduras',
          unit: 'kg',
          description: 'Zanahoria fresca, crocante y dulce, rica en betacarotenos.',
          perishable: 'Sí',
          unitPrice: 1.30,
          stock: 380,
          expiry: '2025-06-12'
        },
        {
          name: 'Lentejas',
          category: 'Granos',
          unit: 'kg',
          description: 'Lentejas secas seleccionadas, ideales para guisos y ensaladas.',
          perishable: 'No',
          unitPrice: 2.00,
          stock: 600,
          expiry: null
        },
        {
          name: 'Cebolla',
          category: 'Verduras',
          unit: 'kg',
          description: 'Cebolla roja fresca, de sabor intenso, ideal para sofritos y ensaladas.',
          perishable: 'Sí',
          unitPrice: 1.60,
          stock: 420,
          expiry: '2025-06-05'
        }
      ],
      providers: ['Proveedor A', 'Proveedor B', 'Proveedor C'],
    }
  },
  methods: {
    openCreateModal() {
      this.isEditing = false;
      this.supplyToEdit = null;
      this.showSupplyModal = true;
    },
    openEditModal(supply) {
      this.isEditing = true;
      this.supplyToEdit = {...supply};
      this.showSupplyModal = true;
    },
    openAddModal() {
      this.isEditing = false;
      this.selectedInventoryItem = null;
      this.showInventoryModal = true;
    },
    openInventoryEditModal(item) {
      const matchedSupply = this.supplies.find(s => s.name === item.name);

      this.selectedInventoryItem = {
        supply: matchedSupply || null,
        stock: item.stock,
        provider: item.provider || null,
        expiry: item.expiry || null
      };

      this.isEditing = true;
      this.showInventoryModal = true;
    },
    confirmDelete(item) {
      this.itemToDelete = item;
      this.showDeleteModal = true;
    },
    deleteInventoryItem() {
      this.currentInventory = this.currentInventory.filter(i =>
          !(
              i.name === this.itemToDelete.name &&
              i.stock === this.itemToDelete.stock &&
              i.expiry === this.itemToDelete.expiry
          )
      );
      this.showDeleteModal = false;
      this.itemToDelete = null;
    }
    ,
    createSupply(newItem) {
      this.supplies.push({...newItem});
      this.showSupplyModal = false;
    },
    updateSupply(updatedItem) {
      const index = this.supplies.findIndex(s => s.name === updatedItem.name);
      if (index !== -1) {
        this.supplies[index] = {...updatedItem};
      }
      this.showSupplyModal = false;
    },
    handleInventoryUpdate(updatedItem) {
      const index = this.currentInventory.findIndex(i => i.name === updatedItem.name);
      if (index !== -1) {
        this.currentInventory[index] = {...updatedItem};
      }
      this.showInventoryModal = false;
    },
    handleCreateSupply(newInventoryItem) {
      this.currentInventory.push(newInventoryItem);
      this.showInventoryModal = false;
    },
    getRowClass(data) {
      if (!data.expiry) {
        return '';
      }

      const today = new Date();
      const expiryDate = new Date(data.expiry);

      if (expiryDate < today) {
        return 'expired-row';
      }

      return '';
    }
  }

}

</script>

<template>
  <div class="">
    <div class="flex flex-column gap-4">

      <div class="surface-card shadow-4 p-4 border-round-3xl">
        <div
            class="px-3 py-1 rounded font-semibold text-white w-max"
            :class="role === 'admin' ? 'bg-green-600' : 'bg-blue-600'"
        >
          {{ role }}
        </div>
        <div class="flex justify-content-between align-items-center mb-4">
          <h1>Supplies</h1>
          <pv-button label="CREAR" icon="pi pi-plus-circle" @click="openCreateModal" class="green-button"/>

        </div>

        <div v-if="supplies.length === 0" class="text-center">
          <p>Aún no has agregado insumos. Añádelos para comenzar a gestionar tu inventario.</p>
          <pv-button label="CREAR INSUMO" icon="pi pi-plus-circle" class="mt-2" @click="openCreateModal"/>
        </div>

        <div v-else>
          <pv-carousel :value="supplies" :numVisible="3" :numScroll="1" :showIndicators="false">
            <template #item="slotProps">
              <inventory-supply-card
                  :supply="slotProps.data"
                  @edit="openEditModal"
              />
            </template>
          </pv-carousel>
        </div>
      </div>

      <div class="surface-card p-4 border-round-3xl">
        <div class="flex justify-content-around align-items-center mb-4">
          <h1 class="m-0">Inventory</h1>

          <pv-input-text v-model="search" placeholder="Buscar insumo" style="width: 400px" class="font-light"/>
          <pv-button label="AÑADIR" icon="pi pi-plus-circle" @click="openAddModal" class="green-button"/>


          <div class="flex align-items-center gap-2">
            <span>1-5 de 10</span>
            <pv-button icon="pi pi-angle-left" text/>
            <pv-button icon="pi pi-angle-right" text/>
          </div>
        </div>
        <div style="max-height: 300px; overflow-y: auto;">
          <pv-data-table
              :value="filteredInventory"
              responsiveLayout="scroll"
              :rowClass="(data) => getRowClass(data)"
              class="overflow-x-auto"
          >
            <pv-column field="name" header="Insumos"/>
            <pv-column field="category" header="Categoría"/>
            <pv-column field="unit" header="Unidad de medida"/>
            <pv-column field="expiry" header="Fecha de caducidad"/>
            <pv-column field="stock" header="Stock"/>
            <pv-column v-if="role === 'admin'" field="min" header="Stock Mínimo"/>
            <pv-column v-if="role === 'admin'" field="max" header="Stock Máximo"/>
            <pv-column field="perishable" header="Perecible"/>
            <pv-column header="Acciones">
              <template #body="slotProps">
                <pv-button
                    icon="pi pi-pen-to-square"
                    text
                    @click="() => {openInventoryEditModal(slotProps.data) }"
                />
                <pv-button
                    icon="pi pi-trash"
                    text
                    severity="danger"
                    @click="() => confirmDelete(slotProps.data)"
                />
              </template>
            </pv-column>
          </pv-data-table>
        </div>

      </div>
    </div>

    <pv-dialog
        :visible="showDeleteModal"
        modal
        header="Eliminar insumo del inventario"
        style="width: 450px"
        @update:visible="showDeleteModal = $event"
    >
      <div class="p-1">
        <p class="font-light">
          Está a punto de eliminar el insumo
          <strong>“{{ itemToDelete?.name }}”</strong> con
          <strong>{{ itemToDelete?.stock }} {{ itemToDelete?.unit }}</strong>
          en el inventario de forma permanente. <br/>
          Esta acción es irreversible y no podrá recuperarse luego.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-end gap-2">
          <pv-button
              label="CONFIRMAR"
              severity="success"
              @click="deleteInventoryItem"
              class="green-button"
          />
          <pv-button
              label="CANCELAR"
              severity="danger"
              @click="showDeleteModal = false"
              class="red-button"
          />
        </div>
      </template>
    </pv-dialog>

    <inventory-supply-create-and-edit
        :role="role"
        :visible="showSupplyModal"
        :isEdit="isEditing"
        :supplyToEdit="supplyToEdit"
        :categories="categories"
        :units="units"
        @create="createSupply"
        @update="updateSupply"
        @cancel="showSupplyModal = false"
        @update:visible="showSupplyModal = $event"
    />
    <inventorySupplyAddAndEdit
        :role="role"
        :visible="showInventoryModal"
        :isEdit="isEditing"
        :itemToEdit="selectedInventoryItem"
        :supplies="supplies"
        :providers="providers"
        :isPerishable="selectedInventoryItem?.perishable === 'Sí'"
        @create="handleCreateSupply"
        @update:visible="showInventoryModal = $event"
        @update="handleInventoryUpdate"
        @cancel="showInventoryModal = false"
    />
  </div>
</template>

<style>
h1 {
  font-weight: 400; /* Regular */
  font-size: 23px;
}

.expired-row {
  background-color: rgba(244, 21, 21, 0.3) !important;
}
</style>
