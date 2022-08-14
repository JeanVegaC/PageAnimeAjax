const $addedTemplate = d.getElementById('anime-template').content,
    $addedFragment = d.createDocumentFragment(),
    $addedList = d.querySelector('.list-anime');

const getAnimes = async () => {

    while ($addedList.firstChild) {
        $addedList.removeChild($addedList.firstChild);
    }

    try {
            let res = await fetch('http://localhost:3000/favorites'),
                json = await res.json();
            animes = await json;

            json.forEach(e => {
                $addedTemplate.querySelector('.anime-img').src = e.img;
                $addedTemplate.querySelector('.anime-name').textContent = e.name;
                $addedTemplate.querySelector('.anime').dataset.name = e.name;
                $addedTemplate.querySelector('.anime').dataset.gender = e.gender;


                let $addedClone = d.importNode($addedTemplate, true);
                $addedFragment.appendChild($addedClone);
            })
            $addedList.appendChild($addedFragment);

    } catch (e) {
        console.log('Hubo un error en getAnimes/favorites: ' + e);
    }
}

getAnimes();