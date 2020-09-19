const delButns = () => {
    const delBtn = document.querySelectorAll('.delBtn');
    delBtn.forEach(item => item.addEventListener('click', () => cartList._cartRemoveItem(item.id.substring(7))));
}


class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.price = null;
        this._fetchProducts();
        this._totalPrice();
    }
    
    _fetchProducts(){
        this.imgPath = '../img/'
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000, img: this.imgPath+'notebook.jpg'},
            {id: 2, title: 'Mouse', price: 20, img: this.imgPath+'2nd.jpg'},
            {id: 3, title: 'Keyboard', price: 200, img: this.imgPath+'3rd.jpg'},
            {id: 4, title: 'Gamepad', price: 50, img: this.imgPath+'4th.jpg'},
        ];
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
    }
}

class ProductItem{
     constructor(product){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img; 
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
    }

    _cartAddItem(id){
        let thisElement = this.cart.find(item => item.id == id);

        if(!thisElement) {
            this.cart.push(list.goods.find(item => item.id == id));
            this.calcSum();
            this.render();
            delButns();
        }
    }

    render(){
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        for(let item of this.cart){
            const productObj = new cartItem(item);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
        block.insertAdjacentHTML('beforeend', `<p id='cartPrice'>Total price: ${this.price}</p>`);
    }

    calcSum(){
        this.price = null;
        this.cart.forEach(item => this.price += +item.price);
    }

    _cartRemoveItem(id){
        let itemIndex = this.cart.indexOf(this.cart.find(item => item.id == id))
        this.cart.splice(itemIndex,1);
        this.calcSum();
        this.render();
    }
}

class cartItem {
    constructor(product){
        this.title = product.title;
        this.id = product.id;
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
list.render();

let cartList = new Cart();
const buyBtn = document.querySelectorAll('.buy-btn');
buyBtn.forEach(item => item.addEventListener('click', () => cartList._cartAddItem(item.id)));

