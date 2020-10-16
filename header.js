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
        <input type="text" v-model='searchLine'  @input='$parent.$emit("filtergoods", searchLine)' placeholder='Найти товар...'>
    </div>
    `
})

Vue.component('cart',{
    props:['cartitems','addproduct'],
    data(){
        return {
            isVisibleCart: false,
        }
    },
    methods: {
        calculateCart() {
            let totalPrice = null;
            this.cartitems.forEach(el => {
                totalPrice += el.count * el.price;
            });
            return totalPrice;
        },
        deleteItem(id) {
           const curElement = this.cartitems.find(el => el.id_product == id);
           if (curElement.count == 1) {
               this.cartitems.splice(this.cartitems.indexOf(curElement), 1);
           } else {
                --curElement.count;
           }
        }
    },
    template: `
    <div class="cart_content">
        <button class="btn-cart" type="button" @click='isVisibleCart = !isVisibleCart'>Корзина</button>
        <div class="cart" v-if='isVisibleCart'>
            <p v-if='!cartitems.length'>Пусто</p>
            <div class='cart_item' v-for="item of cartitems" :key='item.id_product'>
                <div class='cart_item_info'>
                    <p class='cart_item_name'>{{item.product_name}}</p>
                    <p type='number' class='cart_item_count' @input='$parent.$emit("addproduct",item)'>Количество: {{ item.count }}</p>
                    <p class='cart_item_price'>Стоимость: {{item.count * item.price}}</p>
                </div>
                <button @click='deleteItem(item.id_product)'>Удалить</button>
            </div>
            <p v-if='cartitems.length'>Итого: {{calculateCart()}}</p>
        </div>
    </div>
    `
})
