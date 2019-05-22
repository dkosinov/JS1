var productsBase = [
    {
        id : 1,
        name : 'MANGO PEOPLE T-SHIRT 001',
        imgS : 'img/product/product-1.jpg',
        imgM : 'img/product/product-1.jpg',
        imgL : 'img/product/product-1.jpg',
        rating : 4,
        color : 'red',
        size : 'XIi',
        price : 700.00,
    },
    {
        id : 2,
        name : 'MANGO PEOPLE T-SHIRT 002',
        imgS : 'img/product/product-2.jpg',
        imgM : 'img/product/product-2.jpg',
        imgL : 'img/product/product-2.jpg',
        rating : 3,
        color : 'green',
        size : 'M',
        price : 870.00,
    },
    {
        id : 3,
        name : 'MANGO PEOPLE T-SHIRT 003',
        imgS : 'img/product/product-3.jpg',
        imgM : 'img/product/product-3.jpg',
        imgL : 'img/product/product-3.jpg',
        rating : 1,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },    {
        id : 4,
        name : 'MANGO PEOPLE T-SHIRT 004',
        imgS : 'img/product/product-4.jpg',
        imgM : 'img/product/product-4.jpg',
        imgL : 'img/product/product-4.jpg',
        rating : 5,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },
    {
        id : 5,
        name : 'MANGO PEOPLE T-SHIRT 005',
        imgS : 'img/product/product-5.jpg',
        imgM : 'img/product/product-5.jpg',
        imgL : 'img/product/product-5.jpg',
        rating : 1,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },
    {
        id : 6,
        name : 'MANGO PEOPLE T-SHIRT 006',
        imgS : 'img/product/product-6.jpg',
        imgM : 'img/product/product-6.jpg',
        imgL : 'img/product/product-6.jpg',
        rating : 2,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },
    {
        id : 7,
        name : 'MANGO PEOPLE T-SHIRT 007',
        imgS : 'img/product/product-7.jpg',
        imgM : 'img/product/product-7.jpg',
        imgL : 'img/product/product-7.jpg',
        rating : 1,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },
    {
        id : 8,
        name : 'MANGO PEOPLE T-SHIRT 008',
        imgS : 'img/product/product-8.jpg',
        imgM : 'img/product/product-8.jpg',
        imgL : 'img/product/product-8.jpg',
        rating : 1,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },
    {
        id : 9,
        name : 'MANGO PEOPLE T-SHIRT 009',
        imgS : 'img/product/product-9.jpg',
        imgM : 'img/product/product-9.jpg',
        imgL : 'img/product/product-9.jpg',
        rating : 4,
        color : 'blue',
        size : 'L',
        price : 1200.00,
    },
];
function handleCatalogButtonClick(event) {
    console.log(event.target.id);
    switch (event.target.id) {
        case 'addItemToCartButton' : {
            console.log('event.currentTarget.dataset.product_id = ' + event.currentTarget.dataset.product_id);
            ProductCart_Model.addProductToCart(+event.currentTarget.dataset.product_id);
            break;
        }
    }
}
var Catalog_View = {
    loadCatalogInPage : function () {
        $catalog_container = document.querySelector('#catalog_container');
        if (productsBase.length === 0) {
            //
        }  else {
            for (var i = 0; i < productsBase.length; i++) {
                $catalog__item = document.createElement('div');
                $catalog__item.dataset.product_id = productsBase[i].id;
                console.log('$catalog__item.dataset.product_id = ' + $catalog__item.dataset.product_id);
                $catalog__item.className = 'product-mini';
                //$catalog__item.id = 'catalog__item';
                $catalog_container.appendChild($catalog__item);
                $catalog__item.innerHTML = '                    <a href="#" class="product-mini__link"><img src=' + productsBase[i].imgM + ' alt="item_img"\n' +
                    '                                                                class="product-mini__img"></a>\n' +
                    '                    <div class="product-mini__text"><a class="product-mini__link" href="#">\n' + productsBase[i].name + '</a>\n' +
                    '                        <p class="product-mini__price">' + productsBase[i].price.toFixed(2)+ '</p>\n' +
                    '                        <div class="product-mini__stars stars">\n' + ProductCart_View.getProductRatingHTML(productsBase[i].rating) + '</div>\n' +
                    '                    </div>\n' +
                    '                    <div class="add-to-cart add-to-cart_mod-3">\n' +
                    '                        <a href="#" id = "addItemToCartButton" class="add-to-cart_mod-3__button add-to-cart_mod-3__button_big"><img\n' +
                    '                                class="add-to-cart_mod-3__img" src="img/cart-2.svg" alt="catr">Add to Cart</a>\n' +
                    '                        <a href="#" class="add-to-cart_mod-3__button"><img class="add-to-cart_mod-3__img"\n' +
                    '                                                                           src="img/recicle.svg" alt="recicle"></a>\n' +
                    '                        <a href="#" class="add-to-cart_mod-3__button"><img class="add-to-cart_mod-3__img" src="img/hard.svg"\n' +
                    '                                                                           alt="hard"></a>\n' +
                    '                    </div>';

                $catalog__item.addEventListener('click', handleCatalogButtonClick);
            }
        }
    },
};
