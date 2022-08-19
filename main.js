
/* ============== HOME ================== */

/* FETCH ANIME ADDED */

    const $addedTemplate = d.getElementById("added-template").content,
        $addedFragment = d.createDocumentFragment(),
        $addedList = d.querySelector(".list-added"),
        $emisionTemplate = d.getElementById("emision-template").content,
        $emisionFragment = d.createDocumentFragment(),
        $emisionList = d.querySelector(".list-emision");

    const getAdded = async () => {
        try {


            let res = await fetch('https://page-anime-ajax.vercel.app/api/animes/added'),
                json = await res.json();

                console.log(json);
            json.forEach(e => {
                $addedTemplate.querySelector(".added-img").src = e.img;
                $addedTemplate.querySelector(".added-name").textContent = e.name;
                $addedTemplate.querySelector(".added-cap").textContent = `Capitulo ${e.cap}`
                $addedTemplate.querySelector(".added").dataset.name = e.name;
                $addedTemplate.querySelector(".added").dataset.id = e.id;
                $addedTemplate.querySelector(".added").dataset.cap = e.cap;

                let $addedClone = d.importNode($addedTemplate, true);
                $addedFragment.appendChild($addedClone);
            });




            $addedList.appendChild($addedFragment);
        } catch (e) {
            console.log("Hubo un error, htmlHome" + e);
        }
    };
    
    const getEmision = async () => {
        try {

            let res = await fetch('https://page-anime-ajax.vercel.app/api/animes/emision'),
                json = await res.json();

            json.forEach(e => {
                $emisionTemplate.querySelector(".emision-img").src = e.img;
                $emisionTemplate.querySelector(".emision-name").textContent = e.name;
                $emisionTemplate.querySelector(".emision").dataset.name = e.name;
                $emisionTemplate.querySelector(".emision").dataset.id = e.id;
                $emisionTemplate.querySelector(".emision").dataset.cap = e.cap;

                let $emisionClone = d.importNode($emisionTemplate, true);
                $emisionFragment.appendChild($emisionClone);
            });

            $emisionList.appendChild($emisionFragment);
        } catch (e) {
            console.log("Hubo un error, htmlHome/getEmision" + e);
        }
    };

    getAdded();
    getEmision();

    const $added = document.querySelectorAll('.added');

    d.addEventListener('click', e => {
        if (e.target.matches('.added-overlay')) {
            mediaPlayer(e.target.parentNode.dataset.id, e.target.parentNode.dataset.cap);
        }

        if (e.target.matches('.added-name')) {
            mediaPlayer(e.target.parentNode.parentNode.dataset.id, e.target.parentNode.parentNode.dataset.cap);
        }

        if (e.target.matches('.link-cap')) {
            mediaPlayer(e.target.dataset.id, e.target.dataset.cap);
        }

    })

