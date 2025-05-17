<script> import SupplierModal from '../components/supplier-modal.component.vue'

export default {
  name: 'RestaurantSupplierOverview', components: {SupplierModal}, data() {
    return {
      searchText: '',
      selectedCategory: '',
      onlyActive: false,
      showAddSupplierModal: false,
      isMobile: false,
      suppliers: [],
      categories: []
    }
  }, computed: {
    filteredSuppliers() {
      return this.suppliers.filter(s => {
        const matchesText = s.name.toLowerCase().includes(this.searchText.toLowerCase())
        const matchesCategory = this.selectedCategory ? s.category === this.selectedCategory : true
        const matchesStatus = this.onlyActive ? s.status === true : true
        return matchesText && matchesCategory && matchesStatus
      })
    }
  }, mounted() {
    this.checkViewport()
    window.addEventListener('resize', this.checkViewport)
    const added = this.$route.query.added
    if (added) {
      this.loadSuppliers()
      this.$router.replace({query: {...this.$route.query, added: undefined}})
    } else {
      this.loadSuppliers()
    }
  }, beforeUnmount() {
    window.removeEventListener('resize', this.checkViewport)
  }, methods: {
    checkViewport() {
      this.isMobile = window.innerWidth <= 1000
    },
    async loadSuppliers() {
      try {
        const API_URL = import.meta.env.VITE_API_URL
        const response = await fetch(`${API_URL}/restaurant_suppliers?restaurant_id=2`)
        const links = await response.json()
        const supplierPromises = links.map(link =>
            fetch(`${API_URL}/users/${link.supplier_id}`).then(r => r.json())
        )

        const supplierData = await Promise.all(supplierPromises)

        this.suppliers = supplierData.map(s => ({
          id: s.id,
          name: s.name,
          email: s.email,
          category: s.category || 'Uncategorized',
          status: s.status ?? true,
          added: true
        }))

        this.categories = [...new Set(this.suppliers.map(s => s.category))]
      } catch (error) {
        console.error('Error loading suppliers from backend:', error)
      }
    },
    goToDetail(id) {
      this.$router.push(`/dashboard/restaurant/suppliers/${id}`)
    }
  }
}
</script>
<template>
  <div class="supplier-container"> <!-- Desktop header -->
    <div class="desktop-only" v-if="!isMobile">
      <div class="supplier-header"><h2 class="text-sales">Suppliers</h2>
        <div class="supplier-filters">
          <pv-input-text v-model="searchText" placeholder="Search supplier" class="filter-input">
            <template #prepend><i class="pi pi-search"/></template>
          </pv-input-text>
          <pv-dropdown
              :options="categories"
              v-model="selectedCategory"
              placeholder="Category"
              class="filter-select"
          />

          <pv-input-switch v-model="onlyActive" :disabled="!suppliers.length"/>
          <label class="ml-2">Show only actives</label>
        </div>

        <pv-button
            label="ADD"
            icon="pi pi-plus-circle"
            class="new-supplier-btn"
            @click="showAddSupplierModal = true"
        />
      </div>
    </div>

    <!-- Mobile header -->
    <div class="mobile-only" v-else>
      <div class="top-row">
        <h2 class="text-sales">Suppliers</h2>
        <pv-button
            icon="pi pi-plus-circle"
            label="ADD"
            class="new-supplier-btn"
            @click="showAddSupplierModal = true"
        />
      </div>
      <div class="search-row">
        <pv-input-text v-model="searchText" placeholder="Search supplier" class="w-full"/>
      </div>
      <div class="category-row">
        <pv-dropdown
            :options="categories"
            v-model="selectedCategory"
            placeholder="Category"
            class="filter-select"
        />
        <pv-input-switch v-model="onlyActive" :disabled="!suppliers.length"/>
        <label class="ml-2">Show only actives</label>
      </div>
    </div>

    <!-- Table -->
    <div v-if="!filteredSuppliers.length" class="empty-state">
      <p>Currently you have no suppliers added, please add new suppliers to manage them from here.</p>
      <i class="pi pi-users supplier-icon"/>
    </div>

    <div v-else class="table-wrapper mt-4">
      <h5 class="table-title">Supplier list</h5>
      <pv-data-table :value="filteredSuppliers" responsiveLayout="scroll" class="supplier-table">
        <pv-column field="name" header="Name"/>
        <pv-column field="category" header="Category"/>
        <pv-column field="email" header="Email"/>
        <pv-column header="">
          <template #body="slotProps">
            <pv-button icon="pi pi-book" text @click="goToDetail(slotProps.data.id)"/>
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
  <supplier-modal v-if="showAddSupplierModal" @close="showAddSupplierModal = false"/>
</template>

<style >
.supplier-container {
  padding: 24px;
  margin: 0 2rem 0 2rem;
}

.text-sales {
  font-size: 23px;
  font-weight: 400;
}

.supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.new-supplier-btn {
  background-color: #4F8A5B !important;
  color: white !important;
  border-radius: 2px;
  padding: 15px 30px;
}

.btn-content {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
}

.supplier-filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.table-wrapper {
  margin-top: 1rem;
}

.supplier-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 1px -1px 5px rgba(0, 0, 0, 0.15);
}

.p-datatable thead th {
  background-color: #f9f9f9;
  color: #757575;
  font-weight: 600;
  border-right: none;
}

.p-datatable tbody td {
  border-right: none;
}

.empty-state {
  text-align: center;
  margin-top: 40px;
  color: #7f8c8d;
}

.supplier-icon {
  font-size: 160px;
  color: #7f8c8d;
}

@media (max-width: 1000px) {
  .supplier-container {
    margin: 0;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .mobile-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-row, .category-row {
    width: 100%;
  }

  .category-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .full-width {
    width: 100%;
  }
}

@media (max-width: 950px) {
  .p-datatable th, .p-datatable td {
    font-size: 12px;
  }
} </style>