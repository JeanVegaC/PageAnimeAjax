/* ============= SHOW NAV ============= */
const d = document,
    $btnToggle = d.getElementById("btn-toggle"),
    $navLinks = d.getElementById("nav-links");

const showNav = () => {
    $navLinks.classList.toggle("show-nav");
};

$btnToggle.addEventListener("click", showNav);

const $btns = $btnToggle.querySelectorAll("i");

$btns.forEach((e) => {
    e.addEventListener("click", () => {
        $btns.forEach((e) => {
            e.classList.toggle("btn-active");
        });
    });
});

/* ========================================= */
/* EVENT FOR REDIRECT TO REPRODUCTOR MEDIA */

const mediaPlayer = async (id,cap)=>{
    // try {
        
        const $templateMediaInfo = document.getElementById('media-info-template').content,
        $mediaInfoFragment = d.createDocumentFragment();
         $templateMediaVideo = document.getElementById('media-video-template').content,
         $mediaVideoFragment = d.createDocumentFragment();
        
        //FETCH FOR ANIME TITLE AND MEDIA 
        let res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${id}`),
        json = await res.json();
        

        $templateMediaInfo.querySelector('.media-title').textContent = `${json.name} / Capitulo ${cap}`;
        $templateMediaVideo.querySelector('.media-video').src = json.caps[cap-1].url;
        
        const $templateInfoClone = d.importNode($templateMediaInfo,true);
        $mediaInfoFragment.appendChild($templateInfoClone);
        
        const $mediaInfo = d.querySelector('.media-info');

        while ($mediaInfo.firstChild) {
            $mediaInfo.removeChild($mediaInfo.firstChild);
        }

        $mediaInfo.appendChild($mediaInfoFragment)
    
        


        const $templateVideoClone = d.importNode($templateMediaVideo,true);
        $mediaVideoFragment.appendChild($templateVideoClone);
        

        const $mediaVideo = d.querySelector('.media-player');

        while ($mediaVideo.firstChild) {
            $mediaVideo.removeChild($mediaVideo.firstChild);
        }

        $mediaVideo.appendChild($mediaVideoFragment);

        //FETCH FOR LIST CAPS

        const $capTemplate = d.getElementById('cap-template').content,
        $capFragment = d.createDocumentFragment();

        res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${id}`),
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
    
    while ($listCaps.firstChild) {
        $listCaps.removeChild($listCaps.firstChild);
    }

    $listCaps.appendChild($capFragment);

    
        

    // } catch (e) {
    //     console.log(`Hubo un error en main-shared.js: ${e}`);
    // }
}

/* ================ Directory =========== */

"use strick";

/* ==== GENERAL ==== */


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

            let res = await fetch('https://page-anime-ajax.vercel.app/api/animes'),
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
            
 const $mediaInfo = d.querySelector('.media-info');
        
       
            let res = await fetch('https://page-anime-ajax.vercel.app/api/animes'),
                json = await res.json();

                console.log(json);

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

        d.addEventListener('click',e=>{
            if(e.target.matches('.anime-overlay')){
                getAnime(e.target.parentNode.dataset.id);
                
            }

            if(e.target.matches('.link-cap')){
                mediaPlayer(e.target.dataset.id,e.target.dataset.cap);
            }

        })

    } catch (e) {
        console.log('Hubo un error en getAnimes/main.js: ' + e);
    }
}

getAnimes();

/* GET ANIME WITH ID */

const getAnime = async e=>{
    try {

        const $infoTemplate = d.getElementById('info-template').content,
         $infoFragment = d.createDocumentFragment(),
         $genderTemplate = d.getElementById('gender-template').content,
         $genderFragment = d.createDocumentFragment(),
         $capTemplate = d.getElementById('cap-template').content,
         $capFragment = d.createDocumentFragment();

    /* FETCH FOR ANIME INFO */
        let res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${e}`),
        json = await res.json();

                $infoTemplate.querySelector('#anime-img').src = json.img;
                $infoTemplate.querySelector('.anime-name').textContent = json.name;
                $infoTemplate.querySelector('.anime-sinopsis').textContent = json.sinopsis;
                $infoTemplate.querySelector('.anime-name').textContent = json.name;
                $infoTemplate.querySelector('.anime-state').textContent = json.state;
                
               
                let $infoClone = d.importNode($infoTemplate, true);
                $infoFragment.appendChild($infoClone);
                        
        const $animeInfo = d.querySelector('.anime-info');

        while ($animeInfo.firstChild) {
            $animeInfo.removeChild($animeInfo.firstChild);
        }

        $animeInfo.appendChild($infoFragment);

        /* ANIME INFO OVERLAY */

        const animeInfoOverlay = d.querySelector('.anime-info-overlay');
                animeInfoOverlay.setAttribute(`style`,`background-image: url('${json.img}')`);


    /* FETCH FOR ANIME GENDER */       

        res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${e}`),
        json = await res.json();
        
        json.gender.forEach(e=>{
                $genderTemplate.querySelector('.span-gender').textContent = e.name;            
                let $genderClone = d.importNode($genderTemplate, true);
                $genderFragment.appendChild($genderClone);
        })

        const $listGender = d.querySelector('.list-genders');

        while ($listGender.firstChild) {
            $listGender.removeChild($listGender.firstChild);
        }

        $listGender.appendChild($genderFragment);

        /* FETCH FOR ANIME CAPS */

        res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${e}`),
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

        while ($listCaps.firstChild) {
            $listCaps.removeChild($listCaps.firstChild);
        }

        $listCaps.appendChild($capFragment);

        /* EVENT FOR GO MEDIA TO CAPS */
    const $caps = document.querySelectorAll('.cap');

    } catch (e) {
        console.log('Hubo un error en: main.js/Directory '+e);
    }
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

            let res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${e.dataset.id}`, options)

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

            let res = await fetch(`https://page-anime-ajax.vercel.app/api/animes/${e.dataset.id}`, options)

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


// /* EMISION */

// {
//     const $listAnime = d.querySelectorAll('.list-anime'),
// $addedTemplate = d.getElementById("anime-template").content,
// $animeFragment = d.createDocumentFragment(),
// $listHeaders = d.querySelectorAll('.list-header'),
// $sections = d.querySelectorAll('section');


// /* FETCH GET ANIMES FOR EACH DAY */

// const getAnimes = async (day)=>{
  
     
//         let res = await fetch("/Json/emision.json"),
//         json = await res.json();
        
   
//     json.forEach(e => {
    
//            if(e.day == day){
//             $addedTemplate.querySelector(".anime-img").src = e.img;
//             $addedTemplate.querySelector(".anime-name").textContent = e.name;
//             $addedTemplate.querySelector(".anime").dataset.name = e.name;

//             let $addedClone = d.importNode($addedTemplate, true);
//             $animeFragment.appendChild($addedClone);
//            }

//     });

//     if(day == 'Monday'){
//         $listAnime[0].appendChild($animeFragment);
//     }else if(day == 'Tuesday'){
//         $listAnime[1].appendChild($animeFragment);
//     }else if(day == 'Wednesday'){
//         $listAnime[2].appendChild($animeFragment);
//     }else if(day == 'Thursday'){
//         $listAnime[3].appendChild($animeFragment);
//     }else if(day == 'Friday'){
//         $listAnime[4].appendChild($animeFragment);
//     }else if(day == 'Saturday'){
//         $listAnime[5].appendChild($animeFragment);
//     }else{
//         $listAnime[6].appendChild($animeFragment);
//     }

    
   
// }

// getAnimes('Monday');
// getAnimes('Tuesday');
// getAnimes('Wednesday');
// getAnimes('Thursday');
// getAnimes('Friday');
// getAnimes('Saturday');
// getAnimes('Sunday');

// /* EVENT FOR ACTIVE LIST */

// $listHeaders.forEach(e=>{
//     e.addEventListener('click',()=>{
//         e.parentNode.classList.toggle('list-active')
//     })
// })

// /* ACTIVE LIST ANIME WITH API DATE */

// const date = new Date();
// let day;
// if(date.getDay() == 0){
//     day = '.Sunday';
// }else if(date.getDay() == 1){
//     day = '.Monday';
// }else if(date.getDay() == 2){
//     day = '.Tuesday';
// }else if(date.getDay() == 3){
//     day = '.Wednesday';
// }else if(date.getDay() == 4){
//     day = '.Thursday';
// }else if(date.getDay() == 5){
//     day = '.Friday';
// }else{
//     day = '.Saturday';
// }

// const activeList = day=>{
//     $sections.forEach(e=>{
//         if(e.matches(day)){
//             e.classList.add('list-active')
//         }
//     })
// }

// activeList(day);

// console.log('Entre')
// }

// /* FAVORITES */

// {
//     const $addedTemplate = d.getElementById('anime-template').content,
//     $addedFragment = d.createDocumentFragment(),
//     $addedList = d.querySelector('.list-anime');

// const getAnimes = async () => {

//     while ($addedList.firstChild) {
//         $addedList.removeChild($addedList.firstChild);
//     }

//     try {
//             let res = await fetch('http://localhost:3000/favorites'),
//                 json = await res.json();
//             animes = await json;

//             json.forEach(e => {
//                 $addedTemplate.querySelector('.anime-img').src = e.img;
//                 $addedTemplate.querySelector('.anime-name').textContent = e.name;
//                 $addedTemplate.querySelector('.anime').dataset.name = e.name;
//                 $addedTemplate.querySelector('.anime').dataset.gender = e.gender;


//                 let $addedClone = d.importNode($addedTemplate, true);
//                 $addedFragment.appendChild($addedClone);
//             })
//             $addedList.appendChild($addedFragment);

//     } catch (e) {
//         console.log('Hubo un error en getAnimes/favorites: ' + e);
//     }
// }

// getAnimes();
// }

// /* NOTICES */
// {
    
// // FETCH NOTICES

// const fa = async ()=>{
//     try{
//         let res = await fetch("/Json/notice.json"),
//         json = await res.json();
    
//         const $noticeList = d.querySelector('.notice-list'),
//         $noticeTemplate = d.getElementById('notice-template').content,
//         $noticeFragment = d.createDocumentFragment();
        
//         json.forEach( e =>{
//             $noticeTemplate.querySelector('.notice-img').src = e.img;
//             $noticeTemplate.querySelector('.notice-title').textContent = e.title;
//             $noticeTemplate.querySelector('.notice-text').textContent = e.description;

//             let $noticeClone = d.importNode($noticeTemplate,true);
//             $noticeFragment.appendChild($noticeClone);
//         })

//         $noticeList.appendChild($noticeFragment);

//         const notices = d.querySelectorAll('.notice');
//         noticeReverse(notices);

//     }catch(e) {
//         console.log('Hubo un error en main.js/Notices' + e)
//     }

// }

// fa();

// // STYLE NOTICES REVERSE


// const noticeReverse = (notices)=>{
    
//     notices.forEach((e,i) => {
//         if(i%2 == 0){
//             e.classList.add('notice-reverse');
//         }
//     });
    
// }

// }