var externalData = null
var currentItem = null

const vocabularyItemsContainer = document.getElementById("vocabulary_container");
const nextBtn = document.getElementById("next_btn");
var currentItemIndex = 0;

window.onload = function (){
    console.log(externalData)
    InjectVocabularyItem();
    nextBtn.addEventListener("click" , () => {
        NextItem()
    })
}

function InjectVocabularyItem() {
    currentItem = externalData.items[currentItemIndex]
    vocabularyItemsContainer.innerHTML = ""
    wordInfoContainer = document.createElement("div")
    wordInfoContainer.className = "word_info"
    //! WORD :
    mydiv = document.createElement("div")
    mydiv.className = "word"
    mydiv.innerText = currentItem.word
    wordInfoContainer.appendChild(mydiv)

    //!TYPE
    mydiv = document.createElement("div")
    mydiv.className = "word_type"
    mydiv.innerText = currentItem.category
    wordInfoContainer.appendChild(mydiv)

    //!DEFINIOTION
    mydiv = document.createElement("div")
    mydiv.className = "word_definition"
    mydiv.innerText = currentItem.definition
    wordInfoContainer.appendChild(mydiv)

    vocabularyItemsContainer.appendChild(wordInfoContainer)

    //!IMAGE
    if(currentItem.image != null){
        mydiv = document.createElement("div")
        mydiv.className = "word_image"
        mydiv.innerHTML = `<img src="https://app.ofppt-langues.com${currentItem.image}" alt="img">`
        vocabularyItemsContainer.appendChild(mydiv)
    }

    
    //!AUDIO
    mydiv = document.getElementById("word_audio")
    mydiv.innerHTML = 
    `
    <audio controls>
        <source src="https://app.ofppt-langues.com${currentItem.sound}" type="audio/mpeg">
    </audio>
    `
}

function NextItem() {
    if(currentItemIndex < externalData.items.length - 1){
        currentItemIndex += 1;
    InjectVocabularyItem();
    }
    else {
        SetScore()
    }
}

function SetScore (){
    fetch(`/api/set_score/${externalData.info.externalId}` , {
        method : "POST"
    })
    .then(window.location.replace(`/lesson/${externalData.info.lessonExternalId}`))
}