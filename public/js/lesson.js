var externalData = null

window.onload = function (){
    info = externalData.info;
    exercises = externalData.exercises;
    videos = externalData.videos;
    grammarRules = externalData.grammarRules;
    vocabulary  = externalData.vocabulary;
    summary_test = externalData.summary_test

    lesson_title =  document.getElementById("lesson-title")
    activities_container = document.getElementById("activities-container")
    lesson_image = document.getElementById("lesson-img")

    //? LESSONS INFO INJECTION
    lesson_title.innerText = info.title
    lesson_image.firstElementChild.src = "https://app.ofppt-langues.ma" + info.image

    //? ACTIVITIES INJECTION
    //! EXERCISES
    exercises.forEach((exercise , index) => {
        elem = document.createElement("div");
        elem.innerHTML = `<a href="/exercise/${exercise.externalId}"><h3>Exercise ${index + 1}</h3>  <img src="XXX" alt="img">`
        elem.className = "item-exercise";
        activities_container.appendChild(elem)
    }) 
    //! VIDEOS
    videos.forEach((video , index) => {
        elem = document.createElement("div");
        elem.innerHTML = `<a href="/video/${video.externalId}"><h3>Video ${index + 1}</h3></a> <img src="XXX" alt="img">`
        elem.className = "item-video";
        activities_container.appendChild(elem)
    }) 
    //! GRAMMAR RULES
    vocabulary.forEach((rule , index) => {
        elem = document.createElement("div");
        elem.innerHTML = `<a href="/grammar_rule/${rule.externalId}"><h3>Grammar Rule ${index + 1}</h3><img src="XXX" alt="img">`
        elem.className = "item-rule";
        activities_container.appendChild(elem)
    }) 
    //! VOCABULARY
    vocabulary.forEach((voc , index) => {
        elem = document.createElement("div");
        elem.innerHTML = `<a href="/vocabulary/${voc.externalId}"><h3>Vocabulary ${index + 1}</h3><img src="XXX" alt="img">`
        elem.className = "item-vocabulary";
        activities_container.appendChild(elem)
    }) 
    //! SUMMARY TEST 
    elem = document.createElement("div");
    elem.innerHTML = `<a href="/exercise/${summary_test.externalId}"><h3>Summary Test</h3><img src="XXX" alt="img">`
    elem.className = "item-summary";
    activities_container.appendChild(elem)
    
}