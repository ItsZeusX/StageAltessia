var externalData = null
window.onload = function (){
    console.log(externalData);
    main_wrapper = document.getElementById("main_wrapper")
    Object.entries(externalData).forEach(level => {

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
                <div class="lesson_title"><a href="/lesson/${lesson.externalId}">${lesson.title}</div>
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
        main_wrapper.appendChild(myMission)

        
    })
  })
  AccordionLogic()
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

