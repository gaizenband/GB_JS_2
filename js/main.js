const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';



class ProductsList{
    constructor(container = '.products'){
        this._showCart();
        this.container = container;
        this.goods = [];
        this.price = null;
        this._fetchProducts()
        .then(answer => {
            this.goods = answer;
            this.render();
            this._addToCart();
            this._totalPrice();
        });
    }
    
    _fetchProducts(){
        return fetch(`${API}catalogData.json`)
            .then(answer => answer.json())
            .catch(error => console.log(error));
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
    }

    _totalPrice(){
        this.goods.forEach(item => this.price += +item.price);
        console.log(this.price);
    }

    _addToCart(){
        let cartList = new Cart();
        const buyBtn = document.querySelectorAll('.buy-btn');
        buyBtn.forEach(item => item.addEventListener('click', () => cartList._cartAddItem(item.id)));
    }

    _showCart() {
        const btn = document.querySelector('.btn-cart');
        const cart = document.querySelector('.cart');
        cart.innerHTML = 'Пусто';
        cart.style.display = 'none';

        btn.addEventListener ('click', () => {
            if (cart.style.display == 'none') {
                cart.style.display = 'block';
            } else {
                cart.style.display = 'none';
            }
        });
    }
}

class ProductItem{
     constructor(product){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = 'https://picsum.photos/300/200'; 
    }
    
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn" id="${this.id}">Купить</button>
            </div>`
    }
}

class Cart {
    constructor(container = '.cart'){
        this.container = container;
        this.cart = [];
        this.price = null;
    }

    _cartAddItem(id){
        let thisElement = this.cart.find(item => item.id_product == id);
        console.log(id)
        if(!thisElement) {
            this.cart.push(list.goods.find(item => item.id_product == id));
            this.calcSum();
            this.render();
            this._delButns();
        }
    }

    render(){
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        for(let item of this.cart){
            const productObj = new cartItem(item);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
        if (this.price){
            block.insertAdjacentHTML('beforeend', `<p id='cartPrice'>Total price: ${this.price}</p>`);
        } else {
            block.innerHTML = 'Пусто';
        }

    }

    calcSum(){
        this.price = null;
        this.cart.forEach(item => this.price += +item.price);
    }

    _cartRemoveItem(id){
        let itemIndex = this.cart.indexOf(this.cart.find(item => item.id_product == id))

        this.cart.splice(itemIndex,1);
        this.calcSum();
        this.render();
        this._delButns();

    }

    _delButns() {
        const delBtn = document.querySelectorAll('.delBtn');
        delBtn.forEach(item => item.addEventListener('click', () => this._cartRemoveItem(item.id.substring(7))));
    }
}

class cartItem {
    constructor(product){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
    }
    
    render(){
        return `<div class="cart-item">
                    <button class='delBtn' id=delete_${this.id}>X</button>
                    <div class='cartData'>
                        <div data-id="${this.id}">
                        <h3>${this.title}</h3>
                        <p>${this.price}</p>
                    </div>
                </div>
            </div>`
    }
}


let list = new ProductsList();



