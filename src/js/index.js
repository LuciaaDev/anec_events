import moment from "moment";
//import { createModal, createPopUpModal } from "/createModal.js"
let allEvents = [];
let currentListEvents = [];
let activeCategory = "all";
let listFilterDates = [];

// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("/data/eventosAlicante.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      for (let evento in data) {
        //Es un generador de Id basados en el nombre del evento
        let idEvent = data[evento].nameEvent;
        idEvent = idEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        data[evento].bookmark = arrayBookMark.includes(idEvent);
        data[evento].id = idEvent;
        allEvents.push(data[evento]);
      }
      changeformatDateJSON(data);
      allEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime())
      currentListEvents = [...allEvents];
      const firstpagination = divideListEventForPagination(1)
      createEvent(content, firstpagination);
      pagination(currentListEvents)
    });
}
function changeformatDateJSON() {
  for (let index in allEvents) {
    allEvents[index].dateStart = new Date(allEvents[index].dateStart);
    if (allEvents[index].hasOwnProperty("dateFinal")) {
      allEvents[index].dateFinal = new Date(allEvents[index].dateFinal);
    }
  }
}
// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(container, listEvents) {
  // for (let position in listEvents) {
  for (let position in listEvents) {
    //Llamar función que imprime la fecha en el orden deseado
    let dateStart = dateFormat(listEvents[position].dateStart, true);
    let containerCard = document.createElement("div");
    containerCard.className = "container-card";
    containerCard.dataset.id = listEvents[position].id
    // AÑADE EL EVENTO A LA TARJETA
    containerCard.addEventListener("click", dataModal);
    //DIV DE LA IMAGEN
    let photoEvent = document.createElement("div");
    photoEvent.className = "photoEvent";
    //BOTON FAVORITOS
    let bookmarkContainer = document.createElement("div");
    bookmarkContainer.className = "bookmark"
    let bookmark = document.createElement("img");
    bookmark.src = listEvents[position].bookmark ? "./img/icons/bookmark-selected.svg" : "./img/icons/bookmark.svg";
    bookmark.dataset.name = listEvents[position].id
    bookmark.addEventListener("click", selectedBookmark)
    //IMAGEN
    let image = document.createElement("img");
    image.src = listEvents[position].photoEvent;
    //DATOS TARJETA
    let infoCard = document.createElement("div");
    infoCard.className = "info-card";
    // NOMBRE
    let name = document.createElement("h3");
    name.innerText = listEvents[position].nameEvent;
    // LUGAR
    let place = document.createElement("p");
    place.innerText = listEvents[position].cityLocation;
    // BARRA DE ICONOS
    let bar = document.createElement("div");
    bar.className = "icons-bar";
    // FECHA
    let date = document.createElement("p");
    date.innerText = `Solo el ${dateStart}`;
    if (listEvents[position].hasOwnProperty("dateFinal")) {
      let dateF = dateFormat(listEvents[position].dateFinal, true);
      let resultado = allYear(dateStart, dateF)
      if (!resultado) {
        date.innerText = `Del ${dateStart}  al ${dateF}`;
      } else {
        date.innerText = `Todo el año`;
      }
    }
    container.appendChild(containerCard);
    containerCard.appendChild(photoEvent);
    photoEvent.appendChild(bookmarkContainer);
    bookmarkContainer.appendChild(bookmark);
    photoEvent.appendChild(image);
    containerCard.appendChild(infoCard);
    infoCard.appendChild(name);
    infoCard.appendChild(place);
    infoCard.appendChild(date);
    infoCard.appendChild(bar);


    // ICONO GRATUITO / DE PAGO
    let freeIconContainer = document.createElement("div");
    freeIconContainer.className = "tooltip";
    let freeIcon = document.createElement("img");
    let freeIconText = document.createElement("span");
    freeIconText.className = "tooltip-text";
    photoEvent.appendChild(freeIconContainer);
    freeIconContainer.appendChild(freeIcon);
    freeIconContainer.appendChild(freeIconText);

    if (listEvents[position].free) {
      freeIconText.textContent = "Evento GRATUITO";
      freeIcon.src = "./img/icons/gratis.svg";
      freeIcon.alt = "Evento GRATUITO";
    } else {
      freeIconText.textContent = "Evento de PAGO";
      freeIcon.src = "./img/icons/Pago-euro.svg";
      freeIcon.alt = "Evento de PAGO";
    }
    // ICONO BENÉFICO
    if (listEvents[position].charity) {
      let charityIconContainer = document.createElement("div");
      let charityIcon = document.createElement("img");
      let charityIconText = document.createElement("p");
      charityIconText.textContent = "Benéfico";
      charityIcon.src = "./img/icons/Charity.svg";
      bar.appendChild(charityIconContainer);
      charityIconContainer.appendChild(charityIcon);
      charityIconContainer.appendChild(charityIconText);
    }
    // ICONOS DE CATEGORÍAS
    for (let cat in listEvents[position].category) {
      let categoryIconContainer = document.createElement("div");
      let categoryIcon = document.createElement("img");
      let categoryIconInfo = document.createElement("p");
      switch (listEvents[position].category[cat]) {
        case "Christmas":
          categoryIconInfo.textContent = "Navidad";
          categoryIcon.src = "./img/icons/Navidad.svg";
          break;
        case "Kids":
          categoryIconInfo.textContent = "Infantil";
          categoryIcon.src = "./img/icons/Kids.svg";
          break;
        case "Play":
          categoryIconInfo.textContent = "Lúdico";
          categoryIcon.src = "./img/icons/Play.svg";
          break;
        case "Music":
          categoryIconInfo.textContent = "Música";
          categoryIcon.src = "./img/icons/Music.svg";
          break;
        case "Sports":
          categoryIconInfo.textContent = "Deporte";
          categoryIcon.src = "./img/icons/Sports.svg";
          break;
        case "Theatre":
          categoryIconInfo.textContent = "Teatro";
          categoryIcon.src = "./img/icons/Theatre.svg";
          break;
        case "Party":
          categoryIconInfo.textContent = "Fiestas";
          categoryIcon.src = "./img/icons/Cocktail.svg";
          break;
        case "Food":
          categoryIconInfo.textContent = "Gastronómico";
          categoryIcon.src = "./img/icons/Food.svg";
          break;
        case "Museum":
          categoryIconInfo.textContent = "Museo";
          categoryIcon.src = "./img/icons/Museum.svg";
          break;
        default:
          console.error(`Hay ninguna categoria con ese nombre ${listEvents[position].category[cat]}`)
          break;
      }
      bar.appendChild(categoryIconContainer);
      categoryIconContainer.appendChild(categoryIcon);
      categoryIconContainer.appendChild(categoryIconInfo);
    }
  }
}

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function dataModal(e) {
  //La e selecciona el ID del evento y lo pasa a createModal para generar el modal.
  const idOfEvent = e.currentTarget.dataset.id;
  createEventModal(idOfEvent);
}

function createPopUpModal() {
  //QUITAR EL SCROLL DEL BODY
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  const modalWindow = document.querySelector("main");
  // ZONA OSCURA
  let modalBox = document.createElement("div");
  modalBox.className = "modal-container";
  modalWindow.appendChild(modalBox);
  // VENTANA
  let modal = document.createElement("div");
  modal.className = "modal";
  modalBox.appendChild(modal);
  // BOTÓN DE CIERRE
  let closeButton = document.createElement("img");
  closeButton.className = "close";
  closeButton.src = "./img/icons/xmark-solid.svg";
  closeButton.alt = "Cerrar";
  modal.appendChild(closeButton);
  // FUNCIONALIDAD DEL MODAL
  closeButton.addEventListener("click", () => {
    modalBox.remove();
    body.classList.remove("overflow-hidden");
  });
  window.addEventListener("click", (e) => {
    if (e.target == modalBox) {
      modalBox.remove();
      body.classList.remove("overflow-hidden");
    }
  });
}
function createRegister(modalisOpen = false) {
  const ContentModal = document.querySelector(".modal")
  const CloseButton = document.querySelector(".close")
  if (modalisOpen) {
    const register = document.querySelector(".register-form")
    register.remove();
  }
  const Register = /*html*/
    `
  <div class= "register-form flex flex-col">
    <p>Empieza</p>
    <p>¿Ya tienes una cuenta creada?<a href="#" onclick ="createLogin(true)">Entra</a></p>
    <form class= "flex flex-col">
      <label for="name-person">Nombre</label>
      <input type="text" name="name-person" required>
      <label for="nickname">Nombre de Usuario</label>
      <input type="text" name="nickname" required>
      <label for="password">Contraseña</label>
      <input type="password" name="password" required>
      <label for="repeat-password">Repite la contraseña</label>
      <input type="password" name="repeat-password" required>
      <button>Crear Cuenta</button>
    </form>
    </div>
  `
  CloseButton.insertAdjacentHTML("beforebegin", Register)
}
function createLogin(modalisOpen = false) {
  const ContentModal = document.querySelector(".modal")
  const CloseButton = document.querySelector(".close")
  if (modalisOpen) {
    const register = document.querySelector(".register-form")
    register.remove();
  }
  const LoginIn = /*html*/`
  <div class= "login-form flex flex-col">
    <p>Entra</p>
    <p>¿Aún no tienes cuenta?<a href="#" onclick ="createRegister(true)">Registrate aqui</a></p>
    <form class= "flex flex-col">
      <label for="nickname">Nombre de Usuario</label>
      <input type="text" name="nickname" required>
      <label for="password">Contraseña</label>
      <input type="password" name="password" required>
      <button>Login </button>
    </form>
  </div>
  `
  CloseButton.insertAdjacentHTML("beforebegin", LoginIn)
}
document.querySelector(".sign-in").addEventListener("click", () => {
  createPopUpModal()
  createRegister();
})
document.querySelector(".log-in").addEventListener("click", () => {
  createPopUpModal();
  createLogin();
})
function createEventModal(id) {
  createPopUpModal();
  const ContentModal = document.querySelector(".modal")
  const CloseButton = document.querySelector(".close")
  let dataEvent = currentListEvents.find((el) => el.id === id);
  // IMAGEN
  let fatherModalImagen = document.createElement("div");
  fatherModalImagen.className = "modal-image";
  let modalImage = document.createElement("img");
  modalImage.src = dataEvent.photoEvent;
  // añadimos la clase "landscape" al modal de imágenes apaisadas
  if (modalImage.naturalWidth > modalImage.naturalHeight) {
    fatherModalImagen.className = "modal-image landscape";
  }
  fatherModalImagen.appendChild(modalImage);
  ContentModal.insertBefore(fatherModalImagen, CloseButton);
  // ZONA DE TEXTO
  let modalText = document.createElement("div");
  modalText.className = "modal-text";
  ContentModal.insertBefore(modalText, CloseButton);
  // NOMBRE
  let modalName = document.createElement("p");
  modalName.innerText = dataEvent.nameEvent;
  modalText.appendChild(modalName);
  // LUGAR
  let modalPlace = document.createElement("p");
  modalPlace.innerText = dataEvent.site;
  modalText.appendChild(modalPlace);
  // FECHA
  let modalDate = document.createElement("p");
  let dateStartModal = dateFormat(dataEvent.dateStart);
  modalDate.innerText = dateStartModal;

  // FECHA FINAL
  if (dataEvent.hasOwnProperty("dateFinal")) {
    let dateFinalModal = dateFormat(dataEvent.dateFinal);
    modalDate.innerText = `Del ${dateStartModal} al ${dateFinalModal}`;
  }
  modalText.appendChild(modalDate);
  // DESCRIPCIÓN
  if (dataEvent.hasOwnProperty("comments")) {
    let description = document.createElement("p");
    if (dataEvent.comments.length > 174) {
      description.innerText = dataEvent.comments.substring(0, 173) + "...";
    } else {
      description.innerText = dataEvent.comments;
    }
    modalText.appendChild(description);
  }
  //BOTÓN ADD CALENDAR
  let btnCalendar = document.createElement("a");
  btnCalendar.className = "btn-addCalendar py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded";
  btnCalendar.textContent = "Añadir al calendario";
  btnCalendar.target = "blank"
  btnCalendar.dataset.name = id;
  btnCalendar.addEventListener("click", requestCalendar);
  modalText.appendChild(btnCalendar);
}

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month, dateShort = false) {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let monthFormat = monthNames[month.getMonth()]
  let year = month.getFullYear()
  if (dateShort) {
    monthFormat = monthFormat.toUpperCase().substring(0, 3)
  }
  return `${month.getDate()} ${monthFormat} ${year} `;
}

//Comprobar los de todo el año
function allYear(dateFrom, dateTo) {
  let dateFromNoYear = dateFrom.substr(0, 5)
  let dateToNoYear = dateTo.substr(0, 6)

  return (dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC");
}

//Funciones para el botón de favoritos
let arrayBookMark = [];
//Functions for LocalStorage
const saveLocalStorage = () => localStorage.setItem("bookmark", JSON.stringify(arrayBookMark));

function selectedBookmark(e) {
  e.stopPropagation();
  const bookmarkSelected = "/img/icons/bookmark-selected.svg";
  const bookmarkNormal = "/img/icons/bookmark.svg";
  const idBookmark = e.currentTarget.dataset.name;
  let index = allEvents.findIndex((el) => el.id === idBookmark);
  allEvents[index].bookmark = !allEvents[index].bookmark;
  if (allEvents[index].bookmark === true) {
    e.currentTarget.src = bookmarkSelected;
    arrayBookMark.push(idBookmark)
  } else if (allEvents[index].bookmark === false) {
    e.currentTarget.src = bookmarkNormal;
    let indexB = arrayBookMark.findIndex((el) => el === idBookmark);
    arrayBookMark.splice(indexB, 1);
  }
  saveLocalStorage();
}

// Función del slider de logos de patrocinadores
const Sponsors = document.querySelectorAll(".container-img > img");

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

// BOTÓN PARA SUBIR AL INICIO DE LA WEB
const BtnUp = document.getElementById("btn-up");
BtnUp.addEventListener("click", scrollUp);

// Funcion que cuando hay scroll hace una animacion para subir al top
function scrollUp() {
  let currentScroll = document.documentElement.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollUp);
    window.scrollTo(0, currentScroll - (currentScroll / 8));
  }
}

// Funcion para que el btn-up no aparezca si no se ha hecho scroll

window.onscroll = () => {
  let scroll = document.documentElement.scrollTop;
  if (scroll > 500) {
    BtnUp.style.transform = "scale(1)";
  } else if (scroll < 500) {
    BtnUp.style.transform = "scale(0)";
  }
}

// función que muestra los eventos filtrados
function resetAndCreateEventsFiltered(listFiltered) {
  const resetContent = document.querySelector(".container");
  resetContent.innerHTML = "";
  if (listFiltered.length === [].length) {
    console.error("No hay eventos ni página de 404");
  } else {
    createEvent(resetContent, listFiltered);
  }
}

// función de filtrar por fecha
const btnEvent = document.querySelector("#submit");
btnEvent.addEventListener("click", (e) => {
  e.preventDefault();
  let start = document.querySelector("#start").value;
  let final = document.querySelector("#final").value;
  if (start && final) {
    const dateFrom = new Date(start);
    const dateTo = new Date(final);
    // * He cambiado la variable por una global para que funcione con la paginación
    listFilterDates = currentListEvents.filter(event => {
      if (event.dateFinal) {
        return (event.dateStart.getTime() >= dateFrom.getTime() && event.dateStart.getTime() <= dateTo.getTime()) ||
          (event.dateFinal.getTime() >= dateFrom.getTime() && event.dateFinal.getTime() <= dateTo.getTime()) ||
          (event.dateStart.getTime() <= dateFrom.getTime() && event.dateFinal.getTime() >= dateTo.getTime());
      } else {
        return (event.dateStart.getTime() >= dateFrom.getTime() && event.dateStart.getTime() <= dateTo.getTime());
      }
    });
    /*
    * El evento:
    * - Empieza en el rango
    * - Termina en el rango
    * - Dura más que el rango
    */
    activeCategory = "date";
    resetAndCreateEventsFiltered(listFilterDates);
  }
});

// Funciones de cambio de estilo y filtrado por categoria
const DivFilterCategory = document.querySelectorAll(".navegation > div");

const ChangeStyleAndFilter = (div) => {
  div.addEventListener("click", (e) => {
    const navSelected = "flex justify-center items-center py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded";
    const navUnselected = "flex justify-center items-center py-1 px-2 cursor-pointer  bg-dark rounded";
    DivFilterCategory.forEach(div => div.className = navUnselected);

    div.className = navSelected;
    const idCategory = e.currentTarget.id;
    //Cambio Color SVG
    document.querySelectorAll(`svg >path`).forEach(path => path.classList.remove("fill-dark")); // Pasan todos a Blanco
    document.querySelectorAll(`#icon-${idCategory} >path`).forEach(path => path.classList.add("fill-dark")) //El seleccionado pasa Azul
    activeCategory = idCategory;
    filterByCategory(idCategory)
  })
}
const filterByCategory = (category) => {
  switch (category) {
    case "all":
      let list = [...allEvents];
      pagination(list);
      list = divideListEventForPagination(1, list);
      resetAndCreateEventsFiltered(list);
      break;
    case "bookmark":
      let listBookmark = allEvents.filter(events => events.bookmark);
      pagination(listBookmark);
      listBookmark = divideListEventForPagination(1, listBookmark);
      resetAndCreateEventsFiltered(listBookmark);
      break;
    default:
      let listCategoryEvent = allEvents.filter(events => events.category.includes(category));
      pagination(listCategoryEvent);
      listCategoryEvent = divideListEventForPagination(1, listCategoryEvent);
      resetAndCreateEventsFiltered(listCategoryEvent);
      break;
  }
}
DivFilterCategory.forEach(ChangeStyleAndFilter);
const pageSelected = "px-4 py-2 bg-dark text-light font-bold cursor-pointer border border-dark rounded ";
const pageUnSelected = "px-4 py-2 bg-light text-dark font-bold cursor-pointer border border-dark rounded hover:bg-dark hover:text-light ";

function pagination(listEvents) {
  const containerNavPages = document.querySelector(".pagination");
  while (containerNavPages.hasChildNodes()) {
    containerNavPages.firstChild.remove();
  }
  const result = listEvents.length / 12;
  let numberPages;
  if (result === Math.trunc(result)) {
    // para listas que sean múltiplos de 12 (12, 24, 36...)
    numberPages = Math.trunc(result) - 1;
  } else {
    numberPages = Math.trunc(result);
  }
  for (let page = 0; page <= numberPages; page++) {
    const anchor = document.createElement("a");
    anchor.textContent = page + 1;
    anchor.className = page === 0 ? pageSelected : pageUnSelected;
    anchor.addEventListener("click", changePagination);
    containerNavPages.appendChild(anchor);
  }
}
function divideListEventForPagination(numberPage) {
  let list = [];
  switch (activeCategory) {
    case "all":
      list = [...allEvents];
      break;
    case "date":
      list = [...listFilterDates]
      break;
    case "bookmark":
      list = allEvents.filter(event => event.bookmark)
      break;
    default:
      list = allEvents.filter(event => event.category.includes(activeCategory));
  }
  let min = 12 * (numberPage - 1);
  let max = (min + 11) > list.length ? list.length : min + 11;
  return list = list.slice(min, max + 1);
}
function changePagination(e) {
  document.querySelectorAll(".pagination a").forEach(a => a.className = pageUnSelected);
  e.currentTarget.className = e.currentTarget.className === pageSelected ? pageUnSelected : pageSelected;
  const listPagination = divideListEventForPagination(Number(e.currentTarget.textContent));
  resetAndCreateEventsFiltered(listPagination)
}
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("bookmark") != null) {
    let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
    arrayBookMark = uploadEvents;
  }
  createAll();
  responsiveFooter();
});

const requestCalendar = (e) => {
  e.preventDefault;
  e.stopPropagation;
  const BtnId = e.currentTarget.dataset.name;
  let dataEvent = currentListEvents.find((el) => el.id === BtnId);
  let start = moment(dataEvent.dateStart).format("YYYYMMDD");
  let end = moment(dataEvent.dateStart).add(1, "days").format("YYYYMMDD");
  if (dataEvent.hasOwnProperty("dateFinal")) {
    end = moment(dataEvent.dateFinal).add(1, "days").format("YYYYMMDD");
  }
  const URL = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${dataEvent.nameEvent}&location=${dataEvent.site}&dates=${start}/${end}`;
  window.open(URL, "_blank")
}

// desplegar menú de la hamburguesa
const hamburguer = document.querySelector(".hamburguer");
hamburguer.addEventListener("click", () => {
  // animación de la hamburguesa
  const bar1 = document.querySelector(".bar-1");
  const bar2 = document.querySelector(".bar-2");
  const bar3 = document.querySelector(".bar-3");
  bar1.classList.toggle("rotate-45");
  bar1.classList.toggle("-translate-y-1.5");
  bar2.classList.toggle("opacity-0");
  bar3.classList.toggle("-rotate-45");
  bar3.classList.toggle("translate-y-1.5");
  // quitar scroll del body
  const body = document.querySelector("body");
  body.classList.toggle("overflow-hidden");
  // mostrar botones
  const login = document.querySelector(".log-in");
  login.classList.toggle("hidden");
  const signin = document.querySelector(".sign-in");
  signin.classList.toggle("hidden");
});
