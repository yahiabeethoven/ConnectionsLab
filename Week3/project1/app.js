
var extracted_teamId;
var team_name_url = "https://app.sportdataapi.com/api/v1/soccer/teams/";
var t_name = "";
window.addEventListener("load", () => {

    console.log("Page has loaded");
    let teamName = document.getElementById("team-name");
    // https://app.sportdataapi.com/api/v1/soccer/leagues/4?apikey=3315c030-377d-11ed-b63b-53764e828d80
    fetch("https://app.sportdataapi.com/api/v1/soccer/standings?apikey=3315c030-377d-11ed-b63b-53764e828d80&season_id=2232")
    .then(response => response.json())
    .then(data => {
        // console.log(data.data.standings[0][0].team_id);
        
        extracted_teamId = data.data.standings[0][0].team_id;
        console.log(extracted_teamId);
        t_name = extracted_teamId;
        teamName.innerHTML = t_name;
    })
    console.log(typeof t_name)
    team_name_url += extracted_teamId;
    team_name_url += "?apikey=3315c030-377d-11ed-b63b-53764e828d80"
    console.log(team_name_url)
    // team_name_url = "https://app.sportdataapi.com/api/v1/soccer/teams/" + extracted_teamId + "?apikey=3315c030-377d-11ed-b63b-53764e828d80"
    
    // fetch(team_name_url)
    // .then(response => response.json())
    // .then(data => {
    //     t_name = data.data.name;
    //     teamName.innerHTML = t_name;
    // })
})
