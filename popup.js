document.addEventListener('DOMContentLoaded', function(){
    let checkBtn = document.getElementById('checkBtn');
    checkBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let domain = document.getElementById('domain').value;
            let url = "https://www.whois.com/whois/" + domain;
            chrome.tabs.create({url: url, active: false}, function(tab) {
                chrome.tabs.executeScript(tab.id, {code: 'document.querySelector(".available").textContent'}, function(result) {
                    if (result && result[0]) {
                        document.getElementById('result').textContent = domain + " is available!";
                    } else {
                        document.getElementById('result').textContent = domain + " is not available";
                    }
                    chrome.tabs.remove(tab.id);
                })
            })
        })
    })
})