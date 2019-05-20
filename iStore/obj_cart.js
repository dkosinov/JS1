var productsDB = productsBase; //название переменной хранящей массив товаров

var cartProductPrototype = {
    getItemTotalSum : function () {
        //вернём стоимость всех единиц данного товара
        return this.objProduct.price * this.quantity;
    },
};

function setTotalsOnPage() {

}

function removeAllCartProductsFromPage() {
    var $cart_products_container = document.querySelector('#cart_products_container');
    var n = $cart_products_container.childNodes.length;
    if (n > 0) {
        for (var i = 0; i < n; i++) {
            $cart_products_container.removeChild($cart_products_container.childNodes[0]);
        }
        //setSubTotalSum();
        //setGrandTotalSum();
    }
}

function handleCartButtonClick(event) {
    console.log(event.target.id);
    switch (event.target.id) {
        case 'dellButton' : {
            // console.log(event.currentTarget.dataset.sn);
            // console.log(objCart.productList[event.currentTarget.dataset.sn]);
            // console.log(objCart.productList);
            objCart.removeProductFromCart(event.currentTarget.dataset.id);
            // console.log(objCart.productList);
            objCart.loadCartProductListInPage();
            break;
        }
    }
}

function setItemTotalSum(_node) {
    //
    var cartItem = objCart.getCartItemById(_node.dataset.id);
    if (cartItem) {
        $itemQuantity = _node.querySelector('#itemQuantity');
        cartItem.quantity = +$itemQuantity.value; //проверить корректность введённого количества
        $itemQuantity.value = cartItem.quantity;
        console.log($itemQuantity.value);
        $itemTotalSum = _node.querySelector('#itemTotalSum');
        $itemTotalSum.textContent = cartItem.getItemTotalSum().toFixed(2);    }
}

function setSubTotalSum() {
    $subTotalSum = document.querySelector('#subTotalSum');
    $subTotalSum.textContent = objCart.getCartTotalSum().toFixed(2);
}

function setGrandTotalSum() {
    $grandTotalSum = document.querySelector('#grandTotalSum');
    $grandTotalSum.textContent = objCart.getGrandTotal().toFixed(2);
}


function handleChangeItemQuantity(event) {
    console.log('Пользователь изменил количество товара в корзине');
    setItemTotalSum(event.currentTarget);
    setSubTotalSum();
    setGrandTotalSum();
}

var objCart = {
    //создадим глобальный объект корзины покупок
    productList : [], //корзина пуста
    couponDiscount : 1000,
    quantity : 0,
    customer : {},

    getCartTotalSum : function () {
        var totalSum = 0;
        for (var i = 0; i < this.productList.length; i++) {
            totalSum += this.productList[i].getItemTotalSum();
        }
        return totalSum;
    },

    getGrandTotal : function () {
        //вычитаем скидку если есть и grandTotal не становится отрицательным
        var grandTotal = 0;
        if (this.productList.length > 0)
            grandTotal = this.getCartTotalSum();

        if (this.couponDiscount > 0)
            grandTotal = grandTotal - this.couponDiscount;

        if (grandTotal < 0)
            grandTotal = 0;

        return grandTotal;
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

    getCartItemById : function(_id) {
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].objProduct.id === _id) {
                return this.productList[i];
            }
        }
        alert('Товар не найден');
        return false;
    },

    loadCartInfoPageInNode : function (tagetNode) {
        console.log(tagetNode.tagName);
        var $cart_info = document.createElement('p');
        tagetNode.appendChild($cart_info);
        if (this.productList.length > 0) {
            $cart_info.textContent = "В корзине: " + this.getTotalQuantity() +
                " товаров на сумму " + this.getCartTotalSum().toFixed(2) + " рублей.";
        } else {
            $cart_info.textContent = 'Корзина пуста.';
        }
    },

    loadCartProductListInPage : function () {
        $cart_products_container = document.querySelector('#cart_products_container');
        removeAllCartProductsFromPage(); //почистим корзину на странице
        //console.log($cart_products_container);
        if (this.productList.length === 0) {
            this.loadCartInfoPageInNode($cart_products_container);
        }  else {
            for (var i = 0; i < this.productList.length; i++) {
                $cart__item = document.createElement('div');
                $cart__item.dataset.id = this.productList[i].objProduct.id;
                console.log('ID = ' + $cart__item.dataset.id);
                $cart__item.className = 'cart__item';
                $cart__item.id = 'cart__item';
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
                    '                    <div id = "itemTotalSum" class="cart__column-5 cart__product-subtotal">' + this.productList[i].getItemTotalSum().toFixed(2) + '</div>\n' +
                    '                    <div class="cart__column-6 cart__product-action">\n' +
                    '                        <a href="#" class="cart__product-action-link">\n' +
                    '                            <i id = "dellButton" class="fas fa-times-circle"></i>\n' +
                    '                        </a>\n' +
                    '                    </div>\n' +
                    '                </div>';



                $cart__item.addEventListener('click', handleCartButtonClick);
                $cart__item.addEventListener('change',handleChangeItemQuantity);

            }
        }
        setSubTotalSum();
        setGrandTotalSum();

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
                return true;
            }
        }
        //Обработаем ситуацию когда товар в каталоге не найден
        alert('Товар в каталоге не найден');
        return false;
    },

    removeProductFromCart : function (_id) {
        //
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].objProduct.id === _id) {
                console.log(this.productList[i].objProduct.id + '===' + _id);
                return this.productList.splice(i, 1);
            }
        }
        //если товар не найден
        alert('Товар в карзине не найден.');
        return false;
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