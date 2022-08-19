const express = require('express');
const app = express();
const morgan = require('morgan');

// D:\\Documentos\\Codigos\\Proyectos\\Page Anime-AJAX\\index.html

// ====== HOME ======

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', (req,res)=>{
    res.sendFile(__dirname + '/styles.css');
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

/* = DIRECTORY = */

app.get('/Directory', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Directory/index.html');
});

app.get('/public/modules/Directory/styles.css', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Directory/styles.css');
});

app.get('/public/modules/Directory/main.js', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Directory/main.js');
});

/* = EMISION = */

app.get('/Emision', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Emision/index.html');
});

app.get('/public/modules/Emision/styles.css', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Emision/styles.css');
});

app.get('/public/modules/Emision/main.js', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Emision/main.js');
});

/* = FAVORITES = */

app.get('/Favorites', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Favorites/index.html');
});

app.get('/public/modules/Favorites/styles.css', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Favorites/styles.css');
});

app.get('/public/modules/Favorites/main.js', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Favorites/main.js');
});

/* = NOTICES = */

app.get('/Notices', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Notices/index.html');
});

app.get('/public/modules/Notices/styles.css', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Notices/styles.css');
});

app.get('/public/modules/Notices/main.js', (req,res)=>{
    res.sendFile(__dirname +'/public/modules/Notices/main.js');
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
