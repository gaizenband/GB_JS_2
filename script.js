const app = new Vue(
    {
        el: '#app',
        data: {
            products: [],
            api: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
            cartData: '',     
            showedProducts:[],
            cartGoods:[],
        },
        methods: {
            fetchProducts(url){
                return fetch(`${url}catalogData.json`)
                    .then(answer => answer.json())
                    .catch(error => console.log(error));
            },
            filterGoods(searchLine){
                if (searchLine) {
                    this.showedProducts = this.products.filter(value => value.product_name.toLowerCase().includes(searchLine))
                } else {
                    this.showedProducts = this.products;
                }
            },
            createImg(){
                this.products.forEach(element => {
                    element.img = 'https://picsum.photos/300/200';
                });
                this.showedProducts = this.products;
            },
            addProduct(item){
                let thisElement = this.cartGoods.find(item => item.id == id);
                if (!thisElement) {
                    this.cartGoods.push(item);
                } else {
                    ++this.cartGoods.item.count;
                }
            }
        },
        mounted() {
            this.fetchProducts(this.api)
                .then(data => {
                    this.products = [...data];
                    this.createImg();

                });
            
        },
    }   
)