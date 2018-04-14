<template>
<div class="messageGroup">
  <div class="container">
    <table class="table table-sm table-condensed table-hover cursor"
    >
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">From</th>
      <th scope="col">Subject</th>
      <th scope="col">Received on</th>
    </tr>
  </thead>
      <tbody @click="messageView(message._id)"
      v-for="message in messagesRev"
    :key="message._id">
        <tr :class="[{'messageReaded': message.read}]">
          <th scope="row"><input type="checkbox"> <a href="#"><i ></i></a></th>
          <td ><strong>{{ message.userID }}</strong></td>
          <td><strong>{{ message.title }}</strong></td>
          <td>{{moment(message.createdAt).format('HH:mm')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import http from '../../helper/axois'

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
    },
    messageView (arg) {
      this.$router.push({ name: 'messageView', params: { messageId: arg } })
    }
  },
  computed: {
    messagesRev () {
      return this.messages.slice().reverse()
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
          console.log(res.data)
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
  padding-top: 7vh;
  margin: auto;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
  text-align: left;
}
.cursor{
  cursor: pointer;
}
.messageReaded{
  background-color: rgb(189, 195, 193);
  }
</style>
