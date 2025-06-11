<template>
  <nav class="navbar">
    <button class="burger" @click="toggleMenu">☰</button>

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

    <ul class="mobile-menu" :class="{ open: menuOpen }">
      <li><router-link to="/arvustused" @click="closeMenu">ARVUSTUSED</router-link></li>
      <li><router-link to="/meist" @click="closeMenu">MEIST</router-link></li>
      <li><router-link to="/broneeri" @click="closeMenu">BRONEERI</router-link></li>
      <li><router-link to="/teenused" @click="closeMenu">TEENUSED</router-link></li>
    </ul>
  </nav>
</template>



  <script>
export default {
  name: 'NavBar',
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  padding: 10px 20px;
  top: 0;
  background: white;
  z-index: 1000;
}

.nav-side {
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-side.left {
  margin-right: auto;
}

.nav-side.right {
  margin-left: auto;
}

.logo {
  flex-shrink: 0;
}

.logo img {
  width: 100px;
}

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

.burger {
  display: none;
  font-size: 26px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .nav-side {
    display: none;
  }

  .burger {
    display: block;
  }

  .logo {
    margin: 0 auto;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    background: white;
    gap: 20px;
    padding: 20px;
    list-style: none;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .mobile-menu li {
    text-align: center;
  }

  .mobile-menu a {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
  }

  .mobile-menu a:hover {
    color: #E6C36A;
    text-decoration: underline;
  }

  .mobile-menu:not(.open) {
    display: none;
  }
}
</style>
