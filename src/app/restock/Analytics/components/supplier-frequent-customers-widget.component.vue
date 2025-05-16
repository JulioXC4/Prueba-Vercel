<script> export default {
  name: 'SupplierFrequentCustomersWidget', data() {
    return {
      customers: [{
        name: 'Restaurante El Sabor Criollo',
        category: 'Comida peruana tradicional',
        description: 'Realiza compras semanales de ajíes, papas nativas y carnes al proveedor, priorizando insumos locales.'
      }, {
        name: 'La Mesa Verde',
        category: 'Cocina saludable y orgánica',
        description: 'Compra gran volumen de verduras orgánicas, quinua y legumbres cada 3 días para mantener su menú fresco.'
      }, {
        name: 'Don Carboncito',
        category: 'Parrillas y carnes premium',
        description: 'Adquiere cortes de carne de alta calidad y carbón vegetal cada semana, siendo uno de los mayores compradores en volumen.'
      }, {
        name: 'Mar y Tierra Bistro',
        category: 'Fusión marina y gourmet',
        description: 'Solicita mariscos frescos, especias importadas y vinos artesanales, con entregas programadas tres veces por semana.'
      }], isMobile: false
    };
  }, mounted() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport);
  }, beforeUnmount() {
    window.removeEventListener('resize', this.checkViewport);
  }, methods: {
    checkViewport() {
      this.isMobile = window.innerWidth <= 800;
    }, getPairs() {
      const pairs = [];
      for (let i = 0; i < this.customers.length; i += 2) {
        pairs.push(this.customers.slice(i, i + 2));
      }
      return pairs;
    }
  }
}; </script>
<template>
  <div>
    <div v-if="isMobile" class="mobile-header"><h3>Frequent Customers</h3></div>
    <div class="frequent-customers-container">
      <div v-if="!isMobile" class="header"><h3>Frequent Customers</h3></div>
      <div class="cards-grid" v-if="!isMobile">
        <div
            class="customer-card"
            v-for="(customer, index) in customers"
            :key="index"
        >
          <h4>{{ customer.name }}</h4>
          <p class="category">{{ customer.category }}</p>
          <p class="description">{{ customer.description }}</p>
        </div>
      </div>

      <div class="frequent-grid" v-else>
        <div
            class="restaurant-pair"
            v-for="(pair, index) in getPairs()"
            :key="'pair-' + index"
        >
          <div
              class="restaurant-card"
              v-for="(c, i) in pair"
              :key="'c-' + i"
          >
            <h4>{{ c.name }}</h4>
            <p class="category">{{ c.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped> .frequent-customers-container {
  background: #fff;
  padding: 10px 30px 30px 30px;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.customer-card {
  background-color: #CDE7D3;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.customer-card h4 {
  margin-bottom: 0.25rem;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.customer-card .category {
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  margin-bottom: 0.5rem;
}

.customer-card .description {
  font-size: 13px;
  color: #555;
  line-height: 1.4;
}

.mobile-header h3 {
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 23px;
  margin-bottom: 10px;
}

@media (max-width: 800px) {
  .cards-grid {
    display: none;
  }

  .frequent-customers-container .header {
    display: none;
  }

  .frequent-customers-container {
    padding: 0;
  }

  .frequent-grid {
    display: flex;
    padding: 1rem;
    background: #fff;
    border-radius: 30px;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .restaurant-pair {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .restaurant-card {
    background-color: #F4F4F4;
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  .restaurant-card h4 {
    font-size: 14px;
    margin: 0;
  }

  .restaurant-card p {
    font-size: 12px;
    color: #757575;
    margin-bottom: 0;
  }
} </style>