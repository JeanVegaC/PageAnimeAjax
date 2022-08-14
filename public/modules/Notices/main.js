


// FETCH NOTICES

const fa = async ()=>{
    try{
        let res = await fetch("/Json/notice.json"),
        json = await res.json();
    
        const $noticeList = d.querySelector('.notice-list'),
        $noticeTemplate = d.getElementById('notice-template').content,
        $noticeFragment = d.createDocumentFragment();
        
        json.forEach( e =>{
            $noticeTemplate.querySelector('.notice-img').src = e.img;
            $noticeTemplate.querySelector('.notice-title').textContent = e.title;
            $noticeTemplate.querySelector('.notice-text').textContent = e.description;

            let $noticeClone = d.importNode($noticeTemplate,true);
            $noticeFragment.appendChild($noticeClone);
        })

        $noticeList.appendChild($noticeFragment);

        const notices = d.querySelectorAll('.notice');
        noticeReverse(notices);

    }catch(e) {
        console.log('Hubo un error en main.js/Notices' + e)
    }

}

fa();

// STYLE NOTICES REVERSE


const noticeReverse = (notices)=>{
    
    notices.forEach((e,i) => {
        if(i%2 == 0){
            e.classList.add('notice-reverse');
        }
    });
    
}
