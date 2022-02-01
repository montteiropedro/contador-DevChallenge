// JavaScript 

// LIMITA O INPUT DATE A ACEITAR APENAS DATAS A PARTIR DO DIA ATUAL
window.onload = function minLimit () {
  const minDate = new Date();

  let minDay = minDate.getDate();
    minDay = minDay < 10 ? `0${minDay}` : minDay;
  let minMonth = minDate.getMonth() + 1;
    minMonth = minMonth < 10 ? `0${minMonth}` : minMonth;
  const minYear = minDate.getFullYear();

  const min = `${minYear}-${minMonth}-${minDay}`

  try {
    document.getElementById('date').setAttribute('min', min);
  } catch (error) {
    console.error(`Calendar minimum limit can not be used in this page.`);
  }
}

// BOTÃO REDIRECT BACK DO CONTADOR.HTML
try {
  /* Sobre history.back()
  -https://developer.mozilla.org/en-US/docs/Web/API/History/back */
  document.getElementById('bttn-return').addEventListener('click', () => { history.back(); });
} catch (error) {
  console.error(`Return button can not be used in this page.`);
}

// DATA DO INPUT - ADQUIRIDA PELA URL E AJUSTADA 
/* Como pegar informações na URL passadas via GET em JS
-https://www.hardware.com.br/comunidade/dados-receber/1414974/
-https://webplatform.github.io/docs/apis/location/search/ */
let date = window.location.search;
let dateReg = date.match(/\d{4}\-\d{2}\-\d{2}/);
let givenDate = new Date(dateReg);

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'];

let day = givenDate.getUTCDate();
  day = day < 10 ? `0${day}` : day;
let month = givenDate.getUTCMonth();
let year = givenDate.getUTCFullYear();

let givenDateFinal = `${day} ${months[month]} ${year} 00:00:00`;
let givenDateMili = Date.parse(givenDateFinal);

  console.log(givenDateFinal);

// As próximas 3 linhas de código cuidão de exibir no contador, em PTBR, a data escolhida pelo usuário.
let monthsPTBR = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
let givenDateFinalPTBR =  `${day} ${monthsPTBR[month]} ${year}`;

document.getElementById('target-date').innerText = givenDateFinalPTBR;

/* Esse vídeo me ajudou a fazer a contagem regressiva
-https://www.youtube.com/watch?v=ms0mXabu5RY */
if(!date) {
  console.log('Ainda não recebemos uma data atual');

} else {
  const updateCountdown = () => {
    // console.clear();
  
    // DATA ATUAL - ATUALIZA A CADA 1 SEG JUNTAMENTE A FUNÇÃO
    const currentDate = new Date();
    const currentDateMili = Date.parse(currentDate);
  
    const difference = givenDateMili - currentDateMili;
    
    const day = Math.floor(difference / 1000 / 60 / 60 / 24);
    const hour = Math.floor(difference / 1000 / 60 / 60) % 24;
    const min = Math.floor(difference / 1000 / 60 ) % 60;
    const sec = Math.floor(difference / 1000) % 60;

    const counter = document.getElementsByClassName('counter')[0];
    const getTimeUnit = (unit) => unit < 10 ? `0${unit}` : unit;

    if(difference >= 0) {

      counter.getElementsByClassName('day')[0].innerText = day;
      counter.getElementsByClassName('hour')[0].innerText = getTimeUnit(hour);
      counter.getElementsByClassName('min')[0].innerText = getTimeUnit(min);
      counter.getElementsByClassName('sec')[0].innerText = getTimeUnit(sec);

      // console.log({ day, hour, min, sec });

    }

    if(difference <= 0) {
      /* Sobre como parar um setInterval()
      -https://stackoverflow.com/questions/9136261/how-to-make-a-setinterval-stop-after-some-time-or-after-a-number-of-actions */
      clearInterval(stopCountdown);
      console.log('\nContagem Terminada!');
    }

  }
  let stopCountdown = setInterval(updateCountdown, 1000);

}