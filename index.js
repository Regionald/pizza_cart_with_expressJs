
const express = require('express');
const exphbs = require('express-handlebars');
const cart = require('./factory.js');
const carter = cart();
const app = express();
const PORT = process.env.PORT||3039;
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    var smallTotal = carter.smallValue() * 22.99;
    var mediumTotal = carter.mediumValue() * 60.50;
    var largeTotal = carter.largeValue() * 120.75;
    res.render('index',{ 
        mediumQty: carter.mediumValue(),
        smallQty: carter.smallValue(),
        largeQty: carter.largeValue(),
        smallTotal: smallTotal.toFixed(2),
        mediumTotal: mediumTotal.toFixed(2),
        largeTotal: largeTotal.toFixed(2),
        total: carter.totalPrice().toFixed(2),
        unhide: carter.unhide(),
        uncart: carter.hide(),
        message:carter.mes()
    });
})
app.get('/Sadd', (req, res) => {
    carter.qtyIncrement('small');
    res.redirect('/');
})
app.get('/Ssub', (req, res) => {
    carter.qtydecrement('small');
    res.redirect('/');
})

app.get('/Madd', (req, res) => {
    carter.qtyIncrement('medium');
    res.redirect('/');
})
app.get('/Msub', (req, res) => {
    carter.qtydecrement('medium');
    res.redirect('/');
})
app.get('/Ladd', (req, res) => {
    carter.qtyIncrement('large');
    res.redirect('/');
})
app.get('/Lsub', (req, res) => {
    carter.qtydecrement('large');
    res.redirect('/');
})

app.get('/small', (req, res) => {
    carter.cartOpener();
    carter.qtyIncrement('small');
    res.redirect('/');
})
app.get('/medium', (req, res) => {
    carter.cartOpener();
    carter.qtyIncrement('medium');
    res.redirect('/');
})
app.get('/large', (req, res) => {
    carter.cartOpener();
    carter.qtyIncrement('large');
    res.redirect('/');
})
app.post('/amount', (req, res) => {
    carter.respond(req.body.amount);
    console.log(req.body.amount);
    res.redirect('/');

})


app.listen(PORT,() => {
    console.log("The server is listening at port:" + PORT);
})
