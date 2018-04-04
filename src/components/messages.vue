<template>
<div class="messageGroup"> List of your Messges
  <div class="container">
    <div class="card messageCard"
      v-for="message in messages"
      :key="message._id">
    <div class="card-body">
      <h5 class="card-title">Sender Name /User ID : {{message.username|| message.userID}}</h5>
      <h6 class="card-subtitle mb-2"> Subject: {{message.title}}</h6>
      <p class="card-text">Message : {{message.content}}</p>
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
  name: 'messages',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    showAlert () {
      this.$swal('Your inbox is empty')
    }
  },
  created () {
    http.get('/messages')
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/users')
        } else if (res.status === 204) {
          this.showAlert()
        } else {
          this.messages = res.data
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
.messageGroup{
  height: 100%;
  padding-top: 10vh;
  margin: auto;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
  text-align: center;
}
.messageCard{
  margin: auto;
  width: 18rem;
  text-align: left;
}
</style>
