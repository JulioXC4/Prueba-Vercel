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
  }, computed: {
    visibleIngredients() {
      return this.ingredients.slice(this.currentIndex, this.currentIndex + this.visibleCount)
    }
  }, mounted() {
    this.updateVisibleCount()
    window.addEventListener('resize', this.updateVisibleCount)
  }, beforeUnmount() {
    window.removeEventListener('resize', this.updateVisibleCount)
  }, methods: {
    updateVisibleCount() {
      const width = window.innerWidth
      if (width < 640) this.visibleCount = 2
      else if (width < 900) this.visibleCount = 3
      else if (width < 1200) this.visibleCount = 4
      else this.visibleCount = 5
    }, next() {
      if (this.currentIndex + this.visibleCount < this.ingredients.length) {
        this.currentIndex++
      }
    }, prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }, getPairs() {
      const pairs = []
      for (let i = 0; i < this.ingredients.length; i += 2) {
        pairs.push(this.ingredients.slice(i, i + 2))
      }
      return pairs
    }
  }
} </script>
<template>
  <div class="carousel-container"><h3 class="widget-title">Last added supplies</h3>
    <!-- Desktop Carousel -->
    <div class="carousel">
      <pv-button icon="pi pi-chevron-left" text @click="prev" :disabled="currentIndex === 0"/>
      <div class="carousel-track">
        <div class="ingredient-card" v-for="(i, index) in visibleIngredients" :key="index">
          <h4>{{ i.name }}</h4>
          <p class="category">{{ i.category }}</p>
          <p class="description">{{ i.description }}</p>
        </div>
      </div>
      <pv-button icon="pi pi-chevron-right" text @click="next"
                 :disabled="currentIndex + visibleCount >= ingredients.length"/>
    </div>

    <!-- Mobile Scrollable Grid -->
    <div class="supplies-grid">
      <div class="ingredient-pair" v-for="(pair, i) in getPairs()" :key="i">
        <div class="ingredient-card" v-for="(i, j) in pair" :key="j">
          <h4>{{ i.name }}</h4>
          <p class="category">{{ i.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.widget-title {
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-size: 23px;
  margin-bottom: 10px;
}

.carousel-container {
  margin-top: 2rem;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
}

.ingredient-card {
  flex: 0 0 calc(20% - 1rem);
  background-color: #CDE7D3;
  border-radius: 12px;
  padding: 1rem;
  box-sizing: border-box;
  min-width: 150px;
  height: 180px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  align-content: space-around;
}

.ingredient-card h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.category {
  font-weight: 500;
  margin: 0.25rem 0;
  color: #757575;
}

.description {
  font-size: 13px;
  color: #444;
}

.supplies-grid {
  display: none;
}

@media (max-width: 800px) {
  .supplies-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    background: #fff;
    padding: 20px 30px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    height: 180px;
  }

  .ingredient-pair {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ingredient-card {
    background-color: #F4F4F4;
    border-radius: 15px;
    width: 215px;
    padding: 0 0 0 15px;
    min-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    align-content: center;
  }

  .carousel {
    display: none;
  }
} </style>