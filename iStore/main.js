function myInitPage() {
    console.log('Загрузка завершена!');

    //Добавляем товары в корзину
    //objCart.addProductToCart('001',3);
    // objCart.addProductToCart('002',8);
    // objCart.addProductToCart('003',6);

    //вызов функции вывода карзины в страницу
    objCart.loadCartProductListInPage();

    objCatalog.loadCatalogInPage();
}

window.addEventListener('load', myInitPage);

function getProductRatingHTML (_thisProductRating) {
    var ratingHTML = '';
    var maxRating = 5;
    for (var j = 0; j < maxRating; j++) {
        if (j < _thisProductRating) {
            ratingHTML += '<div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>\n'
            //если пустые звёздочки должны отображатьса, то раскоментить
            // } else {
            //     ratingHTML += '<div class="stars__star"><i class="fas fa-star"></i></div>\n'
        }
    }
    return ratingHTML;
}
