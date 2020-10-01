const app = new Vue(
    {
        el: '#app',
        data: {
            products: [],
            api: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
            isVisibleCart: false,
            cartData: '',
            searchLine:'',
            showedProducts:[],
            cartGoods:[],
        },
        methods: {
            fetchProducts(url){
                return fetch(`${url}catalogData.json`)
                    .then(answer => answer.json())
                    .catch(error => console.log(error));
            },
            filterGoods(){
                if (this.searchLine) {
                    this.showedProducts = this.products.filter(value => value.product_name.toLowerCase().includes(this.searchLine))
                } else {
                    this.showedProducts = this.products;
                }
            },
        },
        mounted() {
            this.fetchProducts(this.api)
                .then(data => {
                    this.products = [...data]; 
                    this.showedProducts = [...data];
                });
        },
    }   
)