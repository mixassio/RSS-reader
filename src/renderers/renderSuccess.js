
export default () => {
  const allertEl = document.createElement('div');
  allertEl.textContent = 'something was wrong';
  allertEl.classList.add('alert', 'alert-danger');
  allertEl.setAttribute('role', 'alert');
  const form = document.querySelector('form');
  form.reset();
  const element = document.getElementById('accordionExample');
  element.appendChild(allertEl);
};
