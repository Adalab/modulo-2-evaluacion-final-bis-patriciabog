'use strict';
const usersList = document.querySelector('.js-users');
const url ="https://randomuser.me/api/?results=10";
const btnSave = document.querySelector('.js-btn-save');
const btnRecover = document.querySelector('.js-btn-recover');

let usersData = [];

//1.-Listado de usuarios
 fetch(url)
   .then(response => response.json())
   .then(data => {
      usersData = data.results;
      renderUserList(usersData); 
   });

function renderUserList(usersData) {
    for(const data of usersData) {
       usersList.innerHTML += renderUser(data)
    }
    addEventToUser()
}

function renderUser(data) {
   console.log(data);
   if (data.isFriend === true) {
    //Si data.isFriend es true (marcado como amigo) pintamos a lista con la clase selected para que le de el color pink  
      let html = ` <li>
            <article class="user selected js-li-user" id=${data.login.username}>
               <h2 class="user__name">${data.name.first} ${data.name.last}</h2>
               <img class="user__img" src=${data.picture.medium} alt="image"/>
               <h3 class="user__city">${data.location.city}</h3>
               <h3 class="user__username">${data.login.username}</h3>
            <article/>
         </li>`;
      return html;
   }else {
      //Si No pintamos la lista sin la clase selected
        let html = ` <li>
           <article class="user js-li-user" id=${data.login.username}>
              <h2 class="user__name">${data.name.first} ${data.name.last}</h2>
              <img class="user__img" src=${data.picture.medium} alt="image"/>
              <h3 class="user__city">${data.location.city}</h3>
              <h3 class="user__username">${data.login.username}</h3> 
            <article/>
        </li>`;
      return html;
   }
}

//2.-Marcar como amigos
function handleClick(ev) {
   const idSelected = ev.currentTarget.id;
   const selectedFriend = usersData.find(user => user.login.username === idSelected);
   //Añadimos la propiedad isFriend = true a los objetos clicados
   selectedFriend.isFriend = true;
   console.log(selectedFriend);
   document.getElementById(idSelected).classList.toggle('selected');
   usersList.innerHTML = '';
   renderUserList(usersData);
}

function addEventToUser() {
   const liElements = document.querySelectorAll(".js-li-user");
   for(const li of liElements) {
   li.addEventListener("click", handleClick);
  }
}

//3.- Guardar/Recuperar del localStorag
function handleClickSave() {
   localStorage.setItem("usersList", JSON.stringify (usersData));
}

function handleClickRecover() {
   usersData = JSON.parse(localStorage.getItem("usersList"));
   usersList.innerHTML = '';
   renderUserList(usersData);
}

btnSave.addEventListener("click", handleClickSave)
btnRecover.addEventListener("click", handleClickRecover)
