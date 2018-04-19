<template>
  <div>
        <form class="form-horizontal" enctype="multipart/form-data" @submit.prevent="submit" >
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <h2>Add New Product
                    </h2>
                    <hr>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only">Title of your product</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control"
                            v-model="product.title" placeholder="Title" required autofocus>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only">Product price</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="number" class="form-control"
                            v-model="product.price" placeholder="Price" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label class="sr-only">File input</label>
                    <button raised class="btn btn-sm btn-secondary"
                    @click="onPickFile">Upload Image</button>
                    <input type="file"
                    style="display:none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onPickedFile">
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group ">
                        <label class="sr-only">Description of your product</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <img :src="product.image" height="100">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group ">
                        <label class="sr-only">Description of your product</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <textarea class="form-control" rows="5" v-model="product.description"
                            placeholder="Description" required></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only">City</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="text" class="form-control"
                            v-model="product.city" placeholder="City">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only">Pincode</label>
                        <div class="input-group mr-sm-2 mb-sm-0">
                            <input type="number" class="form-control"
                            v-model="product.pincode" placeholder="Pincode">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group btn-group mr-sm-2 mb-sm-0">
                        <button class="form-control btn btn-outline-secondary">Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import http from '../../helper/axois'
// import moment from 'moment'

export default {
  data () {
    return {
      product: {
        title: '',
        description: '',
        productImage: '',
        price: '',
        city: '',
        pincode: '',
        image: ''
      }
    }
  },
  methods: {
    submit () {
      const fa = new FormData()
      fa.append('title', this.product.title)
      fa.append('description', this.product.description)
      fa.append('productImage', this.product.productImage, this.moment(Date.now()).format('SSS') + this.product.productImage.name)
      fa.append('price', this.product.price)
      fa.append('city', this.product.city)
      fa.append('pincode', this.product.pincode)
      http.post('/product', fa)
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem('token')
            this.$router.push('/users')
          } else if (res.data.success === true) {
            this.$router.push('/products')
            alert('Product added sucessfully')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onPickedFile (event) {
      this.product.productImage = event.target.files[0]
      let files = event.target.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      let reader = new FileReader()
      reader.onload = (event) => {
        this.product.image = event.target.result
      }
      reader.readAsDataURL(file)
    }
  },
  created () {
  }
}
// below code for change image into binary and upload into database
// let filename = files[0].name
//       if (filename.lastIndexOf('.') <= 0) {
//         return alert('Please add a jpg file')
//       }
//       const fileReader = new FileReader()
//       fileReader.addEventListener('load', () => {
//         this.product.productImage = fileReader.result
//       })
//       fileReader.readAsDataURL(files[0])
//       this.product.image = files[0]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newprodu-body{
  height: 100vh;
  position: fixed;
  padding-top: 20vh;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
}
.btn{
    background-color: rgb(96, 195, 157);
}
</style>
