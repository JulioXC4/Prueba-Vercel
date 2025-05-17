<script setup> import {useRoute, useRouter} from 'vue-router'
import {ref, computed, onMounted} from 'vue'
import SupplierSummary from '../components/supplier-summary.component.vue'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()
const route = useRoute()
const supplier = ref(null)
const notFound = computed(() => supplier.value === null)
const goBack = () => {
  router.push('/dashboard/restaurant/suppliers/')
}
onMounted(async () => {
  const id = parseInt(route.params.id)
  try {
    const res = await fetch(`${API_URL}/users/${id}`)
    if (!res.ok) throw new Error('Not found')
    const data = await res.json()
    supplier.value
        = {
      id: data.id,
      name: data.name,
      email: data.email,
      address: data.address || '-',
      phone: data.phone || '',
      ruc: data.ruc || '',
      contactPerson: data.contactPerson || '',
      position: data.position || '',
      category: data.category || '',
      status: data.status ?? true,
      registrationDate: data.registrationDate || 'N/A',
      lastUpdate: data.lastUpdate || 'N/A'
    }
  } catch (error) {
    console.error('Supplier not found:', error)
    supplier.value = null
  }
})
</script>
<template>
  <div class="content">
    <div v-if="notFound" class="not-found"><h2>Supplier not found</h2>
      <pv-button class="supplier-back-btn" icon="pi pi-arrow-left" label="Back" @click="goBack"/>
    </div>
    <div v-else class="supplier-detail">
      <pv-button
          class="supplier-back-btn-fix"
          icon="pi pi-arrow-left"
          text
          rounded
          @click="goBack"
      />
      <supplier-summary :supplier="supplier"/>
    </div>
  </div>
</template>
<style scoped>
.content {
  width: 100%;
}

.not-found {
  text-align: center;
  margin-top: 3rem;
}

.supplier-back-btn {
  background-color: #4F8A5B !important;
  color: white !important;
  border-radius: 2px;
  padding: 15px;
}

.supplier-back-btn-fix {
  background-color: #4F8A5B !important;
  color: white !important;
  border-radius: 50px;
  padding: 0.5rem;
} </style>