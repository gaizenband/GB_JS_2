const imgPath = '../img/';
const productsBlock = document.querySelector('.products');

const products = [
    {id: 1, title: 'Notebook', price: 2000, img: imgPath+'notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20, img: imgPath+'2nd.jpg'},
    {id: 3, title: 'Keyboard', price: 200, img: imgPath+'3rd.jpg'},
    {id: 4, title: 'Gamepad', price: 50, img: imgPath+'4th.jpg'},
];

//Функция для формирования верстки каждого товара
const renderProduct = (obj) => {
    return `<div class="product-item">
                <h3>${obj.title}</h3>
                <img src=${obj.img}>
                <p>${obj.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));

    productsList.forEach(element => {
        productsBlock.innerHTML += element;
    });

};

renderPage(products);