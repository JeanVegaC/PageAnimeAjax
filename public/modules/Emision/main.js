const $listAnime = d.querySelectorAll(".list-anime"),
    $addedTemplate = d.getElementById("anime-template").content,
    $animeFragment = d.createDocumentFragment(),
    $listHeaders = d.querySelectorAll(".list-header"),
    $sections = d.querySelectorAll("section");

/* FETCH GET ANIMES FOR EACH DAY */

const getAnimes = async (day) => {
    
    let res = await fetch('https://page-anime-ajax.vercel.app/api/animes/added'),
        json = await res.json();

    json.forEach((e) => {
        if (e.day == day) {
            $addedTemplate.querySelector(".anime-img").src = e.img;
            $addedTemplate.querySelector(".anime-name").textContent = e.name;
            $addedTemplate.querySelector(".anime").dataset.name = e.name;

            let $addedClone = d.importNode($addedTemplate, true);
            $animeFragment.appendChild($addedClone);
        }
    });

    if (day == "Monday") {
        $listAnime[0].appendChild($animeFragment);
    } else if (day == "Tuesday") {
        $listAnime[1].appendChild($animeFragment);
    } else if (day == "Wednesday") {
        $listAnime[2].appendChild($animeFragment);
    } else if (day == "Thursday") {
        $listAnime[3].appendChild($animeFragment);
    } else if (day == "Friday") {
        $listAnime[4].appendChild($animeFragment);
    } else if (day == "Saturday") {
        $listAnime[5].appendChild($animeFragment);
    } else {
        $listAnime[6].appendChild($animeFragment);
    }
};

getAnimes("Monday");
getAnimes("Tuesday");
getAnimes("Wednesday");
getAnimes("Thursday");
getAnimes("Friday");
getAnimes("Saturday");
getAnimes("Sunday");

/* EVENT FOR ACTIVE LIST */

$listHeaders.forEach((e) => {
    e.addEventListener("click", () => {
        e.parentNode.classList.toggle("list-active");
    });
});

/* ACTIVE LIST ANIME WITH API DATE */

const date = new Date();
let day;
if (date.getDay() == 0) {
    day = ".Sunday";
} else if (date.getDay() == 1) {
    day = ".Monday";
} else if (date.getDay() == 2) {
    day = ".Tuesday";
} else if (date.getDay() == 3) {
    day = ".Wednesday";
} else if (date.getDay() == 4) {
    day = ".Thursday";
} else if (date.getDay() == 5) {
    day = ".Friday";
} else {
    day = ".Saturday";
}

const activeList = (day) => {
    $sections.forEach((e) => {
        if (e.matches(day)) {
            e.classList.add("list-active");
        }
    });
};

activeList(day);

