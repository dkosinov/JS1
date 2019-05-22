var productCartPrototype = {
    getItemTotalSum : function () {
        //вернём стоимость всех единиц данного товара
        return this.objProduct.price * this.quantity;
    },
};

function handleCartButtonClick(event) {
    console.log(event.target.id);
    switch (event.target.id) {
        case 'dellButton' :
            consoleLogCheckMessage('event.currentTarget.dataset.product_id',event.currentTarget.dataset.product_id);
            ProductCart_Model.removeItemFromCart(+event.currentTarget.dataset.product_id);
            // console.log(productCart.productList);
            ProductCart_View.loadCartProductListInPage();
            break;
    }
}

function handleChangeItemQuantity(event) {
    console.log('Пользователь изменил количество товара в корзине');
    ProductCart_View.setItemTotalSum(event.currentTarget);
    ProductCart_View.setSubTotalSum();
    ProductCart_View.setGrandTotalSum();
}

var ProductCart_Model = {
    //создадим глобальный объект корзины покупок
    productList : [], //корзина по-умолчанию пуста
    couponDiscount : 1000, //обнулить
    quantity : 0,
    customer : {},
    shippingAddress : {},

    isProductInCart : function (_id) {
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].objProduct.id === _id){
                console.log('Товар с таким id есть к казине, id = ' + _id);
                return true;
            }
        }
        console.log('Товар не найден');
        return false;
    },

    getCartItemByProductId : function(_id) {
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].objProduct.id === _id) {
                console.log(this.productList[i]);
                return this.productList[i];
            }
        }
        alert('Товар не найден');
        return false;
    },

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

    addProductToCart : function (_id) {
        //добавим выбранный товар в корзину
        //Проверка на наличие данного товара в корзине
        if (this.isProductInCart(_id)) {
            alert('Данный товар уже в козине');
            return false;
        }
        else {
            console.log('Нет такого товара, добавляем');
            var newProductInCart = Object.create(productCartPrototype);
            for (var i = 0; i < productsDB.length; i++) {
                if (productsDB[i].id === _id) {
                    newProductInCart.objProduct = productsDB[i];
                    newProductInCart.quantity = 1;
                    this.productList.push(newProductInCart);
                    return true;
                }
            }
        }
        //Обработаем ситуацию когда товар в каталоге не найден
        alert('Товар в каталоге не найден');
        return false;
    },

    removeItemFromCart : function (_id) {
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

var ProductCart_View = {

    cart_products_container_tagId : 'cart_products_container',
    cart_item_template_tagId : 'cart_item_template',

    getCartProductsContainerNode : function () {
        return document.querySelector('#'+this.cart_products_container_tagId);
    },

    getCartItemFromTemplate : function () {
        return document.querySelector('#cart_item_template').children[0].cloneNode(true);
    },

    removeAllCartItemsFromPage : function () {
        var $cart_products_container = this.getCartProductsContainerNode();
        consoleLogCheckMessage('$cart_products_container',$cart_products_container);
        while ($cart_products_container.childNodes.length > 0) {
            $cart_products_container.removeChild($cart_products_container.childNodes[0]); //упростить если возможно
        }
    },

    getProductRatingHTML : function  (_productRating) {
        var ratingHTML = '';
        var maxRating = 5;
        for (var j = 0; j < maxRating; j++) {
            if (j < _productRating) {
                ratingHTML += '<div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>\n'
                //если пустые звёздочки должны отображатьса, то раскоментить
                // } else {
                //     ratingHTML += '<div class="stars__star"><i class="fas fa-star"></i></div>\n'
            }
        }
        return ratingHTML;
    },

    setItemTotalSum : function(_node) {
        //
        var cartItem = ProductCart_Model.getCartItemByProductId(+_node.dataset.product_id);
        if (cartItem) {
            $itemQuantity = _node.querySelector('#cart_item_quantity');
            cartItem.quantity = +$itemQuantity.value; //проверить корректность введённого количества
            $itemQuantity.value = cartItem.quantity;
            console.log($itemQuantity.value);
            $itemTotalSum = _node.querySelector('#cart_item_total_sum');
            $itemTotalSum.textContent = cartItem.getItemTotalSum().toFixed(2);    }
    },

    setSubTotalSum : function () {
        $subTotalSum = document.querySelector('#subTotalSum');
        $subTotalSum.textContent = ProductCart_Model.getCartTotalSum().toFixed(2);
    },

    setGrandTotalSum : function () {
        $grandTotalSum = document.querySelector('#grandTotalSum');
        $grandTotalSum.textContent = ProductCart_Model.getGrandTotal().toFixed(2);
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
        this.removeAllCartItemsFromPage(); //почистим корзину на странице

        var $cart_products_container = this.getCartProductsContainerNode();
        consoleLogCheckMessage('$cart_products_container', $cart_products_container);

        if (ProductCart_Model.productList.length === 0) {
            //Корзина пуста
        }  else {
            for (var i = 0; i < ProductCart_Model.productList.length; i++) {

                var $cart_item = this.getCartItemFromTemplate();
                consoleLogCheckMessage('$cart_item',$cart_item);
                $cart_item.dataset.product_id = ProductCart_Model.productList[i].objProduct.id;
                console.log('ID = ' + $cart_item.dataset.product_id);

                $cart_item.querySelector('#cart_item_img').src = ProductCart_Model.productList[i].objProduct.imgS;
                $cart_item.querySelector('#cart_item_name').textContent = ProductCart_Model.productList[i].objProduct.name;
                $cart_item.querySelector('#cart_item_stars').innerHTML = this.getProductRatingHTML(ProductCart_Model.productList[i].objProduct.rating);
                $cart_item.querySelector('#cart_item_color').textContent = ProductCart_Model.productList[i].objProduct.color.toUpperCase();
                $cart_item.querySelector('#cart_item_size').textContent = ProductCart_Model.productList[i].objProduct.size.toUpperCase();
                $cart_item.querySelector('#cart_item_price').textContent = ProductCart_Model.productList[i].objProduct.price.toFixed(2);
                $cart_item.querySelector('#cart_item_quantity').value = ProductCart_Model.productList[i].quantity;
                $cart_item.querySelector('#cart_item_total_sum').textContent = ProductCart_Model.productList[i].getItemTotalSum().toFixed(2)

                $cart_products_container.appendChild($cart_item);

                $cart_item.addEventListener('click', handleCartButtonClick);
                $cart_item.addEventListener('change',handleChangeItemQuantity);

                // $cart__item.innerHTML = '                    <div class="cart__column-1 cart__product">\n' +
                //     '                        <a href="single_page.html" class="cart__product-link">\n' +
                //     '                            <img src=' + this.productList[i].objProduct.imgS + ' alt="product" class="cart__product-img">\n' +
                //     '                        </a>\n' +
                //     '                        <div class="cart__product-text">\n' +
                //     '                            <div class="cart__product-name">' + this.productList[i].objProduct.name + '</div>\n' +
                //     '                            <div class="cart__product-stars stars">' + getProductRatingHTML(this.productList[i].objProduct.rating) + '</div>\n' +
                //     '                            <div class="cart__product-color">\n' +
                //     '                                Color:\n' +
                //     '                                <span class="cart__product-color-data">' + this.productList[i].objProduct.color.toUpperCase() + '</span>\n' +
                //     '                            </div>\n' +
                //     '                            <div class="cart__product-size">\n' +
                //     '                                Size:\n' +
                //     '                                <span class="cart__product-size-data">' + this.productList[i].objProduct.size.toUpperCase() + '</span>\n' +
                //     '                            </div>\n' +
                //     '                        </div>\n' +
                //     '                    </div>\n' +
                //     '                    <div class="cart__column-2 cart__product-price">' + this.productList[i].objProduct.price.toFixed(2) + '</div>\n' +
                //     '                    <div class="cart__column-3 cart__product-quantity">\n' +
                //     '                        <input type="text" id = "itemQuantity" class="cart__product-quantity-input" value="' + this.productList[i].quantity + '">\n' +
                //     '                    </div>\n' +
                //     '                    <div class="cart__column-4 cart__product-shipping">FREE</div>\n' +
                //     '                    <div id = "itemTotalSum" class="cart__column-5 cart__product-subtotal">' + this.productList[i].getItemTotalSum().toFixed(2) + '</div>\n' +
                //     '                    <div class="cart__column-6 cart__product-action">\n' +
                //     '                        <a href="#" class="cart__product-action-link">\n' +
                //     '                            <i id = "dellButton" class="fas fa-times-circle"></i>\n' +
                //     '                        </a>\n' +
                //     '                    </div>\n' +
                //     '                </div>';

            }
        }
        ProductCart_View.setSubTotalSum();
        ProductCart_View.setGrandTotalSum();
    },
};

