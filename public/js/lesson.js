var externalData = null

window.onload = function (){
    console.log(externalData)
    info = externalData.info;
    exercises = externalData.exercises;
    videos = externalData.videos;
    grammarRules = externalData.grammarRules;
    vocabulary  = externalData.vocabulary;
    summary_test = externalData.summary_test;
    practice = externalData.practice;

    lesson_title =  document.getElementById("lesson_title")
    activities_container = document.getElementById("activities-container")
    lesson_image = document.getElementById("lesson_img")

    //? LESSONS INFO INJECTION
    lesson_title.innerText = info.title
    lesson_image.firstElementChild.src = "https://app.ofppt-langues.ma" + info.image

    //? ACTIVITIES INJECTION
    //! VIDEOS
    if(videos.length > 0){
        videos.forEach((video , index) => {
                elem = document.createElement("div");
                elem.innerHTML = `<i class="fa-solid fa-video fa-xl"></i> <a href="/video/${video.externalId}"><h3>Video ${index + 1}</h3></a>`
                elem.className = "item_video";
                activities_container.appendChild(elem)
            }) 
    }
    //! GRAMMAR RULES
    if(grammarRules.length > 0){
        grammarRules.forEach((rule , index) => {
            elem = document.createElement("div");
            elem.innerHTML = `<i class="fa-solid fa-spell-check fa-xl"></i> <a href="/grammar_rule/${rule.externalId}"><h3>Grammar Rule ${index + 1}</h3>`
            elem.className = "item_rule";
            activities_container.appendChild(elem)
        }) 
    }

    //! EXERCISES
    if(exercises.length > 0){
        exercises.forEach((exercise , index) => {
            elem = document.createElement("div");
            elem.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl"></i> <a href="/exercise/${exercise.externalId}"><h3>Exercise ${index + 1}</h3></a>`
            elem.className = "item_exercise";
            activities_container.appendChild(elem)
        }) 
    }
    
    //! VOCABULARY
    if(vocabulary.length > 0){
        vocabulary.forEach((voc , index) => {
            elem = document.createElement("div");
            elem.innerHTML = `<i class="fa-brands fa-alipay fa-xl"></i> <a href="/vocabulary/${voc.externalId}"><h3>Vocabulary ${index + 1}</h3>`
            elem.className = "item_vocabulary";
            activities_container.appendChild(elem)
        })
    }
     
    //! SUMMARY TEST
    if(summary_test.length > 0){
        elem = document.createElement("div");
        elem.innerHTML = `<i class="fa-solid fa-book-bookmark fa-xl"></i> <a href="/exercise/${summary_test[0].externalId}"><h3>Summary Test</h3>`
        elem.className = "item_summary";
        activities_container.appendChild(elem)
    }

    //! PRACTICE
    if(practice.length > 0){
        practice.forEach((prac , index) => {
            elem = document.createElement("div");
            elem.innerHTML = `<i class="fa-brands fa-alipay fa-xl"></i> <a href="/practice/${prac.externalId}"><h3>Practice</h3>`
            elem.className = "item_practice";
            activities_container.appendChild(elem)
        })
    }
    
}