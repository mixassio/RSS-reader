import axios from 'axios';
import RssList from './RssList';
import exampleState from './stateExample';


const state = {
  chanels: [],
  registrationProcess: {
    valid: true,
    submitDisabled: true,
  },
};


const proxy = 'https://cors-anywhere.herokuapp.com/';
const link = 'http://news.yandex.ru/religion.rss';

export default () => {
  axios.get(`${proxy}${link}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then((data) => {
      console.log(data);
    });
  const element = document.getElementById('accordionExample');
  const obj = new RssList(element);
  console.log('egegey', new Date());
  obj.init();
  obj.render(exampleState);

  const input = document.getElementById('inlineFormInput');
  const submit = document.querySelector('.submit');
  const form = document.querySelector('form');
  form.addEventListener('submit', e => e.preventDefault());
  const linksRss = new Set(exampleState.chanels.map(el => el.link));
  input.addEventListener('keyup', () => {
    if (input.value === '') {
      exampleState.registrationProcess.valid = true;
      exampleState.registrationProcess.submitDisabled = true;
    } else if (linksRss.has(input.value)) {
      exampleState.registrationProcess.valid = false;
      exampleState.registrationProcess.submitDisabled = true;
    } else {
      exampleState.registrationProcess.valid = true;
      exampleState.registrationProcess.submitDisabled = false;
    }
    obj.render(exampleState);
  });
  submit.addEventListener('click', () => {
    axios.get(`${proxy}${link}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then((data) => {
        console.log(data);
        exampleState.temp = data;
      })
      .then(() => obj.render(exampleState));
  });
};
