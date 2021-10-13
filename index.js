
const express = require('express');
const exphbs = require('express-handlebars');
const USer = require('./cart.js');
const app = express();
const session = require('express-session');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const PORT = process.env.PORT || 3039;


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
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 } }));

const drivery = sqlite3.Database;

open({
    filename: './orders.db',
    driver: drivery
})
    .then(
        async function (db) {

            await db.migrate();

            const usercounter = USer();

            app.get('/', async (req, res) => {

                if (!req.session.email) {
                    res.redirect('/login');
                }

                var show = 'hidden';

                if (req.session.total > 0) {
                    var show = '';
                }

                var smallTotal = (req.session.smallValue ? req.session.smallValue : 0) * 22.50;
                var mediumTotal = (req.session.mediumValue ? req.session.mediumValue : 0) * 60.50;
                var largeTotal = (req.session.largeValue ? req.session.largeValue : 0) * 120.50;

                res.render('index', {
                    smallQty: req.session.smallValue ? req.session.smallValue : 0,
                    smallTotal: smallTotal.toFixed(2),
                    mediumQty: req.session.mediumValue ? req.session.mediumValue : 0,
                    mediumTotal: mediumTotal.toFixed(2),
                    largeQty: req.session.largeValue ? req.session.largeValue : 0,
                    largeTotal: largeTotal.toFixed(2),
                    total: req.session.total,
                    show: show

                });
            })

            app.post('/small', (req, res) => {

                const order = usercounter.getCart(req.session.email);

                if (req.body.small == '+') {
                    order.qtyIncrement('small');
                }
                if (req.body.small == 'Buy') {
                    order.qtyIncrement('small');
                }
                if (req.body.small == '-') {
                    order.qtydecrement('small');
                }

                req.session.smallValue = order.smallValue();
                req.session.total = order.totalPrice().toFixed(2);
                console.log(req.session.total);
                console.log(req.session.smallValue);
                console.log(req.sessionID);

                res.redirect('/');
            })

            app.post('/medium', (req, res) => {

                const order = usercounter.getCart(req.session.email);


                if (req.body.medium == '+') {
                    order.qtyIncrement('medium');
                }
                if (req.body.medium == 'Buy') {
                    order.qtyIncrement('medium');
                }
                if (req.body.medium == '-') {
                    order.qtydecrement('medium');
                }

                req.session.mediumValue = order.mediumValue();
                req.session.total = order.totalPrice().toFixed(2);

                console.log(req.session.mediumValue);
                console.log(req.sessionID);

                res.redirect('/');
            })

            app.post('/large', (req, res) => {

                const order = usercounter.getCart(req.session.email);


                if (req.body.large == '+') {
                    order.qtyIncrement('large');
                }
                if (req.body.large == 'Buy') {
                    order.qtyIncrement('large');
                }
                if (req.body.large == '-') {
                    order.qtydecrement('large');
                }


                req.session.total = order.totalPrice().toFixed(2);
                req.session.largeValue = order.largeValue();
                console.log(req.session.largeValue);
                console.log(req.sessionID);
                res.redirect('/');
            })

            app.get('/login', (req, res) => {
                res.render('login');
            })

            app.post('/login', (req, res) => {
                console.log(req.body.email);
                if (req.body.email) {
                    req.session.email = req.body.email;
                    res.redirect('/');
                }
                else {
                    res.redirect('/login');
                }


            })

            app.get('/order', async (req, res) => {

                console.log(req.session.smallValue, req.session.mediumValue, req.session.largeValue, req.session.email, req.session.total)
                const insertData = ('INSERT INTO ORDERS (userName,smallQty,mediumQty,largeQty,total)  VALUES (?,?,?,?,?)');
                await db.run(insertData, req.session.email, req.session.smallValue, req.session.mediumValue, req.session.largeValue, req.session.total);
                res.redirect('/cart');
            })
            app.get('/cart', async (req, res) => {

                if (!req.session.email) {
                    res.redirect('/login');
                }
                const orders = 'SELECT * from ORDERS where userName=?'
                const order = await db.all(orders, req.session.email);

                

                for (var i=0;i<order.length;i++){
                       const checkStatus=order[i];
                       if(checkStatus.status=='paid'){
                          order.newStyle='hidden';
                       };

                }
                
                
                res.render('order', { orders: order })

            })
            app.post('/pay/:id', async (req, res) => {

               
                var show="";
                req.session.amount = req.body.amount;
                if (req.session.amount==req.session.total){
                    const idno = req.params.id;
                    const update = 'UPDATE ORDERS set status=? where id=?'
                    const updater = await db.all(update, 'paid', idno);
                    res.redirect('/cart');
                }
                else if(req.session.amount>req.session.total){
                    const idno = req.params.id;
                    const update = 'UPDATE ORDERS set status=? where id=?'
                    const updater = await db.all(update, 'paid', idno);
                    res.redirect('/cart');
                }
                else{
                    res.redirect('/cart');
                }
                

                
            })

            app.listen(PORT, () => {
                console.log("The server is listening at port:" + PORT);
            })

        }

    )
    .catch(err => console.log(err))



