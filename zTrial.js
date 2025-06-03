const apiKey = "someAPIKey";
let inputField = document.querySelector(".mainDiv form input");
let sendBtn = document.querySelector(".mainDiv form button");
let chatContainer = document.querySelector(".mainDiv .chatBody");
let userMassage;
let botMassage;
const apiLink =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=";
async function apiRequest() {
  let preparedLink = apiLink + apiKey;
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `${userMassage}` }] }],
    }),
  };
  try {
    let response = await fetch(preparedLink, requestOptions);
    if (response.ok) {
      let data = await response.json();
      ({
        parts: [{ text: botMassage }],
      } = data.candidates[0].content);
    } else {
      console.error("status code is : " + response.status);
      throw new Error(`the status code is : ${response.status}`);
    }
  } catch (e) {
    console.error(`fetch Error : ${e}`);
  }
}
inputField.addEventListener("input", (event) => {
  if (event.currentTarget.value !== "")
    sendBtn.querySelector("svg").classList.replace("unactive", "active");
  else sendBtn.querySelector("svg").classList.replace("active", "unactive");
});

function createUserMassage(Umessage) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("totalUserBox");
  let userLogoDiv = document.createElement("div");
  userLogoDiv.classList.add("userPicOnChat");
  let span = document.createElement("span");
  span.innerHTML = "You";
  userLogoDiv.append(span);
  mainDiv.append(userLogoDiv);
  let textMassageDiv = document.createElement("div");
  textMassageDiv.classList.add("userMassageBox");
  textMassageDiv.innerHTML = Umessage;
  mainDiv.append(textMassageDiv);
  chatContainer.append(mainDiv);
}
function createBotMassageWithTypingEffect() {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("totalBotBox");
  let botLogoDiv = document.createElement("div");
  botLogoDiv.classList.add("botPicOnChat");
  botLogoDiv.innerHTML = `<i class="fa-solid fa-comment userPictureOnChat"></i>`;
  let span = document.createElement("span");
  span.innerHTML = "Support Bot";
  botLogoDiv.append(span);
  mainDiv.append(botLogoDiv);
  let textMassageDiv = document.createElement("div");
  textMassageDiv.classList.add("botMassageBox");
  for (let i = 0; i < 3; ++i) {
    let div = document.createElement("div");
    div.classList.add("waitingPoints");
    div.innerHTML = "&nbsp;";
    textMassageDiv.append(div);
  }
  mainDiv.append(textMassageDiv);
  chatContainer.append(mainDiv);
  return mainDiv;
}
sendBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (inputField.value !== "") {
    createUserMassage(inputField.value);
    let botTotalDiv = createBotMassageWithTypingEffect();
    chatContainer.scrollTop = chatContainer.scrollHeight * 2;
    userMassage = inputField.value;
    await apiRequest();
    botTotalDiv.querySelector(".botMassageBox").innerHTML = botMassage;
  }
  inputField.value = "";
});

let tempbotMassage = createBotMassageWithTypingEffect();
setTimeout((_) => {
  tempbotMassage.querySelector(
    ".botMassageBox"
  ).innerHTML = `hello there , i am a chat bot :)`;
}, 2000);
