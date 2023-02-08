function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent("MouseEvents");
  mouseEvent.initEvent(eventName, true, true);
  element.dispatchEvent(mouseEvent);
}

var eventFire = (MyElement, ElementType) => {
  var MyEvent = document.createEvent("MouseEvents");
  MyEvent.initMouseEvent(
    ElementType,
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  MyElement.dispatchEvent(MyEvent);
};

function createAndSendMessage(message) {
  messageBox = document.querySelectorAll("[contenteditable='true']")[1];
  messageBox.focus();
  document.execCommand("insertText", false, message);
  messageBox.dispatchEvent(new Event("change", { bubbles: true }));
  setTimeout(() => {
    eventFire(document.querySelector('span[data-icon="send"]'), "click");
  }, 2000);
}

// 10hrs
// 00:30
function findNewChatAndClick(icon, name, message) {
  let node = document.querySelector('[data-icon="' + icon + '"]');
  if (node) {
    simulateMouseEvents(node, "click");
    setTimeout(() => {
      let searchBox = document.querySelector(`[title="Search input textbox"]`);
      document.execCommand("insertText", false, name);
      searchBox.dispatchEvent(new Event("change", { bubbles: true }));
      setTimeout(() => {
        findNameAndSendMessage(name, message);
      }, 2000);
    }, 2000);
  } else {
    setTimeout(() => {
      findNewChatAndClick(icon, name, message);
    }, 2000);
  }
}
function findNameAndSendMessage(name, message) {
  let node = document.querySelector('[title="' + name + '"]');
  console.log(node);
  if (node) {
    simulateMouseEvents(node, "click");
    setTimeout(() => {
      createAndSendMessage(message);
    }, 3000);
  } else {
    setTimeout(() => {
      findNameAndSendMessage("rah", "hi rah");
    }, 2000);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  setTimeout(() => {
    findNewChatAndClick("chat", request.contact, request.message);
  }, 1000);
});
// setTimeout(() => {
//   findNewChatAndClick("chat", "rah", "hi");
// }, 1000);
