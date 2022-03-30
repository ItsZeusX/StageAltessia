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
                elem.innerHTML = `
                <a class="item" href="/video/${video.externalId}">
                    <div class="item_container">
                        <div class="item_info">
                        <lord-icon
                        src="https://cdn.lordicon.com/rzrkjbrm.json"
                        trigger="morph"
                        colors="primary:#000"
                        style="width:100px;height:60px">
                    </lord-icon>
                    
                            <div class="item_title">Video</div>
                        </div>
                        <div class="item_index">${index +1}</div>
                    </div>
                </a>
                `
                elem.className = "item_video";
                activities_container.appendChild(elem)
            }) 
    }
    //! GRAMMAR RULES
    if(grammarRules.length > 0){
        grammarRules.forEach((rule , index) => {
            elem = document.createElement("div");
            elem.innerHTML = 
            `
                <a class="item" href="/grammar_rule/${rule.externalId}">
                    <div class="item_container">
                        <div class="item_info">
                        <lord-icon
                            src="https://cdn.lordicon.com/wxnxiano.json"
                            trigger="morph"
                            style="width:100px;height:60px">
                        </lord-icon>
                            <div class="item_title">Grammar Rule</div>
                        </div>
                        <div class="item_index">${index +1}</div>
                    </div>
                </a>
                `
            elem.className = "item_rule";
            activities_container.appendChild(elem)
        }) 
    }

    //! EXERCISES
    // elem.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl"></i> <a href="/exercise/${exercise.externalId}"><h3>Exercise ${index + 1}</h3></a>`
    // elem.className = "item_exercise";
    if(exercises.length > 0){
        exercises.forEach((exercise , index) => {
            elem = document.createElement("div");
            elem.innerHTML = `
            <a class="item" href="/exercise/${exercise.externalId}">
                <div class="item_container">
                    <div class="item_info">
                    <lord-icon
                    src="https://cdn.lordicon.com/rwotyanb.json"
                    trigger="morph"
                    colors="primary:#000"
                    style="width:100px;height:60px">
                </lord-icon>
                        <div class="item_title">Exercise</div>
                    </div>
                    <div class="item_index">${index +1}</div>
                </div>
            </a>
            `
            elem.className = "item_exercise";
            activities_container.appendChild(elem)
        }) 
    }
    
    //! VOCABULARY
    if(vocabulary.length > 0){
        vocabulary.forEach((voc , index) => {
            elem = document.createElement("div");
            elem.innerHTML = `
            <a class="item" href="/vocabulary/${voc.externalId}">
                <div class="item_container">
                    <div class="item_info">
                    <lord-icon
                    src="https://cdn.lordicon.com/zpxybbhl.json"
                    trigger="morph"
                    style="width:100px;height:60px">
                </lord-icon>
                        <div class="item_title">Vocabulary</div>
                    </div>
                    <div class="item_index">${index +1}</div>
                </div>
            </a>
            `
            elem.className = "item_vocabulary";
            activities_container.appendChild(elem)
        })
    }
     
    //! SUMMARY TEST
    if(summary_test.length > 0){
        elem = document.createElement("div");
        elem.innerHTML = `
        <a class="item" href="/summary_test/${summary_test.externalId}">
            <div class="item_container">
                <div class="item_info">
                <lord-icon
                    src="https://cdn.lordicon.com/yyecauzv.json"
                    trigger="morph"
                    style="width:100px;height:60px">
                </lord-icon>
                    <div class="item_title">Summary Test</div>
                </div>
                <div class="item_index">1</div>
            </div>
        </a>
        `
        elem.className = "item_summary";
        activities_container.appendChild(elem)
    }

    //! PRACTICE
    if(practice.length > 0){
        practice.forEach((prac , index) => {
            elem = document.createElement("div");
            elem.innerHTML = 
            `
            <a class="item" href="/practice/${prac.externalId}">
                <div class="item_container">
                    <div class="item_info">
                    <lord-icon
                    src="https://cdn.lordicon.com/wloilxuq.json"
                    trigger="morph"
                    colors="primary:#000000"
                    style="width:100px;height:60px;color: linear-gradient(331deg, rgba(64,147,167,1) 53%, rgba(0,255,171,1) 100%);">
                </lord-icon>
                        <div class="item_title">Practice</div>
                    </div>
                    <div class="item_index">${index + 1}</div>
                </div>
            </a>
            `
            elem.className = "item_practice";
            activities_container.appendChild(elem)
        })
    }
    
}