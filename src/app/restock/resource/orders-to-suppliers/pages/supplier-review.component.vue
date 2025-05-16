<script>
export default {
  name: 'SupplierReviews',
  data() {
    return {
      searchQuery: '',
      reviews: [
        {
          id: 1,
          restaurant: 'Punto Limón',
          score: 5,
          comment: 'Excelente proveedor, todos los productos estaban frescos...',
          date: '16/04/2025'
        },
        {
          id: 2,
          restaurant: 'Amazonas Restaurant',
          score: 3,
          comment: 'Productos frescos y entrega puntual...',
          date: '16/04/2025'
        },
        {
          id: 3,
          restaurant: 'Cebiche Perú',
          score: 5,
          comment: 'Todo llegó fresco y a tiempo...',
          date: '16/04/2025'
        },
        {
          id: 4,
          restaurant: 'Sabor y Postres',
          score: 2,
          comment: 'Buena experiencia. Solo faltó pulir un detalle...',
          date: '16/04/2025'
        },
        {
          id: 5,
          restaurant: 'Lincon Restaurant',
          score: 4,
          comment: 'Productos de calidad y puntualidad...',
          date: '16/04/2025'
        }
      ]
    };
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter(r =>
          r.restaurant.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    averageScore() {
      if (!this.reviews.length) return 0;
      const total = this.reviews.reduce((sum, r) => sum + r.score, 0);
      return (total / this.reviews.length).toFixed(1);
    }
  }
};
</script>

<template>
  <div class="reviews-container">
    <h2>15 Reviews</h2>

    <input
        v-model="searchQuery"
        placeholder="Search restaurant"
        class="search-input"
    />

    <table class="review-table">
      <thead>
      <tr>
        <th>Restaurant</th>
        <th>Review</th>
        <th>Comment</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="review in filteredReviews" :key="review.id">
        <td>{{ review.restaurant }}</td>
        <td>{{ review.score }}/5</td>
        <td>{{ review.comment }}</td>
        <td>{{ review.date }}</td>
      </tr>
      </tbody>
    </table>

    <p class="review-average">Review average: {{ averageScore }}/5</p>
  </div>
</template>



<style scoped>
.reviews-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

.search-input {
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.review-table {
  width: 100%;
  border-collapse: collapse;
}

.review-table th,
.review-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

.review-average {
  margin-top: 1.5rem;
  font-weight: bold;
}
</style>
