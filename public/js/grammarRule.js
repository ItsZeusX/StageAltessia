externalData = null

window.onload = () => {
    console.log(externalData)
    grammarRuleContainer = document.getElementById("grammar_rule_container");
    myDiv = document.createElement("div");
    myDiv.className = "grammar_rule_title";
    myDiv.innerText = externalData.grammar_rule.title
    grammarRuleContainer.appendChild(myDiv)

    contentUrl = externalData.grammar_rule.url
    fetch(`https://app.ofppt-langues.ma${contentUrl}`)
	.then(response => console.log(response.content))
	.catch(err => console.error(err));
}

