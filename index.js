const express = require('express');
const app = express();
const morgan = require('morgan');

//SETTING
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ROUTES

app.use(require('./routes/index'));
app.use('/api/animes',require('./routes/animes'));
app.use('/home',require('./index.html'));

//STARTING THE SERVER
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})
