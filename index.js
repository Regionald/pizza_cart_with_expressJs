
const express = require('express');
const exphbs = require('express-handlebars');
const cart = require('./factory.js');
const carter = cart();
const app = express();
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
let PORT = process.env.PORT||8081;

app.get('/', (req, res) => {
    res.render('index');
})


app.listen(PORT,'localhost', () => {
    console.log("The server is listening at port:" + PORT);
})
