import RssList from './RssList';
import exampleState from './stateExample';

const state = {
  chanels: [],
  registrationProcess: {
    valid: true,
    submitDisabled: true,
  },
};


export default () => {
  const element = document.getElementById('accordionExample');
  const obj = new RssList(element);
  obj.init();
  obj.render(exampleState);

  const input = document.getElementById('inlineFormInput');
  const submit = document.querySelector('.submit');
  const linksRss = new Set(exampleState.chanels.map(el => el.link));
  console.log(linksRss);
  input.addEventListener('keyup', () => {
    if (input.value === '') {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = true;
    } else if (linksRss.has(input.value)) {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    } else {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = false;
    }
    obj.render(exampleState);
  });
  submit.addEventListener('click', () => {
    console.log(input.value);
    obj.render(exampleState);
  });
};
