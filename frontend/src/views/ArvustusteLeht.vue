<template>    
<NavBar />

    <div class="arvustused-page">
      <h1>Klientide arvustused</h1>
      <div class="divider"></div>
      <h2>Oled meid hiljuti külastanud?</h2>


      <!-- Arvustuse lisamise vorm -->
<!-- Vormi avamise nupp -->
<button @click="showForm = !showForm">
  {{ showForm ? 'Peida arvustuse vorm' : 'Lisa oma arvustus' }}
</button>

<!-- Arvustuse lisamise vorm -->
<div v-if="showForm" class="form-section">
  <h3>Kirjuta arvustus</h3>
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
            <p>{{ review.author }}</p>
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
          { rating: 5, comment: "Alati väga paindlik kättesaadavus ja sõbralikud näod. Rääkimata naljast ja naerust!", author: "-Salongi külastaja-", date: "2025-05-07" },
          { rating: 5, comment: "Siin on tööl väga toredad naised. Teevad oma tööd südamega. Hea tuju ka lisaks tagatud!", author: "-Salongi külastaja-", date: "2025-05-06" },
          { rating: 5, comment: "Väga hea teenindus. Olen väga rahul soenguga. Tööd teevad kiiresti ja hästi.", author: "Olga", date: "2025-05-06" },
          { rating: 5, comment: "Väga sõbralik ja hea teenindus iga kord. Ootan alati, et tagasi tulla. Töö on hea ja kvaliteetne. Olen soovitanud ka tuttavatele!", author: "-Salongi külastaja-", date: "2025-05-06" },
          { rating: 5, comment: "Super! Oma ala professionaalid, töö laitmatu, lahkud alati hea tujuga!", author: "-Salongi külastaja-", date: "2025-05-06" },
          { rating: 5, comment: "Siin on tööl vöga toredad naised. Teevad oma tööd südamega. Hea tuju ka lisaks tagatud.", author: "-Salongi külastaja-", date: "2025-05-06" }
        ],
        newReview: {
          author: "",
          comment: "",
          rating: null,
        },
      };
    },
    methods: {
      async submitReview() {
        const today = new Date().toISOString().split("T")[0];

        // Lisa kohe kohalikku loendisse
        const uus = {
          ...this.newReview,
          date: today
        };
        this.reviews.unshift(uus);

        // Saada serverisse
        try {
          await fetch('https://ilusaar-backend.onrender.com/api/arvustused', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nimi: this.newReview.author,
              kommentaar: this.newReview.comment,
              hinne: this.newReview.rating
            })
          });
        } catch (err) {
          console.error("Viga arvustuse salvestamisel:", err);
          alert("Viga: arvustust ei õnnestunud salvestada andmebaasi.");
        }

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
  
  h1{
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'Tangerine', serif;
    font-size: 70px;
    font-weight: 900;
    color: #E6C36A;
    margin: 20px 0 20px;
    padding-top: 10px;
  }

  .divider {
    width: 580px;
    height: 1px;
    background-color: #E6C36A;
    margin: 0 auto 50px;
    border-radius: 2px;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 300;
    color: #E6C36A;
    margin: 20px 0 20px;
    padding-top: 10px;
  }
  
  h3 {
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 400;
    color: #E6C36A;
    margin: 20px 0 20px;
    padding-top: 10px;
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
    box-shadow: 0 2px 8px #ffe6a7;
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
    background: #ffe6a75b;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 1px 4px #ffe6a7;
    margin-bottom: 30px;
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
    border: 1px solid ffe6a7;
    border-radius: 6px;
    font-size: 1rem;
    margin-bottom: 30px;
  }
  
 button {
  background-color: white; /* Valge taust */
  color: #E6C36A; /* Kuldne tekst */
  font-family: 'Quicksand', serif;
  font-weight: 600;
  border: 2px solid #E6C36A; /* Kuldne piir */
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: block; /* Nupp keskel */
  margin: 0 auto; /* Keskendab nupu horisontaalselt */
  margin-block: 10px;
}

button:hover {
  background-color: #E6C36A; /* Kuldne taust hoveri korral */
  color: white; /* Tekst muutub valgeks hoveri korral */
}

  </style>
  