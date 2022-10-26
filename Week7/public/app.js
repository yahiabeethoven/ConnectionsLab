window.addEventListener("load", () => {
    let chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("chat sent!");
    })
  }) 