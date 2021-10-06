module.exports = function cart() {
    var smallqty = 0;
    var mediumqty = 0;
    var largeqty = 0;
    var openCart = 0;
    var messages="";
    function qtyIncrement(choice) {
        if (choice == 'small') {
            smallqty++;
        }
        else if (choice == 'medium') {
            mediumqty++;
        }
        else if (choice == 'large') {
            largeqty++;
        }
    }
    function qtydecrement(choice) {
        if (choice == 'small' && smallValue() > 0) {
            smallqty--;
        }
        else if (choice == 'medium' && mediumValue() > 0) {
            mediumqty--;
        }
        else if (choice == 'large' && largeValue() > 0) {
            largeqty--;
        }
    }
    function cartOpener() {
        openCart++;
    }
    function hide() {

        if (cartValue() > 0) {
            return true
        }
        else { return false }
    }
    function unhide() {

        if (totalPrice() > 0) {
            return true
        }
        else { return false }
    }
    function smallValue() {
        return smallqty;
    }
    function mediumValue() {
        return mediumqty;
    }
    function largeValue() {
        return largeqty;
    }
    function cartValue(){
        return openCart;
    }
    function totalPrice() {
        var num = smallValue() * 22.99 + mediumValue() * 60.50 + largeValue() * 120.75;
        return num;

    }
    function respond(amount){
     if (amount==totalPrice()){
         
         messages='Enjoy" your pizzas';
           
     }
     else if(amount>totalPrice()){
        messages=`Enjoy" your pizzas, your change is:R${(amount-totalPrice()).toFixed(2)}`;
     }
     else if(amount<totalPrice()){
      messages="Sorry - that is not enough money!";
     }
     else {messages="please enter correct values";}
    }
    function mes(){
        return messages; 
        setTimeout(()=>{smallqty=0;
            mediumqty=0;
            largeqty=0},4000)
    }
    setTimeout(mes,3000);

    return {
        qtyIncrement,
        smallValue,
        mediumValue,
        largeValue,
        qtydecrement,
        hide,
        unhide,
        totalPrice,
        cartOpener,
        cartValue,
        respond,
        mes
    }
}



