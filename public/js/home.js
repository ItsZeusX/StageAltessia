var externalData = null
window.onload = function (){
    levels = SortMissions()

    externalData.forEach(mission => {
        let myMission = document.createElement("li");
        myMission.innerText = `${mission["title"]}`


        let myLessons = document.createElement("ul");

        mission["lessons"].forEach(lesson => {
            myLessons.innerHTML += `<li>${lesson["title"]}</li>`
        })
        myMission.appendChild(myLessons)
        document.getElementById("missions_container").appendChild(myMission)
    });
}
    
function SortMissions(){
    
    A1_MINUS = []; 
    A1 = [];
    A2 = [];
    B1 = [];
    B2 = [];
    C1 = [];
    
    externalData.forEach(mission => {
        switch(mission["level"]) {
            case "A1_MINUS":
                A1_MINUS.push(mission)
                break;
            case "A1":
                A1.push(mission)
                break;
            case "A2":
                A2.push(mission)
                break;
            case "B2":
                B2.push(mission)
                break;
            case "B1":
                B1.push(mission)
                break;
            case "C1":
                C1.push(mission)
                break;
            default :
                break;
    }
    
})

levels = {"levels" : {"A1_MINUS" : A1_MINUS , "A1" :A1 ,"A2" :A2, "B1" :B1,"B2" : B2 ,"C1" : C1}}
return levels
}