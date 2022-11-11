const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".author .name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const vkBtn = document.querySelector(".vk");

quoteBtn.addEventListener("click", randomQuote);

function randomQuote() {
    quoteBtn.innerText = "Loading Quote...";
    quoteBtn.classList.add("loading");
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    })
}

soundBtn.addEventListener("click", () => {
    let voices; 
    let utterance;
    function speakVoice() {
        voices = this.getVoices();
        // console.log(voices);
        utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        utterance.voice = voices[1];
        speechSynthesis.speak(utterance);
    };
    speechSynthesis.addEventListener('voiceschanged', speakVoice);
})

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
})

vkBtn.addEventListener("click", () => {
    fetch("https://api.vk.com/method/post?user_id=146929270&v=5.131").then(res => res.json()).then(result => {
    let postUrl = "https://oauth.vk.com/authorize?client_id=146929270&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.131&state=123456";
    window.open(postUrl);
    })
})