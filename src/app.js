import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';
import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';
import RssList from './RssList';
import { getNewChannel, proxy } from './lib';


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

  const submit = document.querySelector('.submit');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    axios.get(`${proxy}${input.value}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(({ data }) => getNewChannel(data))
      .then((newChanell) => {
        state.linksRss.add(input.value);
        state.chanels.push({ ...newChanell });
        state.registrationProcess.submitDisabled = true;
      })
      .catch(() => {
        state.registrationProcess.submitDisabled = true;
        state.success = _.uniqueId();
      });
  });

  $('.description-news').on('click', 'button.btn-primary', (e) => {
    console.log(e, e.target);
    state.modal = _.uniqueId();
  });

  console.log('jquery', $('.list-group-item').find('description-news'));
  const { watch } = WatchJS;
  watch(state, 'registrationProcess', () => obj.renderTop(state));
  watch(state, 'chanels', () => obj.render(state));
  watch(state, 'success', () => obj.renderSuccess());
  watch(state, 'modal', () => obj.renderModal());
};
