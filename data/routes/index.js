const { Router } = require('express');
const router = Router();

router.get('/',(req, res)=>{
    res.json({"name":"jhean 2"});
});


module.exports = router;


