<template>
<div class="userGroup"> List of users
  <div class="container">
    <div class="card userCard"
      v-for="user in users"
      :key="user._id">
    <div class="card-body card-body-sm">
      <h6 class="card-subtitle">{{user.firstName}} - {{user._id}}</h6>
      <!-- <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a> -->
    </div>
    </div>
  </div>
</div>
</template>

<script>
import http from '../helper/axois'

export default {
  data () {
    return {
      users: []
    }
  },
  created () {
    http.get('/users')
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/login')
        } else {
          this.users = res.data.content
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userGroup{
  height: 100%;
  padding-top: 10vh;
  margin: auto;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
  text-align: center;
}
.userCard{
  margin: auto;
  width: 18rem;
  text-align: left;
}
</style>
