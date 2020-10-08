Vue.component('products-comp',{
    props:['showed','addproduct'],
    template: ` <div class="products">
                    <div v-for="product of showed" :key='product.id_product' class="product-item">
                        <img :src="product.img" alt="some img">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}}</p>
                        <button class="buy-btn" :id="product.id_product" @click='$emit("addproduct",product)'>Купить</button>
                    </div>
                </div>
`
})