<script> export default {
  name: 'RestaurantLastSuppliesWidget', data() {
    return {
      ingredients: [{
        name: 'Pescado bonito',
        category: 'Fish',
        description: 'Se requiere producto fresco, refrigerado entre 0°C y 4°C'
      }, {
        name: 'Ají amarillo',
        category: 'Vegetal',
        description: 'Usado para base de salsas. Preferencia fresco'
      }, {
        name: 'Papa Huayro',
        category: 'Vegetal',
        description: 'Usada para platos criollos. Se requiere cocción rápida'
      }, {
        name: 'Cebolla roja',
        category: 'Vegetal',
        description: 'Requiere frescura y consistencia firme'
      }, {
        name: 'Leche evaporada',
        category: 'Lácteo',
        description: 'Marca específica solicitada, se almacena en ambiente seco'
      }, {
        name: 'Queso fresco',
        category: 'Lácteo',
        description: 'Debe venir sellado al vacío y refrigerado'
      }, {name: 'Arroz', category: 'Grano', description: 'Variedad extra grano largo'}, {
        name: 'Ajo molido',
        category: 'Condimento',
        description: 'Debe venir empacado en bolsas de 1kg'
      }, {
        name: 'Culantro fresco',
        category: 'Hierba',
        description: 'Entregar en bolsas húmedas, refrigerado'
      }, {name: 'Pimiento rojo', category: 'Vegetal', description: 'Se requiere lavado y listo para picar'}],
      currentIndex: 0,
      visibleCount: 5
    };
  }, mounted() {
    this.updateVisibleCount();
    window.addEventListener('resize', this.updateVisibleCount);
  }, beforeUnmount() {
    window.removeEventListener('resize', this.updateVisibleCount);
  }, methods: {
    updateVisibleCount() {
      const width = window.innerWidth;
      if (width < 640) this.visibleCount = 2; else if (width < 900) this.visibleCount = 3; else if (width < 1200) this.visibleCount = 4; else this.visibleCount = 5;
    }, next() {
      if (this.currentIndex + this.visibleCount < this.ingredients.length) {
        this.currentIndex++;
      }
    }, prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }, getVisibleItems() {
      return this.ingredients.slice(this.currentIndex, this.currentIndex + this.visibleCount);
    }
  }
} </script>
<template>
  <div><h3 class="widget-title">Latest Supplies</h3>
    <div class="carousel-widget">
      <div class="carousel-wrapper">
        <button @click="prev" class="nav-button" :disabled="currentIndex === 0">‹</button>
        <div class="carousel-track">
          <div
              v-for="(ingredient, index) in getVisibleItems()"
              :key="index"
              class="ingredient-card"
          >
            <h4 class="text-sm font-semibold text-gray-800 mb-1">{{ ingredient.name }}</h4>
            <p class="text-xs font-medium text-green-700 mb-1">{{ ingredient.category }}</p>
            <p class="text-xs text-gray-600 leading-snug">{{ ingredient.description }}</p>
          </div>
        </div>

        <button @click="next" class="nav-button" :disabled="currentIndex + visibleCount >= ingredients.length">›
        </button>
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

.carousel-widget {
  background: #fff;
  padding: 20px 30px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.nav-button {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow: hidden;
}

.ingredient-card {
  flex: 0 0 200px;
  background-color: #CDE7D3;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
} </style>