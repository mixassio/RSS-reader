import axios from 'axios';
import isURL from 'validator/lib/isURL';
import RssList from './RssList';


const proxy = 'https://cors-anywhere.herokuapp.com/';
// surgeconst link = 'http://news.yandex.ru/religion.rss';
console.log(isURL('http://news.yandex.ru/religion.rss'), isURL('dsfda'));
export default () => {
  const state = {
    chanels: [],
    registrationProcess: {
      valid: true,
      submitDisabled: true,
    },
  };
  const element = document.getElementById('accordionExample');
  const obj = new RssList(element);
  console.log('egegey', new Date());
  obj.init();
  obj.render(state);

  const input = document.getElementById('inlineFormInput');
  const submit = document.querySelector('.submit');
  const form = document.querySelector('form');
  form.addEventListener('submit', e => e.preventDefault());
  const linksRss = new Set(state.chanels.map(el => el.link));
  input.addEventListener('keyup', () => {
    if (input.value === '') {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = true;
    } else if (linksRss.has(input.value)) {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    } else if (!isURL(input.value)) {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    } else {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = false;
    }
    obj.render(state);
  });
  submit.addEventListener('click', () => {
    axios.get(`${proxy}${input.value}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(({ data }) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'application/xml');
        const items = doc.querySelectorAll('item');
        const channel = doc.querySelector('channel');
        const titleChanell = channel.querySelector('title').textContent;
        const newChanell = {
          id: titleChanell.length, // заглушка
          title: titleChanell,
          news: [],
        };
        [...items].forEach((item, id) => {
          const article = {
            id,
            title: item.querySelector('title').textContent,
            desription: item.querySelector('description').textContent,
            link: item.querySelector('link').textContent,
          };
          newChanell.news.push({ ...article });
        });
        state.chanels.push({ ...newChanell });
      })
      .then(() => obj.render(state));
  });
};
