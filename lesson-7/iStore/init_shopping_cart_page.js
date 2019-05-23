var productsDB = productsBase; //название переменной хранящей массив товаров

function myInitPage() {
    console.log('Загрузка завершена!');
    //Добавляем товары в корзину
    //ProductCart_Model.addProductToCart(1);
    // productCart.addProductToCart('002',8);
    // productCart.addProductToCart('003',6);

    ProductCart_View.init();

    Catalog_View.init();
}

window.addEventListener('load', myInitPage);

function consoleLogCheckMessage(_strValue, _value) {
    console.log(_strValue + ' = ' +_value);
}
