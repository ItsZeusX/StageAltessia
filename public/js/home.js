var externalData = null
window.onload = function (){
    console.log(externalData);
    main_wrapper = document.getElementById("main_wrapper")
    Object.entries(externalData).forEach(level => {
      levelContainer = document.createElement("div")
      levelContainer.className = "level_container"
      levelContainer.style.display = "block"
      levelContainer.classList.add(level[0])
      currentLevelMissions = level[1]

      //!LESSONS 
      level[1].forEach((mission,index) =>{
        let myLessons = document.createElement("div")
        myLessons.className = "lessons_container";
        mission.lessons.forEach((lesson , index)=> {
          lessonDIV = document.createElement("div")
          lessonDIV.className = "lesson"
          lessonDIV.innerHTML = 
          `
            <img src="https://app.ofppt-langues.ma${lesson.image}" alt="">
            <div class="lesson_info">
                <div class="lesson_title"><a href="/lesson/${lesson.externalId}">${lesson.title.replace("Mise en pratique_" , "")}</div>
                <div class="lesson_type">${lesson.type}</div>
            </div>
            <div class="lesson_arrow">
              <img src="https://cdn-icons-png.flaticon.com/32/271/271228.png">
            </div>
          `
          myLessons.appendChild(lessonDIV)
        })
        
        //!MISSIONS
        let myMission = document.createElement("div")
        myMission.className = "mission";
        myMission.innerHTML = 
        `
        <div class="mission_info">
        <div class="mission_index">
          ${index + 1}
        </div>
        <div class="mission_text">
            <div class="mission_title">
                ${mission.title}
            </div>
            <div class="mission_progress">
                ( 2/5 )
            </div>
        </div>
        <div class="mission_arrow">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992703.png" alt="arrow">
        </div>
        </div>
        
        `
        myMission.append(myLessons)
        levelContainer.appendChild(myMission)
        main_wrapper.appendChild(levelContainer)
        
    })
  })
  AccordionLogic()
  LevelSelectionLogic()
}

function AccordionLogic(){
  var acc = document.getElementsByClassName("mission_info");
  for (i = 0; i < acc.length; i++) {
    acc[i].nextElementSibling.style.maxHeight = "0px"
    acc[i].addEventListener("click", function() {
      var panel = this.nextElementSibling;
      this.getElementsByClassName("mission_arrow")[0].style = "transform : rotate(0.5turn)"
      if (panel.style.maxHeight === '0px') {
        for (i = 0; i < acc.length; i++) {
          acc[i].nextElementSibling.style.maxHeight = "0px"
      }
      
          panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        this.getElementsByClassName("mission_arrow")[0].style = "transform : rotate(0turn)"
          panel.style.maxHeight = "0px";
      }
    });
  }
}

function LevelSelectionLogic(){
  levelContainers = document.querySelectorAll(".level_container")
  levelSelectors = document.querySelectorAll(".selector")
  levelSelectors.forEach((selector , index) => {
    
    selector.addEventListener("click" , ()=>{
        allLvlContainers = document.querySelectorAll(".level_container")
        lvlContainer = document.querySelectorAll(".level_container")[index]

        if(event.target.classList.contains("active_selector")){
          //pass
        }else{
          levelSelectors.forEach(s => {
            s.classList.remove("active_selector")
          })
          event.target.classList.add("active_selector")
        }

        if(lvlContainer.style.display === "block"){
          allLvlContainers.forEach(lvlCont => {
            if(lvlCont != lvlContainer){
              lvlCont.style.display = "none"
            }
          })
          
        }else{
          allLvlContainers.forEach(lvlCont => {
            if(lvlCont != lvlContainer){
              lvlCont.style.display = "none"
            }else {
              lvlCont.style.display = "block"
            }
          })

        }
      })
    
  })
  levelSelectors[0].click();
}

