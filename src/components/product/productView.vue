<template>
<div class="messageGroup">
  <div class="container">
      <div class="row mb-3 text-left">
        <div class="col-md-6">
           <div> User Id : {{message.userID}}</div>
           <div> Mail Received at : {{moment(message.createdAt).format('HH:mm')}} - {{moment(message.createdAt).format('MMMM Do YYYY')}}</div>
            Mail Content: <div> {{message.content}}</div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import http from '../../helper/axois'

export default {
  name: 'messages',
  data () {
    return {
      message: []
    }
  },
  created () {
    http.get('/messages/' + this.$route.params.messageId)
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/users')
        } else if (res.status === 204) {
          this.showAlert()
        } else {
          console.log(res.data)
          this.message = res.data.result
        }
      })
      .then(
        http.patch('/messages/' + this.$route.params.messageId, {read: true})
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          }))
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messageGroup{
  height: 100vh;
  padding-top: 20vh;
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
.cursor{
  cursor: pointer;
}
</style>
