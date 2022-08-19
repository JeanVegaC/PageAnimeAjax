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

