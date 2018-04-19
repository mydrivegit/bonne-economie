<template>
<div class="productGroup">
  <div class="container">
  <div class="card">
      <div class="row">
          <aside class="col-sm-5 border-right">
              <article class="gallery-wrap">
                  <div class="img-big-wrap">
                    <div><img :src="loadImg(product.productImage)"></div>
                  </div>
              </article>
          </aside>
          <aside class="col-sm-7">
            <article class="card-body-lg">
                <h3 class="title mb-3">{{ product.title }}</h3>
                <p class="price-detail-wrap">
                    <span class="price h3 text-warning">
                        <span class="num">{{ product.price }}</span>
                        <span class="currency"> €</span>
                    </span>
                </p><!-- price-detail-wrap .// -->
              <dl class="item-property">
                <dt>Description</dt>
                  <dd>
                    <p>{{ product.description}}</p>
                </dd>
              </dl>
              <hr>
            </article> <!-- card-body.// -->
          </aside> <!-- col.// -->
    </div>
</div> <!-- card.// -->
</div>
<!--container.//-->
</div>
</template>

<script>
import http from '../../helper/axois'

export default {
  data () {
    return {
      product: []
    }
  },
  beforeCreate () {
    http
      .get('/product/' + this.$route.params.productId)
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token')
          this.$router.push({name: 'product'})
        } else {
          this.product = res.data.result
        }
      })
      .catch(error => {
        console.log(error)
        if (error.status === 500) {
          this.$slots('Please click the product to view the detail')
          this.$router.push({ name: 'product' })
        }
      })
  },
  methods: {
    loadImg (path) {
      if (path) return 'http://localhost:3000/' + path
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.productGroup {
  height: 100vh;
  padding-top: 20vh;
  margin: auto;
  background-color: rgb(204, 211, 209);
  overflow: hidden;
  text-align: center;
}
.productCard {
  margin: auto;
  width: 18rem;
  text-align: left;
}
.cursor {
  cursor: pointer;
}
.gallery-wrap .img-big-wrap img {
    height: 450px;
    width: auto;
    display: inline-block;
    cursor: zoom-in;
}
</style>
