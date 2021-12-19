const allArray = [];

// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      for (let evento in data) {
        allArray.push(data[evento])
      }
      changeformatDateJSON(data);
      allArray.sort((a,b) => a.dateStart - b.dateStart)
      createEvent( content, allArray);
    });
  }
function changeformatDateJSON (){
  for (let index in allArray) {
    allArray[index].dateStart = new Date(allArray[index].dateStart);
    if(allArray[index].hasOwnProperty("dateFinal")){
    allArray[index].dateFinal = new Date(allArray[index].dateFinal);
    }
  }
}
  // ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
  function createEvent( container ) {
    for(let position in allArray ){
      console.log(allArray[position].hasOwnProperty("dateFinal"));
      //Llamar función que imprime la fecha en el orden deseado
    let dateStart = dateFormat(allArray[position].dateStart, true);
    let dateStartModal = dateFormat(allArray[position].dateStart);

    let containerCard = document.createElement("div");
    containerCard.className = "container-card";
    container.appendChild(containerCard);

    //DIV DE LA IMAGEN
    let photoEvent = document.createElement("div");
    photoEvent.className = "photoEvent";
    //IMAGEN
    let image = document.createElement("img");
    image.src = allArray[position].photoEvent;
    image.className = "cta";
    //TARJETA
    let card = document.createElement("div");
    card.className = "card";
    //DATOS TARJETA
    let infoCard = document.createElement("div");
    infoCard.className = "info-card";
    // NOMBRE
    let name = document.createElement("h3");
    name.innerText = allArray[position].nameEvent;
    // LUGAR
    let place = document.createElement("p");
    place.innerText = allArray[position].cityLocation;
    // BARRA DE ICONOS
    let bar = document.createElement("div");
    bar.className = "icons-bar";
    //DIV FECHA
    let dateCard = document.createElement("div");
    dateCard.className = "date-card";
    // FECHA
    let date = document.createElement("p");
    date.innerText = dateStart;

    container.appendChild(containerCard);
    containerCard.appendChild(photoEvent);
    photoEvent.appendChild(image);
    containerCard.appendChild(card);
    card.appendChild(infoCard)
    card.appendChild(dateCard)
    infoCard.appendChild(bar);
    infoCard.appendChild(name);
    infoCard.appendChild(place);
    dateCard.appendChild(date);

    if(allArray[position].hasOwnProperty("dateFinal")){
      let dateF = dateFormat(allArray[position].dateFinal,true );
      let dateEnd = document.createElement("p");
      dateEnd.innerText = dateF;
      let divider = document.createElement("hr");
      dateCard.appendChild(divider);
      dateCard.appendChild(dateEnd);
    }
    // ICONOS
    let IconContainer = document.createElement("figure");
    let Icon = document.createElement("img");
    bar.appendChild(IconContainer);
    IconContainer.appendChild(Icon);

    if (allArray[position].free) {
      IconContainer.title = "Evento GRATUITO";
      Icon.src = "/src/assets/img/free.png";
      Icon.alt = "Evento GRATUITO";
    } else {
      IconContainer.title = "Evento DE PAGO";
      Icon.src = "/src/assets/img/pago.svg";
      Icon.alt = "Evento DE PAGO";
      bar.appendChild(IconContainer);
      IconContainer.appendChild(Icon);
    }

    // ABRIR VENTANA MODAL
    const modalWindow = document.querySelector(".modal-parent");
    let openModal = document.querySelectorAll(".cta")[position];
    openModal.addEventListener("click", () => {
      createModal(
        dateStartModal,
        allArray[position].photoEvent,
        allArray[position].nameEvent,
        allArray[position].site,
        allArray[position].comments,
        modalWindow
        );
      });
    }
  }

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function createModal(
  dateStart,
  photoEvent,
  nameEvent,
  site,
  comments,
  container
) {
  // ZONA OSCURA
  let modalBox = document.createElement("div");
  modalBox.className = "modal-container";
  container.appendChild(modalBox);
  // VENTANA
  let modal = document.createElement("div");
  modal.className = "modal";
  modalBox.appendChild(modal);
  // IMAGEN
  let modalImage = document.createElement("img");
  modalImage.className = "modal-image";
  modalImage.src = photoEvent;
  modal.appendChild(modalImage);
  // ZONA DE TEXTO
  let modalText = document.createElement("div");
  modalText.className = "modal-text";
  modal.appendChild(modalText);
  // NOMBRE
  let modalName = document.createElement("p");
  modalName.innerText = nameEvent;
  modalText.appendChild(modalName);
  // LUGAR
  let modalPlace = document.createElement("p");
  modalPlace.innerText = site;
  modalText.appendChild(modalPlace);
  // FECHA
  let modalDate = document.createElement("p");
  modalDate.innerText = dateStart;
  modalText.appendChild(modalDate);

  // DESCRIPCIÓN
  if (comments) {
    let description = document.createElement("p");
    description.innerText = comments;
    modalText.appendChild(description);
  }
  // BOTÓN DE CIERRE
  let closeButton = document.createElement("img");
  closeButton.className = "close";
  closeButton.src = "src/assets/img/xmark-solid.svg";
  closeButton.alt = "Cerrar";
  modal.appendChild(closeButton);
  // FUNCIONALIDAD DEL MODAL
  closeButton.addEventListener("click", () => {
    modalBox.remove();
  });
  window.addEventListener("click", (e) => {
    if (e.target == modalBox) {
      modalBox.remove();
    }
  });
}

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month, dateShort = false) {
  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  let monthFormat = monthNames[month.getMonth()]
  if(dateShort){
    monthFormat= monthFormat.toUpperCase().substring(0,3)
  }
  return `${month.getDate()} ${monthFormat}`
 ;
}

/* Función del slider de logos de patrocinadores
 * Selecciono todas las imágenes del contenedor con la variable Sponsors lo que me da un array
 * */
const Sponsors = document.querySelectorAll(".container-img>img");

let indexSlider = 0;
//Le añado a todas una clase que las oculta
const hideImg = () => {
  Sponsors.forEach((img) => img.classList.add("hidden"));
};

function nextSliderImg() {
  if (indexSlider === 0 && Sponsors[indexSlider].className === "hidden") {
    return Sponsors[indexSlider].classList.remove("hidden");
  } else {
    Sponsors[indexSlider].classList.add("hidden");
    //Index se esta igualando a la condición del ternario
    indexSlider = indexSlider < Sponsors.length - 1 ? indexSlider + 1 : 0;
    Sponsors[indexSlider].classList.remove("hidden");
  }
}

function responsiveFooter() {
  if (window.innerWidth <= 768) {
    hideImg();
    nextSliderImg();
    setInterval(nextSliderImg, 3000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  createAll();
  responsiveFooter();
});
