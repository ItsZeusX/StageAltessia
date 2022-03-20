var externalData = null
window.onload = function (){
    document.getElementById("transfer").remove();
    externalData.forEach((item)=>{
        
        item["answers"].split("&").forEach((answer) => {
            document.getElementById("answers_container").innerHTML += `<button>${answer}</button>`
        })
    })
}
    