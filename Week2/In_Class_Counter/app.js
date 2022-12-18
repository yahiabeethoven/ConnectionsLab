let text = "Hello world!"
let count = 0;

console.log(text);

window.addEventListener("load", () => {
    console.log("Page has loaded");
    let counterResult = document.getElementById("counter-result");
    counterResult.innerHTML = count;

    let addButton = document.getElementById("add-button-id");
    let minusButton = document.getElementById("minus-button-id");

    addButton.addEventListener("click", () => {
        count+=1;
        console.log(count);
        counterResult.innerHTML = count;
    })
    minusButton.addEventListener("click", () => {
        count-=1;
        console.log(count);
        counterResult.innerHTML = count;
    })
});
