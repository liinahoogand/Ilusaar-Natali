<template>
  <NavBar />
  <div class="meist-info">
    <div class="pildid">
      <div class="pilt pilt-renata">
        <img src="../assets/images/renata.jpg" alt="Renata" />
        <div class="column column-renata">
          <h3>Renata</h3>
          <p>Renata on Ilusaare salongi asutaja, kes pakub tänaseks mitmekesist valikut iluteenuseid. Ta on professionaalselt õppinud erinevaid küünetehnikaid ja ripsmehooldust, lisaks on ta viimastel aastatel täiendanud end näohoolduste ning püsimeigi vallas.</p>        
        </div>
      </div>
      <div class="pilt pilt-natali">
        <img src="../assets/images/natali.jpg" alt="Natali" />
        <div class="column column-natali">
          <h3>Natali</h3>
          <p>Natali on meie andekas juuksur, kellel on aastatepikkune kogemus ning kellel oli varem ka oma salong. Meil on ülihea meel, et ta on nüüd osa meie tiimist. Ta on läbinud mitmeid professionaalseid koolitusi ja on väga osav oma töös, alati hooliv ja täpne.</p>        
        </div>
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
  margin-top: 30px;
}

.pildid {
  display: flex; /* Flex-konteiner, et kuvada pilte kõrvuti */
  justify-content: center; /* Keskjoondab pilte */
  gap: 30px; /* Veerude vaheline kaugus */
}

.pilt {
  position: relative;
  width: 30%; /* Piltide suurus - 45% laius */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pilt img {
  width: 100%; /* Pilt täidab kogu konteineri laiuse */
  border-radius: 8px;
  display: block;
  margin-bottom: 30px;

}

.column {
  padding: 20px;
  text-align: center; /* Keskjoondab teksti */
}

.column h3 {
  font-family: 'Tangerine', serif;
  color: #E6C36A;
  font-size: 60px;
  margin-bottom: 10px;
  margin-top: 0px;
  font-weight: bold;
}

.column p {
  font-size: 19px;
  font-family: 'Playfair Display', serif;
  color: #555;
}

.column-renata {
  background-color: #ffe6a75b;
}
.column-natali {
  background-color: #ffe6a75b;
}
</style>
