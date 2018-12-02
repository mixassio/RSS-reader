
export default (state) => {
  const input = document.getElementById('inlineFormInput');
  const submit = document.querySelector('.submit');
  submit.disabled = state.registrationProcess.submitDisabled;
  if (state.registrationProcess.valid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
};
