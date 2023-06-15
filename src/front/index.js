const url = 'http://localhost:4400/';
const storeName = 'Sample';

function main() {
  console.log('Loaded');

  let state = {};

  const formElement = document.querySelector('.login-form');
  const logoutElement = document.querySelector('.logout');
  const buttonElement = document.querySelector('.show');

  const store = localStorage.getItem(storeName);
  if (store) {
    state.token = JSON.parse(store).token;
    formElement?.setAttribute('hidden', 'true');
    logoutElement?.setAttribute('hidden', 'false');
  }

  const login = async (event) => {
    event.preventDefault();
    const { elements } = event.target;

    const data = {
      user: elements.namedItem('user').value,
      password: elements.namedItem('password').value,
    };

    const urlLogin = url + 'user/login';
    const response = await fetch(urlLogin, {
      method: 'PATCH',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    state = await response.json();

    localStorage.setItem(storeName, JSON.stringify({ token: state.token }));
    formElement?.setAttribute('hidden', 'true');
    logoutElement?.removeAttribute('hidden');
    console.log(state);
  };

  const logout = async () => {
    localStorage.removeItem(storeName);
    state = {};
    formElement?.removeAttribute('hidden');
    logoutElement?.setAttribute('hidden', 'true');
  };

  const handleclick = async () => {
    if (!state.token) return;
    const urlBooks = url + 'books';
    const response = await fetch(urlBooks, {
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
    });
    const result = await response.json();
    console.log(result);
  };

  formElement.addEventListener('submit', login);
  buttonElement.addEventListener('click', handleclick);
  logoutElement.addEventListener('click', logout);
}

document.addEventListener('DOMContentLoaded', main);
