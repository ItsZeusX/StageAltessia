import requests

x = requests.get('https://app.ofppt-langues.ma/data/content_resources/current/lessons/EN_GB/EN_GB_B1_GRAMMAR_PERFECT_MODALS_GRAMMAR_RULE_FORM_SUMMARY.html')
print(x.content)