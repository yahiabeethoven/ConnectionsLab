
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
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("attributes")[i].style.visibility = "visible";
        }
        document.getElementById("new_bg").style.visibility = "visible"; 
        document.getElementsByTagName("h3")[0].style.visibility = "visible";  
        document.getElementsByClassName("team-details")[0].style.visibility = "visible";         
    });

    fetch(matches_url)
    .then(response => response.json())
    .then(matches => {
        console.log(matches.data[0].stats.ft_score);
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
