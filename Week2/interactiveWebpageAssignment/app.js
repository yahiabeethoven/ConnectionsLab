const box_strings = 
["Data collection and setting framework for grouping and avatars. Finalize racial categorizations and ethnic groupings in addition to getting familiar with the avatar libraries and shortlisting the ones relevant to the experiment.",
"Building avatars on Unity using external tools such as Microsoft Rocketbox Avatar Library that contains 115 fully rigged characters and avatars of high definition. These avatars have a skeleton system and are accompaniedwith 417 compatible animations (including walking) which is ideal for conducting a realistic and fully immersive prisoner’s dilemma experiment. Additionally, Microsoft havealso released the MoveBox toolbox dedicated to animating the RocketBox Avatar library.",
"Worldbuilding and technical setup of prisoner’s dilemma is done in this phase. We intend to make use of the QuickVR library that was implemented by the EVENTLab for Neuroscience and Technology which was funded by the European Research Council (ERC) Advanced Grant Moments in Time in Immersive Virtual Environments (MoTIVE). This library toolkit will provide us with high level features in application development such as Avatar Tracking, planar reflections, logic workflow, locomotion systems and interaction with the environment",
"Conduct experiments on participants, students and possibly faculty. We plan on conducting 10-20 rounds of an iterative  10-shot game. We will randomly make some of the subjects choose avatars which resemble their respectively chosen ethnogeographicgroup, and the remaining subjects will choose avatars which differ from the group that they identify with.",
"Analyze data and extract statistics from the experiments. In order to measure the effect of physical appearance related to race on cooperation in the game we set 4 treatment conditions:",
"Write paper and poster, finalize capstone. We plan on evaluating the proposal through several methods.First, we will evaluate the grouping by creating 13 preliminaryavatars which correspond to each of the ethnogeographicgroups. Then we will conduct a quick surveyof random students and faculty around campus to test howaccurate these avatars are in actually representing their designated regions. After receiving feedback, we will either make amendments to the categorization of the groups by either breaking the groups down more or merging ones which seemto be too similar, or we will change the physical features of these avatars so they are more relatable."]

const list_strings = 
["The first treatment scenario is bringing two subjects who belong to the same group whose avatars accurately represent that group.",
"The second treatment scenario is bringing two subjects who belong to groups that differ than their avatars, but whose avatars belong to the same group.",
"The third treatment scenario is bringing two subjects who belong to different groups and whose avatars accurately represent the group they identify with.",
"The fourth treatment scenario is bringing two subjects who belong to groups that differ than their avatars, and whose avatars belong to different groups."]

let count = 0;

window.addEventListener("load", () => {
    console.log("Page has loaded");
    

});

function completed(number) {
    let textId = "step" + number;
    let boxId = "box" + number;
    let buttonId = "box"+number+"-button";
    document.getElementById(textId).style.backgroundColor = "grey";
    // document.getElementById(textId).style.color = "black";
    document.getElementById(boxId).style.backgroundColor = "grey";
    document.getElementById(buttonId).style.visibility = "hidden";
    count++;
    if (count == 6) {
        document.getElementsByTagName("header")[0].style.backgroundColor = "green";
        document.getElementsByTagName("h1")[0].style.color = "white";
    }
}

function showIt(number) {
    let textId = "step" + number;
    let element = document.getElementById(textId);
    element.style.visibility = "visible";
    element.innerHTML = box_strings[number - 1];
    element.style.color = "#ffffff";
    if (number == '5') {
        textId = "list" + number;
        let element = document.getElementById(textId);
        element.style.visibility = "visible";
        for (let i = 0; i < 4; i++) {
            element.getElementsByTagName("li")[i].innerHTML = list_strings[i];
        }
    }
}	
