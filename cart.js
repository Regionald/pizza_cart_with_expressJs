const Cart = require('./factory.js');

module.exports=function pizzas(){
const carter={};
function getCart(email){
 if (!carter[email]){
    carter[email]=Cart();
 }
 return carter[email];
}
return{
    getCart
}

}