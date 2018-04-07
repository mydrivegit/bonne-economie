<template>
<div class="userGroup">
      <div class="container col-md-3 userCard">My account Details
        <form class="form-horizontal" @submit.prevent="enter">
            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="form-inline">
                        <label  class="form-group text-left col-md-6 text-nowrap">First name</label>
                        <div class="form-group col-md-6">
                            <input v-if="show" type="text" class="form-control form-control-sm"
                            v-model="users.firstName" autofocus>
                            <div v-else type="text">{{users.firstName}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                  <div class="col-md-12">
                    <div class="form-inline">
                        <label class="form-group text-left col-md-6 text-nowrap">Last name</label>
                        <div class="form-group col-md-6">
                            <input v-if="show" type="text" class="form-control form-control-sm"
                            v-model="users.lastName">
                            <div v-else type="text">{{users.lastName}}</div>
                        </div>
                  </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="form-inline">
                        <label class="form-group text-left col-md-6">Username</label>
                        <div class="form-group col-md-6">
                             <input v-if="show" type="text" class="form-control form-control-sm"
                            v-model="users.username">
                            <div v-else type="text">{{users.username}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6" v-if="show">
                    <div class="form-group">
                        <div class="input-group btn-group">
                        <input type="button" class="col-md-12 form-control btn btn-sm btn-outline-secondary" value="Modify" @click="show=!show">
                        </div>
                    </div>
                </div>
                <div class="col-md-12 " v-else>
                    <div class="form-group">
                        <div class="input-group btn-group">
                        <input type="button" class="col-md-12 form-control btn btn-sm btn-outline-secondary" value="Modify" @click="show=!show">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group btn-group">
                        <button  v-if="show" class="form-control btn btn-sm btn-outline-secondary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <hr>
        <form @submit.prevent="removeUser">
          <div class="row">
              <div class="form-group col-md-12">
                   <button class="form-control btn btn-outline-secondary">Delete my account</button>
              </div>
          </div>
        </form>
    </div>
</div>
</template>

<script>
import http from '../helper/axois'

export default {
  data () {
    return {
      users: [],
      show: false
    }
  },
  created () {
    http.get('/users/profile')
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/users')
        } else {
          this.users = res.data.doc[0]
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    enter () {
      http.patch('/users', this.users)
        .then(res => {
          if (res.data) {
            alert('User details altered Succesfully')
            this.$router.push('/users')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeUser () {
      http.delete('/users')
        .then(res => {
          if (res.data) {
            http.delete('/messages')
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log(err)
              })
            alert('User is deleted Succesdully')
            localStorage.removeItem('token')
            this.$router.push('/users')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userGroup{
  height: 100vh;
  padding-top: 10vh;
  margin: auto;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
  text-align: center;
}

</style>
