var objCart = {
    productList : [
            {
                productId : '001',
                quantity : 1,
                getPrice : function () {
                    var price;
                    //запрос в базу данных цены для this.productId
                    return price;
                },
                getSubTotal : function () {
                    return this.getPrice() * this.quantity;
                },
            },
    ],
    getProductListForCartPage : function () {
        var productListForCartPage = [];
        //создаём массив объёктов по шаблону выдачи в страницу карзины
        return productListForCartPage;
    },
    productAdd : function (pID) {
        //
    },
    productDelete : function (pID) {
        //
    },
    viewProductInSinglePage : function (pID) {
        //
    },
    getTotal : function () {
        var total;
        return total;
    },
    customer : {},
    setCustomer : function () {
        //
    },
    shippingAdress : {},
    getSippingAdress : function () {
        //
    },
    couponDiscount : {},
    getCouponDiscount : function () {
        //
    },
    getGrandTotal : function () {
        //
    },
    continueShoppingAddCheckOut : function () {
        //
    }
}