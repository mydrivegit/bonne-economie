<template>
<div class="productGroup">
  <div class="container col-md-8">
    <span class="title"> Your Product List</span>
    <table class="table table-sm table-condensed table-hover cursor"
    >
      <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Title of Product</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
      <tbody @click="productView(product._id)"
      v-for="product in productsRev"
    :key="product._id">
        <tr>
          <th scope="row" ><img :src="loadImg(product.productImage)"  height="100" width="100" class="img-thumbnail"></th>
          <td><strong>{{ product.title }}</strong></td>
          <td ><strong>{{ product.description }}</strong></td>
          <td ><strong>{{ product.price }}<span class="currency"> €</span></strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import http from '../../helper/axois'

export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    showAlert () {
      this.$swal('No Product is listed')
    },
    productView (arg) {
      this.$router.push({ name: 'productView', params: { productId: arg } })
    },
    loadImg (path) {
      if (path) return 'http://localhost:3000/' + path
    }
  },
  computed: {
    productsRev () {
      return this.products.slice().reverse()
    }
  },
  created () {
    http.get('/product')
      .then(res => {
        if (res.status === 204) {
          this.showAlert()
        } else {
          this.products = res.data
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
.productGroup{
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
.productReaded{
  background-color: rgb(189, 195, 193);
  }
</style>
