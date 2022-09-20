
var extracted_teamId;
var team_name_url = "";
var team_id_url = "";
var t_name = "";
var teamData;
var countryId = "";
var button;
var inputText;
var africa_url;

window.addEventListener("load", () => {

    console.log("Page has loaded");
    let teamName = document.getElementById("team-name");
    fetch("https://app.sportdataapi.com/api/v1/soccer/standings?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22&season_id=2264")
    .then(response => response.json())
    .then(data => {
        let cupGroups = data.data.standings;
        let groupTeams = cupGroups[0];

        let randomGroup = Math.floor(Math.random() * cupGroups.length);
        let randomTeam = Math.floor(Math.random() * groupTeams.length);

        extracted_teamId = cupGroups[randomGroup][randomTeam].team_id;
        team_name_url = "https://app.sportdataapi.com/api/v1/soccer/teams/";
        team_name_url += extracted_teamId;
        team_name_url += "?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22";
        // console.log(team_name_url);
        
        fetch(team_name_url)
        .then(response => response.json())
        .then(info => {
            t_name = info.data.name;
            teamName.innerHTML = t_name;
        });

        
    });
    button = document.getElementById("team-button");
        button.addEventListener("click", function() {
            inputText = document.getElementById("team-input").value;
            console.log(extracted_teamId);
            africa_url = "https://app.sportdataapi.com/api/v1/soccer/countries?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22&continent=Africa";

            fetch(africa_url)
            .then(response => response.json())
            .then(continent => {
                let teamSearch = continent.data;
                for (var i in teamSearch) {
                    if (teamSearch[i].name == inputText) {
                        countryId = teamSearch[i].country_id;
                        // console.log(countryId);
                    }
                }
                team_id_url = "https://app.sportdataapi.com/api/v1/soccer/teams/";
                team_id_url += countryId;
                team_id_url += "?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22";
                // console.log(team_id_url);
                
                fetch(team_id_url)
                .then(response => response.json())
                .then(info => {
                    teamData = info.data;
                    // console.log(teamData);
                    // teamName.innerHTML = t_name;
                });
            })
            
            // console.log("button clicked");
            // console.log("input text is: "+inputText);
        })
    

})
