<template>
<div class="b">
  <div class="a">
      <div><h1 class="d" > </h1></div>
  </div>
  <div class="container">
        <form class="form-horizontal" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <h2>Sign Up</h2>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="sr-only" for="email">Enter your First name</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control text-center"
                            v-model="user.firstName" placeholder="First Name" autofocus>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="sr-only" for="email">Enter your last name</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control text-center"
                            v-model="user.lastName" placeholder="Last Name">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only" for="email">E-Mail Address</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control text-center"
                            v-model="user.username" placeholder="Username" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group ">
                        <label class="sr-only" for="password">Password</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="password" class="form-control text-center"
                            v-model="user.password" placeholder="Password" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group btn-group mr-sm-2 mb-sm-0">
                        <button class="form-control btn btn-outline-secondary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-center"><span style=" color:  rgb(47, 90, 78);">Do you have an account already?</span>
                <a @click="navigateToLogin" style=" color: rgb(96, 195, 157); cursor: pointer">Click here to Sign-In</a></p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('signup', this.user)
        .then(res => {
          if (res.status === 201) {
            this.$router.push('/login')
            this.$swal('Account created Succesfully : please login')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Username already exist')
        })
    },
    navigateToLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.b{
  width: 100%;
  height: 100vh;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
}
.a{
  height: 40vh;
  width: 140vw;
  background-color: rgb(96, 195, 157);
  transform: rotate(-5deg);
  -webkit-transform: rotate(-5deg);
  -moz-transform: rotate(-5deg);
  position: relative;
  top: -100px;
  left: -20px;
  -webkit-box-shadow: 10px 10px 105px 12px rgba(181,181,181,1);
  -moz-box-shadow: 10px 10px 105px 12px rgba(181,181,181,1);
  box-shadow: 10px 10px 105px 12px rgba(181,181,181,1);
}
.d{
    position: relative;
    font-family: "Comfortaa", cursive;
    font-weight: bolder;
    font-size: 6vh;
    top:30vh;
    left: 60vh;
    color: rgb(218, 247, 236);
    transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
}
.form-group, input{
    background-color: rgb(204, 211, 209);
}
.btn{
    background-color: rgb(96, 195, 157);;
}
</style>
