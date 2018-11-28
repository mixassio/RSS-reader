const app = () => {
  const state = {
    registrationProcess: {
      valid: true,
      submitDisabled: true,
    },
  };
  const input = document.querySelector('.phone');
  input.addEventListener('keyup', () => {
    if (input.value === '') {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = true;
    } else if (!input.value.match(/^\d+$/)) {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    } else {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = false;
    }

    render(state);
  });
};

const render = (state) => {
  const input = document.querySelector('.phone');
  const submit = document.querySelector('.submit');
  submit.disabled = state.registrationProcess.submitDisabled;
  if (state.registrationProcess.valid) {
    input.style.border = null;
  } else {
    input.style.border = 'thick solid red';
  }
};
