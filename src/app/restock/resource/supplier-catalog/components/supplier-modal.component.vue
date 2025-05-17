<script>
import {defineComponent, ref, onMounted, onBeforeUnmount, computed} from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'SupplierModal', emits: ['close'], setup(_, {emit}) {
    const router = useRouter()
    const searchText = ref('')
    const isMobile = ref(false)
    const suppliers = ref([])
    const API_URL = import.meta.env.VITE_API_URL
    const loadSuppliersFromApi = async () => {
      try {
        const response = await fetch(`${API_URL}/users?role_id.name=supplier`)
        const data = await response.json()
        suppliers.value = data.map(s => ({id: s.id, name: s.name, email: s.email, address: s.address || '-',}))
      } catch (error) {
        console.error('Error loading suppliers:', error)
      }
    }
    const filteredSuppliers = computed(() => suppliers.value.filter(s => s.name.toLowerCase().includes(searchText.value.toLowerCase())))
    const getColumns = computed(() => isMobile.value ? ['name', 'email', 'catalog'] : ['name', 'email', 'address', 'catalog'])
    const goToDetail = (id) => {
      router.push(`/dashboard/restaurant/suppliers/${id}`)
    }
    const checkViewport = () => {
      isMobile.value = window.innerWidth <= 800
    }
    onMounted(() => {
      checkViewport()
      window.addEventListener('resize', checkViewport)
      loadSuppliersFromApi()
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkViewport)
    })
    return {searchText, suppliers, filteredSuppliers, isMobile, getColumns, goToDetail, emit}
  }
})
</script>
<template>
  <div class="modal-backdrop">
    <div class="modal-content"><h4>Add supplier</h4>
      <p>Fill in the details of the new supplier to add it to your list.</p>
      <div class="flex">
        <pv-input-text v-model="searchText" placeholder="Search supplier" class="filter-field">
          <template #prepend><i class="pi pi-search"/></template>
        </pv-input-text>
      </div>

      <pv-data-table
          :value="filteredSuppliers"
          responsiveLayout="scroll"
          class="full-width-table"
      >
        <pv-column v-if="getColumns.includes('name')" field="name" header="Name"/>
        <pv-column v-if="getColumns.includes('email')" field="email" header="Email"/>
        <pv-column v-if="getColumns.includes('address')" field="address" header="Address"/>
        <pv-column v-if="getColumns.includes('catalog')" header="Catalog">
          <template #body="slotProps">
            <pv-button icon="pi pi-book" text @click="goToDetail(slotProps.data.id)"/>
          </template>
        </pv-column>
      </pv-data-table>

      <div class="modal-actions">
        <pv-button
            label="CANCEL"
            icon="pi pi-times"
            severity="danger"
            @click="emit('close')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.filter-field {
  flex: 1;
}

.full-width-table {
  width: 100%;
  background-color: white;
  margin-bottom: 1rem;
}

.modal-actions {
  margin-top: 1rem;
  text-align: center;
}
</style>