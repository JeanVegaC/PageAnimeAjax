const e = require('express');
const {Router} = require('express');
const router = Router();

const animes = require('../Json/animes.json');

router.get('/', (req,res)=>{  
    res.send(animes);
    console.log('Entre'+animes)
})

router.get('/animes', (req,res)=>{  
    res.send(animes.animes);
})

router.post('/animes',(req, res)=>{
    const {name,img,gender,favorite,caps,sinopsis,id} = req.body;



    if(name && img &&gender&&favorite&&caps&&sinopsis&&id){
        const newMovie = {...req.body}
        res.send('saved');
        animes.animes.push(newMovie);
        res.json(animes);
    }else{
        res.status(500).json({error:"There was an Error"});
    }
    console.log(req.body)
    res.send('Post received');
});

router.delete('/:id', (req, res)=>{
    console.log(req.params);
    res.send('Deleted')
})
module.exports = router;