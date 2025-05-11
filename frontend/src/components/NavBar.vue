<template>
  <nav class="navbar">
    <ul class="nav-side left">
      <li><router-link to="/arvustused">ARVUSTUSED</router-link></li>
      <li><router-link to="/meist">MEIST</router-link></li>
    </ul>

    <div class="logo">
      <router-link to="/">
        <img src="@/assets/images/logo.png" alt="Logo" />
      </router-link>
    </div>

    <ul class="nav-side right">
      <li><router-link to="/broneeri">BRONEERI</router-link></li>
      <li><router-link to="/teenused">TEENUSED</router-link></li>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-bottom: 0px;
  font-family: 'Quicksand', sans-serif;
  position: sticky;
}

.nav-side {
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.logo {
  flex-shrink: 0;
}

.logo img {
  width: 110px;
}

/* Ühine linkide stiil */
.nav-side a {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 15px;
  transition: color 0.3s;
}

.nav-side a:hover {
  color: #E6C36A;
  text-decoration: underline;
}


  </style>
  