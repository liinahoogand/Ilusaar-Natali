<template>    
<NavBar />

    <div class="arvustused-page">
      <h1>Klientide arvustused</h1>

      <!-- Arvustuse lisamise vorm -->
<!-- Vormi avamise nupp -->
<button @click="showForm = !showForm">
  {{ showForm ? 'Peida arvustuse vorm' : 'Lisa oma arvustus' }}
</button>

<!-- Arvustuse lisamise vorm -->
<div v-if="showForm" class="form-section">
  <h2>Lisa oma arvustus</h2>
  <form @submit.prevent="submitReview">
    <input
      type="text"
      v-model="newReview.author"
      placeholder="Sinu nimi"
      required
    />
    <textarea
      v-model="newReview.comment"
      placeholder="Sinu tagasiside"
      required
    ></textarea>
    <label>Hinne:</label>
    <select v-model.number="newReview.rating" required>
      <option disabled value="">Vali hinne</option>
      <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
    </select>
    <button type="submit">Saada arvustus</button>
  </form>
</div>

      <!-- Arvustuste nimekiri -->
      <div class="arvustuste-list">
        <div v-for="(review, index) in reviews" :key="index" class="arvustus">
          <div class="arvustus-header">
            <strong>{{ review.author }}</strong>
            <span class="kuupaev">{{ review.date }}</span>
          </div>
          <div class="stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= review.rating }"
              >★</span
            >
          </div>
          <p class="comment">"{{ review.comment }}"</p>
        </div>
      </div>
    </div>
    <AppFooter />
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import AppFooter from '@/components/AppFooter.vue';

  export default {
    name: "ArvustusedView",
    components: {
      NavBar,
      AppFooter,
    },
    data() {
      return {
        showForm: false,
        reviews: [
          {
            rating: 5,
            comment: "Väga sõbralik teenindus!",
            author: "Kadi",
            date: "2024-11-03",
          },
          {
            rating: 4,
            comment: "Kiire ja professionaalne!",
            author: "Mart",
            date: "2024-12-20",
          },
          {
            rating: 5,
            comment: "Väga rahul lõikusega!",
            author: "Anneli",
            date: "2025-01-10",
          },
        ],
        newReview: {
          author: "",
          comment: "",
          rating: null,
        },
      };
    },
    methods: {
      submitReview() {
        const today = new Date().toISOString().split("T")[0];
        this.reviews.push({
          ...this.newReview,
          date: today,
        });
  
        // Tühjenda vorm
        this.newReview = {
          author: "",
          comment: "",
          rating: null,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .arvustused-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  h1,
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .arvustuste-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .arvustus {
    background: #fff;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .arvustus-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .kuupaev {
    font-size: 0.9rem;
    color: #777;
  }
  
  .stars {
    color: #f5b301;
    margin-bottom: 0.5rem;
  }
  
  .star {
    margin-right: 2px;
  }
  
  .comment {
    font-style: italic;
  }
  
  /* Vormistiilid */
  .form-section {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input,
  textarea,
  select {
    padding: 0.7rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  button {
    background-color: #333;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>
  