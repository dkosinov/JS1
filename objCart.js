var cartProductPrototype = {
    getPrice : function () {
        //здесь должен быть запрос в базу данных цены для this.productId
        for (var i = 0; i < productsArr.length; i++) {
            if (productsArr[i].id === this.productId)
                return productsArr[i].price;
        }
    },
    getSubTotal : function () {
        //вернём стоимость всех единиц данного товара
        return this.getPrice() * this.quantity;
    },
};


var objCart = {
    //создадим глобальный объект корзины покупок

    productList : [], //корзина пуста

    getTotalSumm : function () {
        var totalSumm = 0;
        for (var i = 0; i < this.productList.length; i++) {
            totalSumm += this.productList[i].getSubTotal();
        }
        return totalSumm;
    },
    getTotalQuantity : function () {
        var totalQuantity = 0;
        for (var i = 0; i < this.productList.length; i++) {
            totalQuantity += this.productList[i].quantity;
        }
        return totalQuantity;
    },

    getCartInfoPage : function () {
        var $container = document.getElementById('container');
        console.log($container.tagName);
        var $cart_info = document.createElement('p');
        $container.appendChild($cart_info);
        if (this.productList.length > 0) {
            $cart_info.textContent = "В корзине: " + this.getTotalQuantity() +
                " товаров на сумму " + this.getTotalSumm().toFixed(2) + " рублей.";
        } else {
            $cart_info.textContent = 'Корзина пуста.';
        }
    },

    getProductListForCartPage : function () {
        var productListForCartPage = [];

        //создаём массив объёктов по шаблону выдачи в страницу карзины
        return productListForCartPage;
    },
    addProductToCart : function (_id, _quantity) {
        //добавим выбранный товар в корзину
        var newProduct = Object.create(cartProductPrototype);
        for (var i = 0; i < productsArr.length; i++) {
            if (productsArr[i].id === _id) {
                newProduct.productId = _id;
                newProduct.quantity = _quantity;
                this.productList.push(newProduct);
            }
        }
    },
    removeItemFromCart : function (_id) {
        //
    },
    viewProductInSinglePage : function (pID) {
        //
    },

    customer : {},
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
    getGrandTotal : function () {
        //вычитаем скидку
        return this.getTotalSumm() - this.getCouponDiscount();
    },
    continueShoppingCheckOut : function () {
        //
    }
}