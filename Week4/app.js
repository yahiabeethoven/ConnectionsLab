
window.addEventListener('load', ()=> {
    fetch("http://api.open-notify.org/astros.json")
    .then(resp => resp.json()) 
    .then(data => {
      console.log(data);
    })
  })
  function setup() {
    creatCanvas(window.innerWidth, window.innerHeight);
  }