import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';
import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';
import { getNewChannel, proxy } from './lib';
import {
  renderChanels, renderModal, renderSuccess, renderTop,
} from './render';


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
  watch(state, 'registrationProcess', () => renderTop(state));
  watch(state, 'chanels', () => renderChanels(state));
  watch(state, 'success', () => renderSuccess());
  watch(state, 'modal', () => renderModal());
};
