var productsDB = productsBase;

var cartProductPrototype = {
    // getPrice : function () {
    //     //здесь должен быть запрос в базу данных цены для this.productId
    //     for (var i = 0; i < productsDB.length; i++) {
    //         if (productsDB[i].id === this.productId)
    //             return productsDB[i].price;
    //     }
    // },
    getItemTotalSumm : function () {
        //вернём стоимость всех единиц данного товара
        return this.objProduct.price * this.quantity;
    },
};

function setTotalsOnPage() {

}

function removeCartProductsFromNode(_node) {
    var n = _node.childNodes.length;
    for (var i = 0; i < n; i++) {
        _node.removeChild(_node.childNodes[0]);
    }
    setSubTotalSumm();
    setGrandTotalSumm();
}

function handleButtonClick(event) {
    console.log(event.target.id);
    switch (event.target.id) {
        case 'dellButton' : {
            // console.log(event.currentTarget.dataset.sn);
            // console.log(objCart.productList[event.currentTarget.dataset.sn]);
            // console.log(objCart.productList);
            objCart.productList.splice(event.currentTarget.dataset.sn,1);
            // console.log(objCart.productList);
            objCart.loadCartProductListInPage();
            break;
        }
    }
}

function setItemTotalSumm(_node) {
    //
    var cartItem = objCart.productList[_node.dataset.sn];
    $itemQuantity = _node.querySelector('#itemQuantity');
    cartItem.quantity = +$itemQuantity.value; //проверить корректность введённого количества
    $itemQuantity.value = cartItem.quantity;
    console.log($itemQuantity.value);
    $itemTotalSumm = _node.querySelector('#itemTotalSumm');
    $itemTotalSumm.textContent = cartItem.getItemTotalSumm().toFixed(2);
}

function setSubTotalSumm() {
    $subTotalSumm = document.querySelector('#subTotalSumm');
    $subTotalSumm.textContent = objCart.getCartTotalSumm().toFixed(2);
}

function setGrandTotalSumm() {
    $grandTotalSumm = document.querySelector('#grandTotalSumm');
    $grandTotalSumm.textContent = objCart.getGrandTotal().toFixed(2);
}


function handleChangeItemQuantity(event) {
    console.log('Пользователь изменил количество товара в корзине');
    setItemTotalSumm(event.currentTarget);
    setSubTotalSumm();
    setGrandTotalSumm();
}

var objCart = {
    //создадим глобальный объект корзины покупок
    productList : [], //корзина пуста
    couponDiscount : 1000,
    quantity : 0,
    customer : {},

    getCartTotalSumm : function () {
        var totalSumm = 0;
        for (var i = 0; i < this.productList.length; i++) {
            totalSumm += this.productList[i].getItemTotalSumm();
        }
        return totalSumm;
    },

    getGrandTotal : function () {
        //вычитаем скидку
        if (this.productList.length > 0)
            return this.getCartTotalSumm() - this.couponDiscount;
        else return 0;
    },

    getTotalQuantity : function () {
        if (this.productList.length > 0) {
            var totalQuantity = 0;
            for (var i = 0; i < this.productList.length; i++) {
                totalQuantity += this.productList[i].quantity;
            }
            return totalQuantity;
        } else return 0;

    },

    loadCartInfoPageInNode : function (tagetNode) {
        console.log(tagetNode.tagName);
        var $cart_info = document.createElement('p');
        tagetNode.appendChild($cart_info);
        if (this.productList.length > 0) {
            $cart_info.textContent = "В корзине: " + this.getTotalQuantity() +
                " товаров на сумму " + this.getCartTotalSumm().toFixed(2) + " рублей.";
        } else {
            $cart_info.textContent = 'Корзина пуста.';
        }
    },

    loadCartProductListInPage : function () {
        function getProductRatingHTML (_thisProductRating) {
            var ratingHTML = '';
            var maxRating = 5;
            for (var j = 0; j < maxRating; j++) {
                if (j < _thisProductRating) {
                    ratingHTML += '<div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>\n'
                    //если пусты звёздочки должны отображатьса, то раскоментить
                    // } else {
                    //     ratingHTML += '<div class="stars__star"><i class="fas fa-star"></i></div>\n'
                }
            }
            return ratingHTML;
        }
        $cart_products_container = document.querySelector('#cart_products_container');
        removeCartProductsFromNode($cart_products_container); //почистим корзину на странице
        console.log($cart_products_container);
        if (this.productList.length === 0) {
            return this.loadCartInfoPageInNode($cart_products_container);
        }  else {
            for (var i = 0; i < this.productList.length; i++) {
                $cart__item = document.createElement('div');
                $cart__item.dataset.sn = i;
                console.log($cart__item.dataset.sn);
                $cart__item.className = 'cart__item';
                $cart_products_container.appendChild($cart__item);
                $cart__item.innerHTML = '                    <div class="cart__column-1 cart__product">\n' +
                    '                        <a href="single_page.html" class="cart__product-link">\n' +
                    '                            <img src=' + this.productList[i].objProduct.imgS + ' alt="product" class="cart__product-img">\n' +
                    '                        </a>\n' +
                    '                        <div class="cart__product-text">\n' +
                    '                            <div class="cart__product-name">' + this.productList[i].objProduct.name + '</div>\n' +
                    '                            <div class="cart__product-stars stars">' + getProductRatingHTML(this.productList[i].objProduct.rating) + '</div>\n' +
                    '                            <div class="cart__product-color">\n' +
                    '                                Color:\n' +
                    '                                <span class="cart__product-color-data">' + this.productList[i].objProduct.color.toUpperCase() + '</span>\n' +
                    '                            </div>\n' +
                    '                            <div class="cart__product-size">\n' +
                    '                                Size:\n' +
                    '                                <span class="cart__product-size-data">' + this.productList[i].objProduct.size.toUpperCase() + '</span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="cart__column-2 cart__product-price">' + this.productList[i].objProduct.price.toFixed(2) + '</div>\n' +
                    '                    <div class="cart__column-3 cart__product-quantity">\n' +
                    '                        <input type="text" id = "itemQuantity" class="cart__product-quantity-input" value="' + this.productList[i].quantity + '">\n' +
                    '                    </div>\n' +
                    '                    <div class="cart__column-4 cart__product-shipping">FREE</div>\n' +
                    '                    <div id = "itemTotalSumm" class="cart__column-5 cart__product-subtotal">' + this.productList[i].getItemTotalSumm().toFixed(2) + '</div>\n' +
                    '                    <div class="cart__column-6 cart__product-action">\n' +
                    '                        <a href="#" class="cart__product-action-link">\n' +
                    '                            <i id = "dellButton" class="fas fa-times-circle"></i>\n' +
                    '                        </a>\n' +
                    '                    </div>\n' +
                    '                </div>';

                setSubTotalSumm();
                setGrandTotalSumm();

                $cart__item.addEventListener('click', handleButtonClick);
                $cart__item.addEventListener('change',handleChangeItemQuantity);

            }
        }

    },

    getProductListForCartPage : function () {
        var productListForCartPage = [];

        //создаём массив объёктов по шаблону выдачи в страницу карзины
        return productListForCartPage;
    },
    addProductToCart : function (_id, _quantity) {
        //добавим выбранный товар в корзину
        var newProductInCart = Object.create(cartProductPrototype);
        for (var i = 0; i < productsDB.length; i++) {
            if (productsDB[i].id === _id) {
                newProductInCart.objProduct = productsDB[i];
                newProductInCart.quantity = _quantity;
                this.productList.push(newProductInCart);
            } else {
                //Обработаем ситуацию когда товар в каталоге не найден
            }
        }
    },
    removeProductFromCart : function (_id) {
        //
    },
    viewProductInSinglePage : function (pID) {
        //
    },


    setCustomer : function () {
        //
    },
    shippingAdress : {},
    getSippingAdress : function () {
        //
    },
    getCouponDiscount : function () {
        //Проверим наличие у покупателя скидок и вернём сумму скидки если есть
    },

    continueShoppingCheckOut : function () {
        //
    }

};