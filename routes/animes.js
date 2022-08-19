const e = require('express');
const {Router} = require('express');
const router = Router();

const animes = require('../Json/animes.json'),
    added = require('../Json/added.json'),
    emision = require('../Json/emision.json'),
    notice = require('../Json/notice.json');


router.get('/', (req,res)=>{  
    res.send(animes);
})

router.get('/:id', async(req,res)=>{  
    
function getAnimeId (id){
    return(
        new Promise((res,rej)=>{
            const animeId = animes.animes.find(ani => ani.id == id);
            res(animeId);  
        })
    )
}

await(getAnimeId(req.params.id))
.then(e =>{res.json(e);})


}) 


router.get('/added', (req,res)=>{  
    res.send(added);
})

router.get('/emision', (req,res)=>{  
    res.send(emision);
})

router.get('/notice', (req,res)=>{  
    res.send(notice);
})

router.post('/animes',(req, res)=>{
    const {name,img,gender,favorite,caps,sinopsis,id} = req.body;

//     if(name && img &&gender&&favorite&&caps&&sinopsis&&id){
//         const newMovie = {...req.body}
//         res.send('saved');
//         animes.animes.push(newMovie);
//         res.json(animes);
//     }else{
//         res.status(500).json({error:"There was an Error"});
//     }
//     console.log(req.body)
//     res.send('Post received');
// });

// router.delete('/:id', (req, res)=>{
//     console.log(req.params);
//     res.send('Deleted')
})

module.exports = router;