<script setup>
import {useRouter} from 'vue-router'
import {defineProps} from 'vue'
import {addRestaurantSupplier} from '../services/supplier.service.js'

const router = useRouter()
const props = defineProps({supplier: {type: Object, required: true}})
const API_URL = import.meta.env.VITE_API_URL
const RESTAURANT_ID = 2

async function addSupplier() {
  try {
    const checkRes = await fetch(`${API_URL}/restaurant_suppliers?restaurant_id=${RESTAURANT_ID}&supplier_id=${props.supplier.id}`)
    const existing = await checkRes.json()
    if (existing.length > 0) {
      console.log('Supplier already added.')
      return
    }
    await addRestaurantSupplier(props.supplier.id)
    router.push('/dashboard/restaurant/suppliers?added=true')
  } catch (error) {
    console.error('Error checking or adding supplier:', error)
  }
}

function contactSupplier() {
  const phone = props.supplier.phone?.replace(/\D/g, '')
  if (phone) {
    window.open(`https://wa.me/${phone}`, '_blank')
  }
} </script>

<template><h3 class="mobile-subtitle">Suppliers</h3>
  <div class="summary-container"> <!-- Columna imagen -->
    <div class="image-column"><h4>{{ supplier.name }}</h4> <img src="/src/assets/general_profile_supplier.png"
                                                                alt="Supplier image"/>
    </div>
    <!-- Columna información 1 -->
    <div class="info-column">
      <p>Name: {{ supplier.name }}</p>
      <p>RUC: {{ supplier.ruc }}</p>
      <p>Category: {{ supplier.category }}</p>
      <p>Status: {{ supplier.status ? 'Active' : 'Inactive' }}</p>
      <p>Registration Date: {{ supplier.registrationDate }}</p>
      <p>Last Update: {{ supplier.lastUpdate }}</p>
    </div>

    <!-- Columna información 2 -->
    <div class="info-column">
      <p>Email: {{ supplier.email }}</p>
      <p>Phone: {{ supplier.phone }}</p>
      <p>Address: {{ supplier.address }}</p>
      <p>Contact Person: {{ supplier.contactPerson }}</p>
      <p>Position: {{ supplier.position }}</p>
    </div>

    <!-- Columna de acciones -->
    <div class="column action-column">
      <pv-button
          label="ADD"
          icon="pi pi-plus-circle"
          class="summary-btn"
          @click="addSupplier"
      />
      <br/>
      <pv-button
          label="CONTACT"
          icon="pi pi-phone"
          class="summary-btn"
          @click="contactSupplier"
      />
    </div>
  </div>
</template>

<style scoped> .summary-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  background: #fff;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 20px 0;
}

.mobile-subtitle {
  display: none;
  font-size: 22px;
  font-weight: 500;
  margin: 1rem 0;
  padding-left: 1rem;
}

.info-column {
  text-align: center;
}

.image-column h4 {
  margin-top: 0;
}

.image-column img {
  width: 150px;
  height: auto;
  border-radius: 12px;
}

.summary-btn {
  background-color: #4F8A5B !important;
  color: white !important;
  border-radius: 2px;
  margin-top: 0.5rem;
}

.btn-content {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
}

.action-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 800px) {
  .summary-container {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }

  .mobile-subtitle {
    display: block;
  }

  .info-column {
    width: 90%;
    text-align: left;
    font-size: 14px;
  }

  .action-column {
    order: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-column {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin-bottom: -90px;
  }

  h4 {
    padding-top: 20px;
  }

  img {
    width: 35%;
  }
} </style>