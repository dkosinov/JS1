var productsDB = productsBase; //название переменной хранящей массив товаров

function myInitPage() {
    console.log('Загрузка завершена!');



    //Добавляем товары в корзину
    ProductCart_Model.addProductToCart(1);
    // productCart.addProductToCart('002',8);
    // productCart.addProductToCart('003',6);

    //выводим карзину на страничку
    ProductCart_View.loadCartProductListInPage();
    console.log('Корзина загружена');
    //выводим каталог на страничку
    Catalog_View.loadCatalogInPage();
}

window.addEventListener('load', myInitPage);

function consoleLogCheckMessage(_strValue, _value) {
    console.log(_strValue + ' = ' +_value);
}
