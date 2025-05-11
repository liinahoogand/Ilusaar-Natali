<template>
    <footer class="footer">
      <div class="footer-overlay"></div>
      <div class="footer-content">
        <!-- Column 1: Logo -->
        <div class="footer-logo-col">
          <h2 class="footer-logo">Ilusaar & Natali</h2>
        </div>
  
        <!-- Column 2: Contact & Hours -->
        <div class="footer-middle-col">
          <h2 class="footer-heading">Kontaktid:</h2>
          <div class="footer-contact-block">
            <p class="font-semibold">Renata</p>
            <p>tel: 56470667</p>
            <p>meil: ilusaar.delightful@gmail.com</p>
          </div>
          <div class="footer-contact-block">
            <p class="font-semibold">Natali</p>
            <p>tel: 5555555555</p>
            <p>meil: email@gmail.com</p>
          </div>
          <h2 class="footer-heading mt-6">Lahtiolekuajad:</h2>
          <p>P–E: SULETUD</p>
          <p>T–L: 9.00 - 17.00</p>
        </div>
  
        <!-- Column 3: Address + Map -->
        <div class="footer-right-col">
          <h2 class="footer-heading">Asukoht:</h2>
          <p>Kuressaare, Kohtu 1</p>
          <div class="footer-map">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d524.8366394402339!2d22.483659932892355!3d58.25255668308892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46f26d1d84cc1ccd%3A0x30d992ddf24384ba!2sKohtu%20tn%201a%2C%20Kuressaare%2C%2093819%20Saare%20maakond!5e0!3m2!1set!2see!4v1744802481670!5m2!1set!2see" 
            width="400" 
            height="300" 
            style="border:0; filter: invert(90%)"
            allowfullscreen="true" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

      </div>
    </footer>
  </template>
  
  

  <style scoped>
.footer {
  position: relative;
  background-image: url('@/assets/images/footer-taust.jpg'); /* või kuhu pilt salvestatud */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px 20px;
  display: flex;
  align-items: center; /* Vertikaalselt keskel */
  justify-content: center; /* Horisontaalselt keskel */
  margin-top: 50px;
}

.footer-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Poolläbipaistev must kiht */
  z-index: 1;
}

.footer-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr; /* Võid muuta suhet, et veerud nihkuksid */
  max-width: 1200px;
  margin: 0 auto;
  gap: 50px;
  align-items: start;
}

.footer-logo-col {
  display: flex;
  justify-content: center; /* Horisontaalselt keskel */
  align-items: center; /* Vertikaalselt keskel */
  height: 100%;
}

.footer-logo {
  font-family: 'Tangerine', serif;
  font-size: 50px;
  font-weight: bold;
  color: white;
  margin-top: 0;
}

.footer-middle-col {
  justify-self: end; /* Nihutab keskmise veeru paremale */
}

.footer-right-col {
  justify-self: end; /* Nihutab parema veeru veel rohkem paremale */
}

.footer-heading {
  font-weight: bold;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom:20px;
}

.footer-contact-block {
  margin-bottom: 20px;
}

.footer-contact-block p {
  font-size: 14px; /* Väiksem suurus tavatekstile */
}

  </style>
  