(function() {
  const tabStorage = {};
  const networkFilters = {
    urls: [
      "*://mmis.hkpl.gov.hk/*"
    ]
  };

  chrome.webRequest.onCompleted.addListener((details) => {
    const { url, tabId, requestId } = details;
    if (!tabStorage.hasOwnProperty(tabId) ) {
      tabStorage[tabId] = []
    }

    tabStorage[tabId].push(url);
  }, networkFilters);

  chrome.tabs.onActivated.addListener((tab) => {
    const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
    if (!tabStorage.hasOwnProperty(tabId)) {
      tabStorage[tabId] = [];
    }
  });
  chrome.tabs.onRemoved.addListener((tab) => {
    const tabId = tab.tabId;
    if (!tabStorage.hasOwnProperty(tabId)) {
      return;
    }
    tabStorage[tabId] = null;
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    console.log(tabStorage[request.tabId])
    sendResponse(tabStorage[request.tabId])
  })

}());
