<template>
<NavBar />
  <div>
    <div class="pilt">
      <img src="../assets/images/natali&renata.png" />
    </div>
    <h2>Räägime meist!</h2>
    <p>Me oleme Renata ja Natali.</p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'MeistInfo',
  components:{
    NavBar
  }
}
</script>

<style scoped lang="scss">

.pilt img{
  margin-top: 30px;
  width: 90%;
  display: center;
}

</style>