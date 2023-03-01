'use strict';

let usersList = document.querySelector('.js-users');
const url ="https://randomuser.me/api/?results=10";
const btnSave = document.querySelector('.js-btn-save');
const btnRecover = document.querySelector('.js-btn-recover');

let usersData = [];

/*
1.Listado de usuarios
  -Obtenemos 10 usuarios al azar de la API con fetch, lo limpiamos y seleccionamos name, img, city y username.
  -Guardamos los datos de los usuarios en un Array
  -Pintamos en el listado de usuarios con el innerHTML
*/
fetch(url)
   .then(response => response.json())
   .then(data => {
      console.log(data.results);
      usersData = data.results;
       renderUserList(usersData);
   });

function renderUserList(usersData) {
    for(const data of usersData) {
       usersList.innerHTML += renderUser(data)
    }//cuando termines de pintar le aña los eventos a esta data 
   addEventUser()
}

function renderUser(data) {
    let html = ` <li>
           <article class="js-li-user" id=${data.id}>
              <h2 class="user-name">${data.name.first} ${data.name.last}</h2>
              <img class="user-img" src=${data.picture.medium} alt="image"/>
              <h3 class="user-city">${data.location.city}</h3>
              <h3 class="user-username">${data.login.username}</h3>
            <article/>
        </li>`;
  //console.log(html);
  return html;
}


/*2.-Marcar como amigos
Cuando se haga click en uno de los usuarios:
1.- En el objeto del usuario clickado dentro del array, añadir una propiedad
para marcarlo como amigo, ej. isFriend:true.
2.-Volver a pintar el listado en pantalla:
   1.-Comprobar si cada ususario pintado es un amigo y en caso afirmativo pintar el color de fondo de otro comor.
*/
function handleClick(ev) {
   console.log(ev.currentTarget.id);
   ev.currentTarget.classList.toggle('selected');
   
//3.- Guardar(con push)/Recuperar del localStorage (con find)
 
  
}


function addEventUser() {
  const liElements = document.querySelectorAll(".js-li-user");
  for(const li of liElements) {
   // console.log(liElements);
   li.addEventListener("click", handleClick);
  }
}

//# sourceMappingURL=main.js.map
