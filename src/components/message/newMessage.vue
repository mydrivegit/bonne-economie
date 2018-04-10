<template>
<div class="newmessage-body">
  <div class="container">
        <form class="form-horizontal" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <h2>New messages</h2>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only">Enter the username to whom you want to send the message</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control"
                            v-model="message._id" placeholder="userId">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only">Please enter the Subject</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control"
                            v-model="message.title" placeholder="Subject" required autofocus>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group ">
                        <label class="sr-only">Enter your message here</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <textarea class="form-control" rows="5" v-model="message.content"
                            placeholder="Message" required></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group btn-group mr-sm-2 mb-sm-0">
                        <button class="form-control btn btn-outline-secondary">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import http from '../../helper/axois'

export default {
  data () {
    return {
      message: {
        title: '',
        content: '',
        _id: ''
      },
      user: []
    }
  },
  methods: {
    submit () {
      http.post('/messages', this.message)
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem('token')
            this.$router.push('/users')
          } else if (res.data.success === true) {
            this.$router.push('/messages')
            alert('Message send sucessfully')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    http.get('/users/' + this.$route.params.userid)
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
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newmessage-body{
  height: 100vh;
  padding-top: 20vh;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
}
.btn{
    background-color: rgb(96, 195, 157);
}
</style>
