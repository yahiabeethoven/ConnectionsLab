
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
teams_matrix.set("Mamelodi Sundowns","130");
teams_matrix.set("AL Ahly SC (Egy)", "124");
teams_matrix.set("Al Hilal","119");
teams_matrix.set("Al-Merrikh SC (Omdurman)", "84");
teams_matrix.set("Raja Casablanca Athletic", "3");
teams_matrix.set("ES Setif", "245");
teams_matrix.set("Amazulu FC", "443");
teams_matrix.set("Horoya AC", "104");
teams_matrix.set("Esperance Tunis", "1");
teams_matrix.set("CR Belouizdad", "26");
teams_matrix.set("Etoile Sportive du Sahel", "133");
teams_matrix.set("Jwaneng Galaxy", "29");
teams_matrix.set("Wydad AC", "146");
teams_matrix.set("Atletico Petroleos de Luanda", "116");
teams_matrix.set("El Zamalek", "2");
teams_matrix.set("Sagrada Esperanca", "306");

// status, match_start, round.name, home_team.name, home_team.short_code, home_team.logo,
// away_team.name, away_team.short_code, away_team.logo, stats.ft_score, venue.name, venue.city 

class Match {
    constructor (match_time, round_name, home_name, home_short, home_logo, away_name, away_short, away_logo, score, stadium, city ) {
        this.match_start = match_time;
        this.round_name = round_name;
        this.home_name = home_name;
        this.home_short = home_short;
        this.home_logo = home_logo;
        this.away_name = away_name;
        this.away_short = away_short;
        this.away_logo = away_logo;
        this.score = score;
        this.stadium = stadium;
        this.city = city;
    }
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

// search feature inspired by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
function filterFunction() {
    document.getElementById("myInput").style.cursor = "text";
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } 
        else {
            a[i].style.display = "none";
        }
    }  
}
function updatePage(id) {

    let chosen_url;
    chosen_url = "https://app.sportdataapi.com/api/v1/soccer/teams/";
    chosen_url += id;
    chosen_url += "?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22";
    matches_url = "https://app.sportdataapi.com/api/v1/soccer/matches?apikey=954a2ba0-37a1-11ed-95f3-3334eea78c22&season_id=2264&date_from=2021-09-10";
    
    fetch(chosen_url)
    .then(response => response.json())
    .then(info => {

        document.getElementsByClassName("attributes").visibility = "visible";
        let t_name = info.data.name;
        document.getElementById("chosen_name").innerHTML = t_name;
        
        if (info.data.short_code) {
            let short_code = info.data.short_code;
            document.getElementById("chosen_short").innerHTML = short_code;
        }           
        
        if (info.data.country) {
            if (info.data.country.continent) {
                let continent = info.data.country.continent;
                document.getElementById("chosen_continent").innerHTML = continent;
            }
            else {
                document.getElementById("chosen_continent").innerHTML = "";    
            }
            if (info.data.country.name) {
                let country = info.data.country.name;
                document.getElementById("chosen_country").innerHTML = country;
            }
            else {
                document.getElementById("chosen_country").innerHTML = "";    
            }
        }
        else {
            document.getElementById("chosen_continent").innerHTML = "";   
            document.getElementById("chosen_country").innerHTML = "";    
        } 
        if (info.data.logo) {
            let new_bg = info.data.logo;
            document.getElementById("new_bg").src = new_bg;
        }
        else {
            document.getElementById("new_bg").src = "";    
        }
        for (let i = 0; i < 10; i++) {
            document.getElementsByClassName("attributes")[i].style.visibility = "visible";
        }
        document.getElementById("new_bg").style.visibility = "visible"; 
        document.getElementById("team_name").style.visibility = "visible"; 
        // document.getElementById("season_title").style.visibility = "visible";   
        document.getElementById("matches_title").style.visibility = "visible";  
        document.getElementById("team_attributes").style.visibility = "visible"; 
        document.getElementById("latest_match").style.visibility = "visible";
           
        fetch(matches_url)
        .then(response => response.json())
        .then(matches => {
            let total_matches = matches.data.length - 1;
            // console.log(matches.data);
            for(let i = total_matches; i > 0; i--) {
                let current_object = matches.data[i];
                try{
                    if((current_object.home_team) && (current_object.away_team)) {
                        if (current_object.home_team.name) {
                            if(current_object.away_team.name) {
                                if( (current_object.home_team.name == t_name) || (current_object.away_team.name == t_name) ) {
                                    if (current_object.status == "finished") {
                                        let current_match, match_time, round, home_name, home_short, home_logo, away_name, away_short, away_logo = "N/A";
                                    let score, stadium, city = "N/A"; 

                                    if(current_object.match_start) {
                                        match_time = current_object.match_start;
                                    } 
                                    if (current_object.round) {
                                        if(current_object.round.name) {
                                            round = current_object.round.name;
                                        }
                                    } 
                                    if (current_object.home_team.name) {
                                        home_name = current_object.home_team.name;
                                    }
                                    if(current_object.home_team.short_code) {
                                        home_short = current_object.home_team.short_code;
                                    }
                                    if(current_object.home_team.logo) {
                                        home_logo = current_object.home_team.logo;
                                    }
                                    if (current_object.away_team.name) {
                                        away_name = current_object.away_team.name;
                                    }
                                    if(current_object.away_team.short_code) {
                                        away_short = current_object.away_team.short_code;
                                    }
                                    if(current_object.away_team.logo) {
                                        away_logo = current_object.away_team.logo;
                                    }
                                    if(current_object.stats) {
                                        if(current_object.stats.ft_score) {
                                            score = current_object.stats.ft_score;
                                        }
                                    }
                                    if(current_object.venue) {
                                        if(current_object.venue.name) {
                                            stadium = current_object.venue.name;
                                        }
                                        if(current_object.venue.city) {
                                            city = current_object.venue.city;
                                        }
                                    }
                                
                                    if(!match_time) {match_time ="N/A";}
                                    if(!round) {round ="N/A";}
                                    if(!home_name) {home_name ="N/A";}
                                    if(!home_short) {home_short ="N/A";}
                                    if(!home_logo) {home_logo ="N/A";}
                                    if(!away_name) {away_name ="N/A";}
                                    if(!away_short) {away_short ="N/A";}
                                    if(!away_logo) {away_logo ="N/A";}
                                    if(!score) {score ="N/A";}
                                    if(!stadium) {stadium = "N/A";}
                                    if(!city) {city ="N/A";}

                                    current_match = new Match( match_time, round, home_name, home_short, home_logo, away_name, away_short, away_logo,score, stadium, city);
                                    console.log(current_match);
                                    document.getElementById("round").innerHTML = "Round: " + current_match.round_name;
                                    document.getElementById("home_logo").src = current_match.home_logo;
                                    document.getElementById("home_team").innerHTML = current_match.home_name;
                                    document.getElementById("home_short").innerHTML = current_match.home_short;
                                    document.getElementById("away_logo").src= current_match.away_logo;
                                    document.getElementById("away_team").innerHTML = current_match.away_name;
                                    document.getElementById("away_short").innerHTML = current_match.away_short;
                                    document.getElementById("match_time").innerHTML = current_match.match_start;
                                    document.getElementById("score").innerHTML = current_match.score;
                                    document.getElementById("venue").innerHTML = current_match.stadium;
                                    document.getElementById("city").innerHTML = current_match.city;
                                    break;
                                    } 
                                }  
                                       
                            }
                        }
                        
                    }
                }
                
                catch(e) {
                    console.log(e);
                }
            }
            // status, match_start, round.name, home_team.name, home_team.short_code, home_team.logo,
            // away_team.name, away_team.short_code, away_team.logo, stats.ft_score, venue.name, venue.city  
        })
    });

    
}


window.addEventListener("load", () => {
    // inspired from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {

        if (!event.target.matches(".dropbtn")&& event.target.id!="myInput") {
            
            console.log('clicked out', event.target.id);
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
