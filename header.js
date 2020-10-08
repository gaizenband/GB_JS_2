Vue.component('header-comp',{
    props:['cartitems'],
    template: ` <div class="head">
                    <h1>Shop</h1>
                    <div class="head_content">
                        <search></search>
                        <cart :cartitems = 'cartitems'></cart>
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
    props:['cartitems'],
    data(){
        return {
            isVisibleCart: false,
        }
    },
    template: `
    <div class="cart_content">
        <button class="btn-cart" type="button" @click='isVisibleCart = !isVisibleCart'>Корзина</button>
        <div class="cart" v-if='isVisibleCart'>
            <p v-if='!cartitems.length'>Пусто</p>
        </div>
    </div>
    `
})
