const { Router } = require('express');
const router = Router();

router.get('/home',(req, res)=>{
    res.send('./index.html')
});


module.exports = router;


