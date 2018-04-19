<template>
  <div class="navposition col-md-2">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <router-link class="nav-link active cursor" tag="li" data-toggle="pill" role="tab" :to="{name:'myProductList'}">Listed's</router-link>
        <router-link class="nav-link cursor" tag="li" data-toggle="pill" role="tab" :to="{name: 'newProduct'}">Add Products</router-link>
        <router-link class="nav-link cursor" tag="li" data-toggle="pill" role="tab" :to="{name: 'userProfile'}">Edit Profile</router-link>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.navposition {
  position: fixed;
  padding-top: 10vh;
}
.cursor{
  cursor: pointer;
}

</style>
