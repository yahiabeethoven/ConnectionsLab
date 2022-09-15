
window.addEventListener("load", () => {
    console.log("Page has loaded");
    fetch("barca.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    //     let desc = data.description;
    // let p = document.createElement('p');
    // p.innerHTML = desc;
    // document.body.appendChild(p);
    })
    .catch(e=>
        console.log("there is an error",e));

});
