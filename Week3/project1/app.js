
let extracted_teamId;
let team_name_url = "";
let team_id_url = "";
let t_name = "";
let teamData;
let countryId = "";
let button;
let inputText;
let africa_url;
let teamName;
const teams_matrix = new Map();
teams_matrix.set("130","Mamelodi Sundowns");
teams_matrix.set("124","AL Ahly SC (Egy)");
teams_matrix.set("119","Al Hilal");
teams_matrix.set("84","Al-Merrikh SC (Omdurman)");
teams_matrix.set("3","Raja Casablanca Athletic");
teams_matrix.set("245","ES Setif");
teams_matrix.set("443","Amazulu FC");
teams_matrix.set("104","Horoya AC");
teams_matrix.set("1","Esperance Tunis");
teams_matrix.set("26","CR Belouizdad");
teams_matrix.set("133","Etoile Sportive du Sahel");
teams_matrix.set("29","Jwaneng Galaxy");
teams_matrix.set("146","Wydad AC");
teams_matrix.set("116","Atletico Petroleos de Luanda");
teams_matrix.set("2","El Zamalek");
teams_matrix.set("306","Sagrada Esperanca");

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }  
  }

window.addEventListener("load", () => {

    console.log("Page has loaded");
    teamName = document.getElementById("team-name");
    
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
        // .then(info => {
        //     t_name = info.data.name;
        //     teamName.innerHTML = t_name;
        
        
        });

        
          
          // Close the dropdown if the user clicks outside of it
          window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
              var dropdowns = document.getElementsByClassName("dropdown-content");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
            }
          }
    });
    

    // button = document.getElementById("team-button");
    //     button.addEventListener("click", function() {
    //         inputText = document.getElementById("team-input").value;
    //         console.log(extracted_teamId);
    //         africa_url = "https://app.sportdataapi.com/api/v1/soccer/countries?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22&continent=Africa";

    //         fetch(africa_url)
    //         .then(response => response.json())
    //         .then(continent => {
    //             let teamSearch = continent.data;
    //             for (var i in teamSearch) {
    //                 if (teamSearch[i].name == inputText) {
    //                     countryId = teamSearch[i].country_id;
    //                     // console.log(countryId);
    //                 }
    //             }
    //             team_id_url = "https://app.sportdataapi.com/api/v1/soccer/teams/";
    //             team_id_url += countryId;
    //             team_id_url += "?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22";
    //             // console.log(team_id_url);
                
    //             fetch(team_id_url)
    //             .then(response => response.json())
    //             .then(info => {
    //                 teamData = info.data;
    //                 // console.log(teamData);
    //                 // teamName.innerHTML = t_name;
    //             });
    //         })
            
    //         // console.log("button clicked");
    //         // console.log("input text is: "+inputText);
    //     })
    
   
