var productsDB = productsBase; //название переменной хранящей массив товаров

function myInitPage() {
    console.log('Загрузка завершена!');

    //Добавляем товары в корзину
    ProductCart_Model.addProductToCart(1);
    ProductCart_Model.addProductToCart(3);
    ProductCart_Model.addProductToCart(6);

    Checkout_View.init();

}

window.addEventListener('load', myInitPage);

function consoleLogCheckMessage(_strValue, _value) {
    console.log(_strValue + ' = ' +_value);
}
