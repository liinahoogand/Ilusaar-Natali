<template>
  <NavBar />
  <div class="meist-info">
    <div class="pilt">
      <img src="../assets/images/natali&renata.png" alt="Renata ja Natali" />
    </div>

    <!-- Lisatud kaks veergu -->
    <div class="columns">
      <div class="column column-renata">
        <h3>Natali</h3>
        <p>Natali on spetsialiseerunud juuksuriteenustele ja teda inspireerivad pidevalt uued trendid.</p>
      </div>
      <div class="column column-natali">
      
        <h3>Renata</h3>
        <p>Renata on meie ilusalongi üks looja, kes armastab ilu ja eestimaiseid traditsioone.</p>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'MeistInfo',
  components: {
    NavBar,
    AppFooter
  }
}
</script>

<style scoped lang="scss">

.meist-info {
  text-align: center;
}

.pilt {
  margin-top: 30px;
}

.pilt img {
  width: 60%; /* Väiksemaks pilt */
  margin: 0 auto; /* Keskjoondab pildi */
  display: block;
}

.columns {
  display: flex;
  justify-content: center; /* Keskjoondab veerud */
  margin-top: 30px;
  gap: 20px;
}

.column {
  width: 45%; /* Iga veerg 45% laiune */
  text-align: center; /* Keskjoondab teksti igas veerus */
  padding: 20px;
  border-radius: 8px;
}

.column h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.column p {
  font-size: 1rem;
  color: #555;
}

.column-renata {
  background-color: #e6c36a56; /* Sinine taust Renatale */
}

.column-natali {
  background-color: #e6c36a45; /* Roosa taust Natali jaoks */
}

</style>
