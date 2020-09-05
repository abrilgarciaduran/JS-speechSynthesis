const msg = new SpeechSynthesisUtterance();  //Recive parametros de que decir y como decirlo
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function AddVoices() {
    voices = this.getVoices(); //Voces posibles a usar
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})`)
        .join('');
}
function selectVoice() {
    msg.voice = voices.find(voice => voice.name === this.value); //Seteando la voz elegida. tengo que buscarla entre el array
    toggle();
}
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}
function setOption() {
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', AddVoices);
voicesDropdown.addEventListener('change', selectVoice);
options.forEach(option => option.addEventListener('change', setOption))
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false))