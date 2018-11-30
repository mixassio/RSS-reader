import axios from 'axios';
import _ from 'lodash';
import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';
import RssList from './RssList';
import { getNewChanell, proxy } from './lib';


export default () => {
  const state = {
    chanels: [],
    registrationProcess: {
      valid: true,
      submitDisabled: true,
    },
    linksRss: new Set(),
    success: _.uniqueId(),
  };

  const element = document.getElementById('accordionExample');
  const obj = new RssList(element);
  obj.init();
  obj.render(state);

  const input = document.getElementById('inlineFormInput');
  const submit = document.querySelector('.submit');
  const form = document.querySelector('form');

  form.addEventListener('submit', e => e.preventDefault());

  input.addEventListener('keyup', () => {
    if (input.value === '') {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = true;
    } else if (state.linksRss.has(input.value)) {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    } else if (!isURL(input.value)) {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    } else {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = false;
    }
  });

  submit.addEventListener('click', () => {
    axios.get(`${proxy}${input.value}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(({ data }) => getNewChanell(data))
      .then((newChanell) => {
        state.linksRss.add(input.value);
        state.chanels.push({ ...newChanell });
      })
      .catch(() => { state.success = _.uniqueId(); });
  });

  const { watch } = WatchJS;
  watch(state, 'registrationProcess', () => obj.renderTop(state));
  watch(state, 'chanels', () => obj.render(state));
  watch(state, 'success', () => obj.renderSuccess());
};
