/* ========================= DIRECTORY HEADER / GENDERS =================  */

    const $genders = d.querySelectorAll('.gender');
    $genders.forEach(e => {
    e.addEventListener('click', () => {
        $genders.forEach(a => {
            a.classList.remove('gender-active');
        })
        e.classList.add('gender-active')

    })
})

/* ============================ DIRECTORY BODY =======================  */

/* GET ALL ANIMES */

const $addedTemplate = d.getElementById('anime-template').content,
    $addedFragment = d.createDocumentFragment(),
    $addedList = d.querySelector('.list-anime');
    

const getAnimes = async (gender) => {
    
    while ($addedList.firstChild) {
        $addedList.removeChild($addedList.firstChild);
    }

    try {
        
        if (gender == undefined) {

            // let res = await fetch('http://localhost:3000/api/animes/'),
            let res = await fetch('https://page-anime-ajax.vercel.app/api/animes/'),
                json = await res.json();

            json.animes.forEach(e => {
                $addedTemplate.querySelector('.anime-img').src = e.img;
                $addedTemplate.querySelector('.anime-name').textContent = e.name;
                $addedTemplate.querySelector('.anime').dataset.name = e.name;
                $addedTemplate.querySelector('.anime').dataset.gender = JSON.stringify(e.gender);
                $addedTemplate.querySelector('.anime').dataset.favorite = e.favorite;
                $addedTemplate.querySelector('.anime').dataset.caps = JSON.stringify(e.caps);
                $addedTemplate.querySelector('.anime').dataset.sinopsis = e.sinopsis;
                $addedTemplate.querySelector('.anime').dataset.id = e.id;

                if (e.favorite == "true") {
                    $addedTemplate.querySelector('.star-favorite').classList.add('anime-favorite');
                } else {
                    $addedTemplate.querySelector('.star-favorite').classList.remove('anime-favorite');
                }

                let $addedClone = d.importNode($addedTemplate, true);
                $addedFragment.appendChild($addedClone);

            })
            
            $addedList.appendChild($addedFragment);

        } else {
            
            // let res = await fetch('http://localhost:3000/api/animes/'),
            let res = await fetch('https://page-anime-ajax.vercel.app/api/animes/'),
                json = await res.json();

            const haveGender = (e,gen)=>{
                let res;
                e.forEach(a=>{
                    if(a.name == gen) {
                        res = true;
                    }
                })
                return res;
            }

            json.animes.forEach( async e => {
                let haveGen = haveGender(e.gender,gender);
                if (haveGen == true) {

                    $addedTemplate.querySelector('.anime-img').src = e.img;
                    $addedTemplate.querySelector('.anime-name').textContent = e.name;
                    $addedTemplate.querySelector('.anime').dataset.name = e.name;
                    $addedTemplate.querySelector('.anime').dataset.gender = JSON.stringify(e.gender);
                    $addedTemplate.querySelector('.anime').dataset.favorite = e.favorite;
                    $addedTemplate.querySelector('.anime').dataset.caps = JSON.stringify(e.caps);
                    $addedTemplate.querySelector('.anime').dataset.sinopsis = e.sinopsis;
                    $addedTemplate.querySelector('.anime').dataset.id = e.id;

                    if (e.favorite == "true") {
                        $addedTemplate.querySelector('.star-favorite').classList.add('anime-favorite');
                    } else {
                        $addedTemplate.querySelector('.star-favorite').classList.remove('anime-favorite');
                    }

                    let $addedClone = d.importNode($addedTemplate, true);
                    $addedFragment.appendChild($addedClone);
                    
                }
            })

            $addedList.appendChild($addedFragment);

        }

        /* ADD EVENT TO STARS FOR ADD FAVORITE */

        const stars = d.querySelectorAll('.star-favorite');
        stars.forEach(e => {
            e.addEventListener('click', ()=> {

                addFavorite(e.parentNode.parentNode);
            });
        });

        /* ADD EVENT TO ANIMES FOR SHOW MORE INFO TO ANIME  */

        const $animes =  d.querySelectorAll('.anime-overlay');
        
        // $animes.forEach(e=>{
        //     e.addEventListener('click',()=>{
        //         getAnime(e.parentNode.dataset.id);
        //     })
        // })

       

    } catch (e) {
        console.log('Hubo un error en getAnimes/main.js: ' + e);
    }
}

getAnimes();

/* GET ANIME WITH ID */

const getAnime = async e=>{
   
        
        const $infoTemplate = d.getElementById('info-template').content,
         $infoFragment = d.createDocumentFragment(),
         $genderTemplate = d.getElementById('gender-template').content,
         $genderFragment = d.createDocumentFragment(),
         $capTemplate = d.getElementById('cap-template').content,
         $capFragment = d.createDocumentFragment();
         

    /* FETCH FOR ANIME INFO */
    // let res = await fetch(`http://localhost:3000/api/animes/id/${e}`),
    let res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/id/${e}`),
        json = await res.json();
                $infoTemplate.querySelector('#anime-img').src = json.img;
                $infoTemplate.querySelector('.anime-name').textContent = json.name;
                $infoTemplate.querySelector('.anime-sinopsis').textContent = json.sinopsis;
                $infoTemplate.querySelector('.anime-name').textContent = json.name;
                $infoTemplate.querySelector('.anime-state').textContent = json.state;
                
                let $infoClone = d.importNode($infoTemplate, true);
                $infoFragment.appendChild($infoClone);
                        
                $animeInfo = d.querySelector('.anime-info');

                $animeInfo.innerHTML = ' ';
                $animeInfo.appendChild($infoFragment);
                console.log('getAnime finished')
            

        /* ANIME INFO F */

        const $animeInfoOverlay = d.querySelector('.anime-info-overlay');
            $animeInfoOverlay.setAttribute(`style`,`background-image: url('${json.img}')`);


    /* FETCH FOR ANIME GENDER */       

    // res = await fetch(`http://localhost:3000/api/animes/id/${e}`),
    res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/id/${e}`),
        json = await res.json();
        
        json.gender.forEach(e=>{
                $genderTemplate.querySelector('.span-gender').textContent = e.name;            
                let $genderClone = d.importNode($genderTemplate, true);
                $genderFragment.appendChild($genderClone);
        })

        const $listGender = await d.querySelector('.list-genders');
        console.log($listGender);

        if($listGender == null){
            const $listGender = await d.querySelector('.list-genders');
            setTimeout(async e=>{
                $listGender.innerHTML = await ' ';
                await $listGender.appendChild($genderFragment);
            },1000)
        }else{
            $listGender.innerHTML = ' ';
            $listGender.appendChild($genderFragment);
        }
        

        $listGender.appendChild($genderFragment);

        /* FETCH FOR ANIME CAPS */

        res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/id/${e}`),
        json = await res.json();
        
        
        json.caps.forEach(e=>{
                $capTemplate.querySelector('.num-cap').textContent = `Capitulo ${e.id}`;            
                $capTemplate.querySelector('.link-cap').href = e.url;            
                $capTemplate.querySelector('.link-cap').dataset.visto = e.visto;            
                $capTemplate.querySelector('.link-cap').dataset.cap = e.id;            
                $capTemplate.querySelector('.link-cap').dataset.id = json.id;
                
                /* CLIP */
        
                if($capTemplate.querySelector('.link-cap').dataset.visto == "true"){
                    $capTemplate.querySelector('.uil-check').classList.add('cap-visto');            
                }else{
                    $capTemplate.querySelector('.uil-check').classList.remove('cap-visto');            
                }

                let $capClone = d.importNode($capTemplate, true);
                $capFragment.appendChild($capClone);
        })

        const $listCaps = d.querySelector('.list-caps');

        if($listCaps == null){
            const $listCaps = d.querySelector('.list-caps');
            setTimeout(async e=>{
                $listCaps.innerHTML = await ' ';
                await $listCaps.appendChild($capFragment);
            },1000);
        }else{
            $listCaps.innerHTML = ' ';
            $listCaps.appendChild($capFragment);
        }

        /* EVENT FOR GO MEDIA TO CAPS */
    const $caps = document.querySelectorAll('.cap');

    d.addEventListener('click',e=>{

        if(e.target.matches('.link-cap')){
            mediaPlayer(e.target.dataset.id,e.target.dataset.cap);
        }
    })

}

/* SHOW ANIMES WITH FILTER */

$genders.forEach(e => {
    e.addEventListener('click', () => {

        if (e.id == 'All') {
            getAnimes();
        } else {
            getAnimes(e.id);
        }
    })
})

/* MEDIA PLAYER */




/* APPLY ANIME FAVORITE */

{
    const addFavorite = async e => {
        try {
            let favorite;
    
            if (e.dataset.favorite == "true") {
                let options = {
                    method: "PUT",
                    headers: { "Content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify({
                        name: e.dataset.name,
                        img: e.querySelector('.anime-img').src,
                        gender: JSON.parse(e.dataset.gender),
                        favorite: "false",
                        caps: JSON.parse(e.dataset.caps),
                        sinopsis: e.dataset.sinopsis
                    })
                }
    
                let res = await fetch(`http://localhost:3000/animes/${e.dataset.id}`, options)
    
                options = {
                    method: "DELETE",
                    headers: { "Content-type": "application/json; charset=utf-8" },
                }
    
                res = await fetch(`http://localhost:3000/favorites/${e.dataset.id}`, options)
    
    
            } else {
                let options = {
                    method: "PUT",
                    headers: { "Content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify({
                        name: e.dataset.name,
                        img: e.querySelector('.anime-img').src,
                        gender: JSON.parse(e.dataset.gender),
                        favorite: "true",
                        caps: JSON.parse(e.dataset.caps),
                        sinopsis: e.dataset.sinopsis
                    })
                }
    
                let res = await fetch(`http://localhost:3000/animes/${e.dataset.id}`, options)
    
                options = {
                    method: "POST",
                    headers: { "Content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify({
                        name: e.dataset.name,
                        img: e.querySelector('.anime-img').src,
                        gender: JSON.parse(e.dataset.gender),
                        favorite: e.dataset.favorite,
                        caps: JSON.parse(e.dataset.caps),
                        sinopsis: e.dataset.sinopsis,
                        id: parseInt(e.dataset.id)
                    })
                }
    
                res = await fetch("http://localhost:3000/favorites", options),
                    json = await res.json()
            }
    
        } catch (e) {
            console.log('Hubo un error en main.js/Directory: ' + e)
        }
    }
    
}
