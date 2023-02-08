let contact = document.getElementById("contact");
let dateTime = document.getElementById("dateTime");
let message = document.getElementById("message");
let send = document.getElementById("send");
let msgList = document.getElementById("msgList");

updateUi();

send.addEventListener("click", () => {
  //   setTimeout(() => {
  //     chrome.runtime.sendMessage(
  //       { contact: contact.value.trim(), message: message.value.trim() },
  //       (response) => {
  //         console.log("received user data", response);
  //       }
  //     );
  //   }, new Date(dateTime.value) - new Date());
  send.classList.toggle("is-loading");
  chrome.storage.local.get(null, (result) => {
    let id = Object.keys(result).length;
    let messagesTemp = {
      contact: contact.value.trim(),
      message: message.value.trim(),
      dateTime: dateTime.value,
      sent: false,
    };
    chrome.storage.local.set({ [`${id}`]: messagesTemp }, () => {
      send.classList.toggle("is-loading");
      updateUi();
      alert("message scheduled");
    });
  });
});

chrome.storage.onChanged.addListener(() => {
  updateUi();
});
function updateUi() {
  chrome.storage.local.get(null, (result) => {
    console.log(result);
    let scheduledMessages = [];
    Object.keys(result).map((key) => {
      scheduledMessages.push(result[key]);
    });
    let ui = "";
    scheduledMessages?.map((message) => {
      ui =
        ui +
        Card(message.contact, message.message, message.dateTime, message.sent);
    });
    msgList.innerHTML = ui;
  });
}

function Card(contact, message, dateTime, sent) {
  return `<div class="field">
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">${contact}</p>
        </div>
      </div>

      <div class="content">
      ${message}
        <br />
        <time datetime="">${new Date(dateTime).toDateString()}</time>
        <br />
        <time datetime="">${new Date(dateTime).toTimeString()}</time>
      </div>
    </div>
  </div>
</div>`;
}
