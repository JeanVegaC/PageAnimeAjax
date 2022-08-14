const express = require('express');
const app = express();
const morgan = require('morgan');

// D:\\Documentos\\Codigos\\Proyectos\\Page Anime-AJAX\\index.html

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', (req,res)=>{
    res.sendFile(__dirname + 'styles.css');
});

app.get('/styles-shared.css', (req,res)=>{
    res.sendFile(__dirname +'/styles-shared.css');
});

app.get('/main.js', (req,res)=>{
    res.sendFile(__dirname +'/main.js');
});

app.get('/main-shared.js', (req,res)=>{
    res.sendFile(__dirname +'/main-shared.js');
});

app.get('/includes-html.js', (req,res)=>{
    res.sendFile(__dirname +'/includes-html.js');
});




app.use(express.static('public'));

//SETTING
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ROUTES

// app.use(require('./routes/index'));
app.use('/api/animes',require('./routes/animes'));
// app.use('/',require('./routes/index.js'));

//STARTING THE SERVER
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})
