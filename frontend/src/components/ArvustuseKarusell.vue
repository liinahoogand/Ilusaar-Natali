<template>
    <section class="review-carousel">
      <h2 class="section-title">Tagasiside</h2>
      <div class="carousel-wrapper">
        <div class="carousel">
          <div
            v-for="(review, index) in visibleReviews"
            :key="index"
            class="review-card"
            :class="{ active: index === 1 }"
          >
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
            <p class="author">– {{ review.author }}</p>
          </div>
        </div>
  
        <div class="nav-buttons">
          <button @click="prev">&#10094;</button>
          <button @click="next">&#10095;</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reviews: [
          { rating: 5, comment: "Alati väga paindlik kättesaadavus ja sõbralikud näod. Rääkimata naljast ja naerust!", author: "" },
          { rating: 5, comment: "Siin on tööl väga toredad naised. Teevad oma tööd südamega. Hea tuju ka lisaks tagatud!", author: "" },
          { rating: 5, comment: "Väga hea teenindus. Olen väga rahul soenguga. Tööd teevad kiiresti ja hästi.", author: "Olga" },
          { rating: 5, comment: "Väga sõbralik ja hea teenindus iga kord. Ootan alati, et tagasi tulla. Töö on hea ja kvaliteetne. Olen soovitanud ka tuttavatele!", author: "" },
          { rating: 5, comment: "Super! Oma ala professionaalid, töö laitmatu, lahkud alati hea tujuga!", author: "" },
          { rating: 5, comment: "Siin on tööl vöga toredad naised. Teevad oma tööd südamega. Hea tuju ka lisaks tagatud.", author: "" }

        ],
        currentIndex: 0,
    };
  },
  computed: {
    visibleReviews() {
        const start = this.currentIndex;
        const total = this.reviews.length;
        let result = [];

        for (let i = start; i < start + 3; i++) {
            result.push(this.reviews[i % total]);
        }
    return result;
    },
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
    },
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
    },
  },
};
</script>

<style scoped>
.review-carousel {
  text-align: center;
  padding: 2rem 0;
  margin-top: 20px;
  margin-bottom: 0px;
}

.carousel-wrapper {
  position: relative;
  max-width: 900px;
  margin: auto;
  overflow: hidden;
}

.carousel {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

h2 {
  font-family: 'Tangerine', serif;
  font-size: 55px;
  font-weight: 900;
  color: #E6C36A;
  margin-bottom: 30px;
}

.review-card {
  background: #ffff;
  border-radius: 12px;
  padding: 1rem;
  width: 250px;
  box-shadow: 0 2px 8px #E6C36A;
  transform: scale(0.9);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.review-card.active {
  transform: scale(1.05);
  opacity: 1;
  box-shadow: 0 4px 15px #E6C36A;
  padding: 1rem;

}

.stars {
  color: #f5b301;
  font-size: 1.2rem;
}

.star {
  margin: 0 1px;
}

.comment {
  font-style: italic;
  margin: 0.5rem 0;
}

.nav-buttons {
  margin-top: 1rem;
}

.nav-buttons button {
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 1rem;
  color: #666;
}

.nav-buttons button:hover {
  color: #000;
}
</style>