const wsUri = "wss://echo-ws-service.herokuapp.com";
const input = document.querySelector('.input');
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
const wrapperChat =  document.querySelector('.wrapper-chat');
const userMessages = document.querySelector('.user-messages');
const serverMessages = document.querySelector('.server-messages');
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

let websocket; 
function writeToScreen(message, position='flex-end') {
  let element = `
    <p class='messages' style='align-self: ${position}'>
            ${message} </p>
    `;
  userMessages.innerHTML += element;
 }

websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
	
	};
websocket.onmessage = function(evt) {
		writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};

btnSend.addEventListener('click', () => {
 const message = input.value;
  websocket.send(message);
  writeToScreen(`Вы: ${message}`);
 });

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btnGeo.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});