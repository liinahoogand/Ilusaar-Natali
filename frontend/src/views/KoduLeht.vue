<template>
  <div class="page-wrapper">
    <NavBar />
    <main>
      <div class="container">

        <!-- Hero Image -->
        <div class="esimene-pilt">
          <img src="../assets/images/kodulehe-pilt-tekstiga.png" alt="Naine rohelise taustaga kodulehe banneril" />
        </div>

        <!-- Welcome Text -->
        <section class="vahetekst">
          <h2>Tere tulemast Ilusaar & Natali salongi!</h2>
          <div class="divider"></div>

          <div class="tekst-ja-pilt">
            <div class="pildi-container">
              <img src="../assets/images/esilehe-pilt.jpg" alt="Salongi pilt" />
            </div>
            <div class="teksti-container">
              <h3>Kõik, mida vajad – ühes armsas kohas.</h3>
              <p>
                Meie väikeses, aga särtsakas ilusalongis Kuressaare südames, aadressil Kohtu 1, ootab Sind mõnus ja kodune atmosfäär,
                kus ilu sünnib rõõmuga. Meie salong on koht, kus saad end hellitada ja kõik vajaliku mugavalt ühest kohast –
                olgu selleks värske soeng, hoolitsetud käed-jalad, kaunid ripsmed või professionaalne püsimeik.
                <br><br>
                Ootame Sind rõõmuga!
              </p>
            </div>
          </div>
        </section>

        <!-- Teenused -->
        <section class="teenuste-nimekirja-taust">
          <h2 class="teenused-pealkiri">Teenused</h2>

          <div class="teenuste-nimekiri-wrapper">
            <div class="teenuste-nimekiri">
              <h2>Ilusaar</h2>
              <div v-for="item in leftServices" :key="item.title" class="service">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>

            <div class="divider2"></div>

            <div class="teenuste-nimekiri">
              <h2>Natali</h2>
              <div v-for="item in rightServices" :key="item.title" class="service">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="broneeri-nupp-container">
            <router-link to="/broneeri" class="broneeri-nupp">Broneeri</router-link>
          </div>
        </section>

        <!-- Galerii -->
        <section class="kollaaž-galerii">
          <div v-for="(img, index) in images" :key="index" class="kollaaž-item">
            <img :src="img" alt="Galerii pilt" />
          </div>
        </section>

      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'KoduLeht',
  components: {
    NavBar,
    AppFooter
  },
  data() {
    return {
      leftServices: [
        { title: 'Maniküür/pediküür', description: 'Kaunista oma käed ja jalad professionaalse hooldusega...' },
        { title: 'Geelküüned', description: 'Stiilsed ja vastupidavad geelküüned...' },
        { title: 'Ripsmed/kulmud', description: 'Rõhuta oma pilku ripsmete ja kulmude kujundamisega...' },
        { title: 'Püsimeik', description: 'Säästa hommikuti aega püsiva meigiga...' },
        { title: 'Näohooldus', description: 'Värskenda ja turguta oma nahka professionaalse näohooldusega...' }
      ],
      rightServices: [
        { title: 'Soengud', description: 'Leia endale uus soeng, mis toob esile sinu parimad jooned...' },
        { title: 'Lõikused', description: 'Pakume erinevaid lõikuseid vastavalt sinu soovile...' },
        { title: 'Hooldused', description: 'Juuksehooldused, mis taastavad sära ja elujõu...' },
        { title: 'Värvimine', description: 'Professionaalne juuksevärvimine vastavalt sinu stiilile...' }
      ],
      images: [
        require('@/assets/images/varasem-töö-1.png'),
        require('@/assets/images/varasem-töö-4.png'),
        require('@/assets/images/varasem-töö-2.png'),
        require('@/assets/images/varasem-töö-5.png'),
        require('@/assets/images/varasem-töö-3.png'),
        require('@/assets/images/varasem-töö-6.png')
      ]
    };
  }
};
</script>


<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

body {
  font-family: 'Playfair Display', serif;
  color: black;
  background-color: #fff;
}

.container {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Hero Image */
.esimene-pilt {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

/* Welcome Section */
.vahetekst {
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  color: #555554;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 50px;

  h2 {
    font-family: 'Tangerine', serif;
    font-size: 50px;
    font-weight: 900;
    color: #E6C36A;
    margin: 20px 0 20px;
    padding-top: 10px;
  }

  .divider {
    width: 1200px;
    height: 1px;
    background-color: #E6C36A;
    margin: 0 auto 50px;
    border-radius: 2px;
  }

  .tekst-ja-pilt {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-top: 60px;
    text-align: left;
  }

  .pildi-container img {
    width: 300px;
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .teksti-container {
    max-width: 700px;
  }

  h3 {
    font-size: 25px;
    font-weight: 500;
    color: #E6C36A;
    padding-bottom: 10px;
  }

  @media (max-width: 768px) {
    .tekst-ja-pilt {
      flex-direction: column;
      text-align: center;
    }

    .teksti-container {
      max-width: 90%;
    }
  }
}

/* Services Section */
.teenuste-nimekirja-taust {
  background-color: #96b2a2;
  padding: 50px 20px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  color: #333;

  .teenused-pealkiri {
    text-align: center;
    font-family: 'Tangerine', serif;
    font-size: 60px;
    color: #02512B;
    margin: 10px 0 20px;
  }

  .teenuste-nimekiri-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 150px;
    max-width: 1000px;
    margin: 0 auto 20px;
  }

  .teenuste-nimekiri {
    flex: 1;
    text-align: center;
    font-size: 15px;
    font-family: 'Playfair Display', serif;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 30px;

    h2 {
      font-family: 'Tangerine', serif;
      font-size: 50px;
      font-weight: bold;
      color: #02512B;
      margin: 20px 0 10px;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #02512B;
      margin-bottom: 10px;
    }

    .service {
      background-color: #f6f9f8;
      color: #02512B;
      border-radius: 12px;
      padding: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      font-size: 14px;
      transition: background-color 0.3s, color 0.3s;
      width: 100%;

      &:hover {
        background-color: #02512B;
        color: white;

        h3 {
          color: white;
        }
      }
    }
  }

  .divider2 {
    width: 1px;
    background-color: #02512B;
    height: 760px;
    margin: 40px 30px;
  }

  .broneeri-nupp-container {
    display: flex;
    justify-content: center;
  }

  .broneeri-nupp {
    background-color: white;
    color: #02512b;
    padding: 10px 25px;
    border: 1px solid #02512b;
    border-radius: 30px;
    font-family: 'Tangerine', serif;
    font-size: 32px;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #02512b;
      color: white;
    }
  }
}

/* Gallery Section */
.kollaaž-galerii {
  columns: 3 300px;
  column-gap: 15px;
  padding: 20px;
  margin-top: 40px;

  .kollaaž-item {
    break-inside: avoid;
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
}
</style>
