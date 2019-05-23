function handleButtonNext(event) {
    consoleLogCheckMessage('event.target.className',event.target.className);
    switch (event.target.id) {
        case 'next-1' :
            event.currentTarget.style.display = 'none';
            Checkout_View.openNextDetailsBox(2);
            break;
        case 'next-2' :
            event.currentTarget.style.display = 'none';
            Checkout_View.openNextDetailsBox(3);
            break;
        case 'next-3' :
            event.currentTarget.style.display = 'none';
            Checkout_View.openNextDetailsBox(4);
            break;
        case 'next-4' :
            event.currentTarget.style.display = 'none';
            Checkout_View.openNextDetailsBox(5);
            break;
        case 'next-5' :
            event.currentTarget.style.display = 'none';
            Checkout_View.openNextDetailsBox(6);
            break;
        case 'next-6' :
            //
            break;
    }
}
function handleDetailsOpen(event) {
    if (event.target.className === 'checkout__details-title') {
        consoleLogCheckMessage('event.target.className',event.target.className);
        var $checkout__details_box = event.currentTarget.querySelector('.checkout__details-box');
        if ($checkout__details_box.style.display === 'none')
            $checkout__details_box.style.display = 'flex';
        else $checkout__details_box.style.display = 'none';
    }
}

var Checkout_View = {
    init : function () {
        var $checkout__details_box = document.querySelectorAll('.checkout__details-box');
        var $checkout__details_title = document.querySelectorAll('.checkout__details');
        for (var i = 0; i < $checkout__details_box.length; i++) {
            $checkout__details_box[i].style.display = 'none';
            $checkout__details_box[i].addEventListener('click',handleButtonNext);
            $checkout__details_title[i].addEventListener('click',handleDetailsOpen);
        }
        $checkout__details_box[0].style.display = 'flex';
    },
    openNextDetailsBox : function (_nextDetailsBox) {
        var $checkout__details_box = document.querySelectorAll('.checkout__details-box');
        $checkout__details_box[_nextDetailsBox-1].style.display = 'flex';
    },
}