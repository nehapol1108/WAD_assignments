const add_user = document.querySelector('.add_user_btn');
const close_modal = document.querySelector('.close_btn');
let submit_btn = document.getElementById('submit_btn');
const modal = document.getElementById('modal_container');
add_user.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
});
close_modal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'none';
});
submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const city = document.getElementById('city').value;
  const phone = document.getElementById('phone').value;
  let postObject = {
    email,
    password,
    name,
    phone,
    username,
    address: {
      city: city,
    },
  };
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/request');
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.send(postObject);
  xhr.onload = () => {
    if (xhr.status == 201) {
      console.log('Hello inside post ajax ');
      let storedUser = JSON.parse(localStorage.getItem('users'));
      storedUser.unshift(postObject);
      localStorage.setItem('users', JSON.stringify(storedUser));
      displayData();
    }
  };
  modal.style.display = 'none';
});
let fetchData = () => {
  let httprequest = new XMLHttpRequest();
  httprequest.open('GET', 'http://localhost:3000/request');
  httprequest.send();
  httprequest.onload = () => {
    console.log('Hello inside get ajax ');
    let res = JSON.parse(httprequest.responseText);
    localStorage.setItem('users', JSON.stringify(res));
    displayData();
  };
};
let displayData = () => {
  let tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  let storedUser = JSON.parse(localStorage.getItem('users'));
  storedUser.map(
    (user, index) =>
      (tbody.innerHTML += `
<tr>
<td>${index + 1}</td>
<td>${user.name}</td>
<td>${user.username}</td>
<td>${user.email}</td>
<td>${user.phone}</td>
<td>${user.address.city}</td>
</tr>`)
  );
};
//initial Data
fetchData();
