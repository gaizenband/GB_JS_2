Vue.component('header-comp',{
    props:['cartitems','addproduct'],
    template: ` <div class="head">
                    <h1>Shop</h1>
                    <div class="head_content">
                        <search></search>
                        <cart :cartitems = 'cartitems' :addproduct='addproduct'></cart>
                    </div>
                </div>
`
})

Vue.component('search',{
    data(){
        return {
            searchLine:'',
        }
    },
    template: `
    <div class="find_content">
        <input type="text" v-model='searchLine'  @input='$parent.$emit("filtergoods", searchLine)'>
    </div>
    `
})

Vue.component('cart',{
    props:['cartitems','addproduct'],
    data(){
        return {
            isVisibleCart: false,
            totalPrice: null,
        }
    },
    template: `
    <div class="cart_content">
        <button class="btn-cart" type="button" @click='isVisibleCart = !isVisibleCart'>Корзина</button>
        <div class="cart" v-if='isVisibleCart'>
            <p v-if='!cartitems.length'>Пусто</p>
            <div class='cart_item' v-for="item of cartitems" :key='item.id_product'>
                <p class='cart_item_name'>{{item.product_name}}</p>
                <div class='cart_item_info'>
                    <p type='number' class='cart_item_count' @input='$parent.$emit("addproduct",item)'>{{ item.count }}</p>
                    <p class='cart_item_price'>{{item.count * item.price}}</p>
                </div>
                <button>Удалить</button>
            </div>
        </div>
    </div>
    `
})
