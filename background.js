// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("request: ", request);
//   sendResponse("hi");
//   chrome.tabs.query({ url: "https://web.whatsapp.com/" }, function (tabs) {
//     console.log(tabs[0].id);
//     chrome.tabs.sendMessage(tabs[0].id, request);
//   });
// });

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear(function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
    // do something more
  });
  chrome.alarms.create({
    periodInMinutes: 1 / 60,
  });
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(null, (result) => {
    Object.keys(result).map((key) => {
      if (!result[key].sent) {
        let left = new Date(result[key].dateTime) - new Date();
        if (left <= 0) {
          chrome.storage.local.remove([`${key}`], () => {
            chrome.tabs.query(
              { url: "https://web.whatsapp.com/" },
              function (tabs) {
                console.log(tabs[0].id);
                chrome.tabs.sendMessage(tabs[0].id, result[key]);
              }
            );
          });
        }
      }
    });
    // scheduledMessages.map((message) => {
    //   new Date(dateTime.value) - new Date();
    // });
  });
});
