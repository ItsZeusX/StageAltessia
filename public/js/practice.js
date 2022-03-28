var externalData = null

window.onload = function (){
    document.getElementById("practice_context").innerText = externalData.context
    document.getElementById("practice_task").innerText = externalData.task
    document.getElementById("practice_image").innerHTML = `<img src="https://app.ofppt-langues.ma${externalData.image}">`

}