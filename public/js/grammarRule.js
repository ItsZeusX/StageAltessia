externalData = null

window.onload = () => {
    document.getElementById("transfer").remove()
    grammarRuleContainer = document.getElementById("grammar_rule_container");
    myDiv = document.createElement("div");
    myDiv.className = "grammar_rule_title";
    myDiv.innerText = externalData.grammar_rule.title
    grammarRuleContainer.appendChild(myDiv)
}

