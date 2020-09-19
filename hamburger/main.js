class Hamburgers {
    constructor(container = '.burgers'){
        this.container = container;
        this.hamburgers = [];
        this.toppings = [];
        this.dressings = [];
        this._hamburgerBuilder();
        this._toppingBuilder();
        this._dressingBuilder();
        this.renderBurgers();
        this.renderAdds();
    }

    _hamburgerBuilder(){
        this.hamburgers = [
            {id: 1, title: 'Small', price: 50, callories: 20},
            {id: 2, title: 'Big', price: 100, callories: 40},
        ];
    }

    _toppingBuilder(){
        this.toppings = [
            {id: 1, title: 'Cheese', price: 10, callories: 20},
            {id: 2, title: 'Salad', price: 20, callories: 5},
            {id: 3, title: 'Fries', price: 15, callories: 10},
        ];
    }

    _dressingBuilder(){
        this.dressings = [
            {id: 1, title: 'Pepper', price: 15, callories: 0},
            {id: 2, title: 'Mayo', price: 20, callories: 5},
        ];
    }

    renderBurgers(){
        const block = document.querySelector(this.container);
        for(let product of this.hamburgers){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
    }

    renderAdds(){
        const topping = document.querySelectorAll('.topping');
        const dressing = document.querySelectorAll('.dressing');

        for(let item of this.toppings){
            const toppingObj = new Topping(item);
            topping.forEach(item => item.insertAdjacentHTML('beforeend',toppingObj.render(item.id)));
        }
        for(let item of this.dressings){
            const dressingObj = new Dressing(item);
            dressing.forEach(item => item.insertAdjacentHTML('beforeend',dressingObj.render(item.id)));
        }
    }

    calcPrice(id){
        let total = document.querySelector(`#price_${id}`);
        let curPrice = this.hamburgers.find(item => item.id == id).price;
        let curFat = this.hamburgers.find(item => item.id == id).callories;
        let allToppings = document.querySelector(`#toppings_${id}`).childNodes;
        let allDressings = document.querySelector(`#dressings_${id}`).childNodes;


        allDressings.forEach(item => {
            item.childNodes.forEach(item => {
                if(item.nodeName == 'INPUT' && item.checked){
                    curPrice += +this.dressings.find(i => i.id == item.id.substring(9)).price;
                    curFat += +this.dressings.find(i => i.id == item.id.substring(9)).callories;
                }
            })
        })

        allToppings.forEach(item => {
            item.childNodes.forEach(item => {
                if(item.nodeName == 'INPUT' && item.checked){
                    curPrice += +this.toppings.find(i => i.id == item.id.substring(8)).price;
                    curFat += +this.toppings.find(i => i.id == item.id.substring(8)).callories;
                }
            })
        })
        total.innerHTML = `<p>Price: ${curPrice} and Callories: ${curFat}</p>`;

    }
}

class ProductItem{
    constructor(product){
       this.title = product.title;
       this.id = product.id;
       this.price = product.price;
       this.callories = product.callories; 
   }
   
   render(){
       return `     <div class='info'>
                        <div class="product-item" data-id="${this.id}">
                            <h3>${this.title}</h3>
                            <p>Price: ${this.price}</p>
                            <p>Callories: ${this.callories}</p>
                            <button class="buy-btn" id="${this.id}">Посчитать</button>
                        </div>
                    <div id='toppings_${this.id}' class='topping'></div>
                    <div id='dressings_${this.id}' class='dressing'></div>
                    <div class='price' id='price_${this.id}'></div>
                    `
   }
}

class Topping{
    constructor(product){
       this.title = product.title;
       this.id = product.id;
       this.price = product.price;
       this.callories = product.callories; 
   }
   
   render(parentId){
       return ` <div class='topping-item'>
                <input type='radio' id='topping_${this.id}' name='topping_${parentId}' value='${this.title}' class='topping_btn'>
                <label for='topping_${parentId}'>${this.title}</label>  
                </div>`
   }
}

class Dressing{
    constructor(product){
       this.title = product.title;
       this.id = product.id;
       this.price = product.price;
       this.callories = product.callories; 
   }
   
   render(parentId){
       return ` <div class='dressing-item'>
                <input type='checkbox' id='dressing_${this.id}' name='dressing_item_${parentId}' value='${this.title}'>
                <label for='dressing_item_${parentId}'>${this.title}</label>  
                </div>`
   }
}

const list = new Hamburgers;
const calc = document.querySelectorAll('.buy-btn');
calc.forEach(item => item.addEventListener('click', () => list.calcPrice(item.id)));

