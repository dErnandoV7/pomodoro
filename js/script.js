const buttonSB = document.querySelector(".SB");
const buttonPomodoro = document.querySelector(".Pomodoro");
const body = document.querySelector(".body");
const buttonStart = document.querySelector(".start");
const buttonLG = document.querySelector(".LG");
const cronometro = document.querySelector(".cronometro-h1");
const buttonReset = document.querySelector(".resetime");
const skip = document.querySelector(".skip");

//Ação: Alterar entre seções
let buttonPause = false;
let contTimer = 1500;

const buttonSections = (colors, timerMinutes, timer) => {
  body.style.backgroundColor = colors;
  buttonStart.style.color = colors;
  cronometro.innerHTML = timerMinutes;
  contTimer = timer;
  buttonStart.innerHTML = "Start";
  buttonPause = false;
  clearInterval(intervalo);
};

let viewSection = "Pomodoro";
buttonSB.onclick = () => {
  buttonSections("#262626", "05:00", 300);
  viewSection = "ShortBreak";
  buttonReset.style.display = "none";
};

buttonPomodoro.onclick = () => {
  buttonSections("#011246", "25:00", 1500);
  viewSection = "Pomodoro";

  buttonReset.style.display = "none";
};

buttonLG.onclick = () => {
  buttonSections("#3b4058", "15:00", 900);
  viewSection = "LongBreak";
  buttonReset.style.display = "none";
};

//Ação: Iniciar ou pausar o cronometro
let intervalo;

buttonStart.onclick = () => {
  const audio = new Audio("audio/click.mp3");
  audio.play();

  if (!buttonPause) {
    buttonStart.innerHTML = "Pause";
    intervalo = setInterval(() => {
      contTimer--;
      let minutes = Math.floor(contTimer / 60);
      let seconds = contTimer % 60;
      if (seconds < 10) seconds = "0" + seconds;
      if (minutes < 10) minutes = "0" + minutes;
      cronometro.innerText = `${minutes}:${seconds}`;
      if (contTimer == 0) {
        clearInterval(intervalo);
        switch (viewSection) {
          case "Pomodoro":
            buttonSections("#262626", "05:00", 300);
            break;
          case "ShortBreak":
            buttonSections("#011246", "25:00", 1500);
            break;
          default:
            break;
        }
      }
    }, 1000);
    buttonPause = true;
    buttonReset.style.display = "flex";
  } else {
    clearInterval(intervalo);
    buttonStart.innerHTML = "Start";
    buttonPause = false;
    buttonReset.style.display = "flex";
  }
};

//Ação: Pular seção [Pomodoro -> Short Break -> Pomodoro] [Long Break -> Pomodoro]
const containerStart = document.querySelector(".SS");
const iconSkip = document.querySelector(".skip");

function hover() {
  iconSkip.classList.remove("animation-out-iconSkip");
  iconSkip.classList.add("animation-enter-iconSkip");
  iconSkip.style.display = "flex";
}

function out() {
  iconSkip.classList.remove("animation-enter-iconSkip");
  iconSkip.classList.add("animation-out-iconSkip");
}

iconSkip.onclick = () => {
  switch (viewSection) {
    case "Pomodoro":
      viewSection = "ShortBreak";
      buttonSections("#262626", "05:00", 300);
      break;
    case "ShortBreak":
      viewSection = "Pomodoro";
      buttonSections("#011246", "25:00", 1500);
      break;
    case "LongBreak":
      viewSection = "Pomodoro";
      buttonSections("#011246", "25:00", 1500);
      break;
    default:
      console.log("vini");
      break;
  }
};

//Ação: resetar cronometro
buttonReset.onclick = () => {
  buttonReset.style.display = "none";
  switch (viewSection) {
    case "Pomodoro":
      buttonSections("#011246", "25:00", 1500);
      break;
    case "ShortBreak":
      buttonSections("#262626", "05:00", 300);
      break;
    case "LongBreak":
      buttonSections("#3b4058", "15:00", 900);
      break;
    default:
      break;
  }
};