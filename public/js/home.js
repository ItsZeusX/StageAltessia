var externalData = null
window.onload = function (){
      Object.entries(externalData).forEach(level => {
        let level_container = document.createElement("div");
        level_container.className = "level_container";

        let level_title = document.createElement("div");
        level_title.className = "level_title";
        level_title.innerText = level[0]
        level_container.append(level_title);

        level[1].forEach(mission =>{
            let missions_accordion = document.createElement("button")
            missions_accordion.className = "missions_accordion";
            missions_accordion.innerText = mission["title"];
            level_container.appendChild(missions_accordion)

            let missions_panel = document.createElement("div");
            missions_panel .className = "missions_panel";
    
            mission["lessons"].forEach(lesson =>{
                let lesson_container = document.createElement("p")
                lesson_container.className = "lesson_container"
                lesson_container.innerHTML = `<a href = "/lesson/${lesson["externalId"]}">${lesson["title"]}</a>`
                missions_panel.appendChild(lesson_container)
            })
            
            level_container.appendChild(missions_panel)
        })

        
        document.body.appendChild(level_container)

        
    });
    var acc = document.getElementsByClassName("missions_accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
  Array.prototype.forEach.call(acc, function(el) {
    el.classList.toggle("active")
});
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
}
