document.addEventListener("click", (e) => {

    if(e.target.matches('.anime-overlay')){

    let tmp = null;

        const includeHTML = async (el, url) => {      
  
          let options = {
              method:"GET",
              headers:{"Content-type":"text/html; charset=utf-8"}
          }
              let res = await fetch(url,options),
              json = await res.text();

              el.outerHTML = json;
              getAnime(e.target.parentNode.dataset.id)
              console.log('Includes finished');
              tmp = 'finished';
  };
      
      document
        .querySelectorAll("[data-include]")
        .forEach((el) => includeHTML(el, el.getAttribute("data-include")))
      
  console.log('working ....')
 


  




    }
    
    if(e.target.matches('.added-overlay')){
      const includeHTML = async (el, url) => {      
  
        try {

          let options = {
              method:"GET",
              headers:{"Content-type":"text/html; charset=utf-8"}
          }
              let res = await fetch(url,options),
              json = await res.text();

              el.outerHTML = json;
              
        } catch (e) {
      //     let message =
      //     json.statusText ||
      //     "Error loading the file, verify that you are making the request by http or https";
      //   el.outerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`;
        }
  };

  document
    .querySelectorAll("[data-include]")
    .forEach((el) => includeHTML(el, el.getAttribute("data-include")));

    }
    
    if(e.target.matches('.added-name')){
      const includeHTML = async (el, url) => {      
  
        try {

          let options = {
              method:"GET",
              headers:{"Content-type":"text/html; charset=utf-8"}
          }
              let res = await fetch(url,options),
              json = await res.text();

              el.outerHTML = json;
              
        } catch (e) {
      //     let message =
      //     json.statusText ||
      //     "Error loading the file, verify that you are making the request by http or https";
      //   el.outerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`;
        }
  };

  document
    .querySelectorAll("[data-include]")
    .forEach((el) => includeHTML(el, el.getAttribute("data-include")));

    }

    if(e.target.matches('.link-cap')){
      const includeHTML = async (el, url) => {      
  
        try {

          let options = {
              method:"GET",
              headers:{"Content-type":"text/html; charset=utf-8"}
          }
              let res = await fetch(url,options),
              json = await res.text();

              el.outerHTML = json;
              
        } catch (e) {
      //     let message =
      //     json.statusText ||
      //     "Error loading the file, verify that you are making the request by http or https";
      //   el.outerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`;
        }
  };

  document
    .querySelectorAll("[data-include]")
    .forEach((el) => includeHTML(el, el.getAttribute("data-include")));

    }

  });