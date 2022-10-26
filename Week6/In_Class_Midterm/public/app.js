window.addEventListener("load",() => {
    // fetch("/midterms") // accessing the API
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data);
    // })
  
    let input = document.getElementById("class-input");
    input.addEventListener("submit", (e) => {
      e.preventDefault();
      let courseName = document.getElementById("class-input-text").value;
      console.log(courseName);
      // get info only about specific course
      let url = "/midterms?course="+courseName;
      fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
    })
  })