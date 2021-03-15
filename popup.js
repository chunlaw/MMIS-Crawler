chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.runtime.sendMessage({tabId: tabs[0].id}, function(response) {
    response.forEach( url => {
      if ( url.match(/https:\/\/mmis\.hkpl\.gov\.hk\/ebook\/viewer\?resource=page&item=/) ) {
          var views = chrome.extension.getViews({type: "popup"})
          console.log(views)
          var a = document.createElement("a")
          a.href = url
          var img = document.createElement("img")
          img.src = url
          img.width = "300"
          a.appendChild(img)
          document.getElementById("imgs").appendChild(a)
        }
    })
  });
});
