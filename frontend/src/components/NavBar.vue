<template>
    <nav class="navbar">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" alt="Logo" />
        </router-link>
      </div>
  
      <!-- Navigation Links -->
      <ul class="nav-links">
        <li><router-link to="/meist">Meist</router-link></li>
        <li><router-link to="/broneeri">Broneeri</router-link></li>
      </ul>
    </nav>
  </template>
  
<script>
export default {
  name: 'NavBar'
}
</script>


  <style scoped>
  .navbar {
    position: sticky;
    display: flex;
    align-items: center; /* Keskendab kõik elemendid vertikaalselt */
    padding: 20px;
    margin-top: 35px; /* Lisab ruumi ülemiselt servalt */
  }
  
  .logo {
    position: absolute;
    left: 50%; /* Paigutab logo vertikaalselt keskele */
    transform: translateX(-50%); /* Veidi liigutab logo, et see oleks täpselt keskel */
  }
  
  .logo img {
    width: 100px; /* Kohanda vastavalt vajadusele */
  }
  
  .nav-links {
    list-style: none;
    padding: 100;
    display: flex;
    gap: 400px; /* Väiksem kaugus nuppude vahel */
    position: absolute;
    left: 50%; /* Paigutab nuppude keskpunkti */
    transform: translateX(-50%); /* Liigutab nuppude vahetult logost vasakule ja paremale */
  }
  
  .nav-links li {
    display: inline;
  }
  
  .nav-links a {
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 200;
    transition: color 0.3s;
    font-size: 18px;
  }
  
  .nav-links a:hover {
    color: #E6C36A;
    text-decoration: underline;
  }
  </style>
  