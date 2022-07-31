import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const LOCAL_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onInput, 500));

form.addEventListener('submit', onSubmit);

const formData = localStorage.getItem(LOCAL_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_KEY))
  : {};

function onInput({ target }) {
  formData[target.name] = target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onSubmit(ev) {
  ev.preventDefault();
  const keyParsed = JSON.parse(localStorage.getItem(LOCAL_KEY));
  const email = ev.currentTarget.elements.email.value;
  const message = ev.currentTarget.elements.message.value;
  if (email === '' || message === '') {
    return alert('Всі поля мають бути заповнені');
  }
  console.log(keyParsed);
  ev.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
}
function setFormValues() {
  const savedInfo = localStorage.getItem(LOCAL_KEY);

  if (savedInfo) {
    const data = JSON.parse(savedInfo);

    if (data.email) {
      form.elements.email.value = data.email;
    }
    if (data.message) {
      form.elements.message.value = data.message;
    }
  }
}
setFormValues();
