import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';
import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';
import { getNewChannel, proxy } from './lib';
import {
  renderChanels, renderModal, renderSuccess, renderTop,
} from './renderers';

const showModalHandler = (e) => {
  const button = $(e.relatedTarget);
  const title = button.data('title');
  const description = button.data('description');
  const link = button.data('link');
  const modalLabel = $('#modalLabel');
  modalLabel.text(title);
  const pDescr = $('#pDescr');
  pDescr.text(description);
  const modalLink = $('#modalLink');
  modalLink.attr('href', link);
};

const hideModalHandler = () => $('li > button').css('box-shadow', 'none');

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

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.get(`${proxy}${input.value}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(({ data }) => getNewChannel(data))
      .then((newChannel) => {
        state.linksRss.add(input.value);
        state.chanels.push({ ...newChannel });
        state.registrationProcess.submitDisabled = true;
      })
      .catch(() => {
        state.registrationProcess.submitDisabled = true;
        state.success = _.uniqueId();
      });
  });

  $('#modalDescription')
    .on('show.bs.modal', showModalHandler)
    .on('hide.bs.modal', hideModalHandler);

  const { watch } = WatchJS;
  watch(state, 'registrationProcess', () => renderTop(state));
  watch(state, 'chanels', () => renderChanels(state));
  watch(state, 'success', () => renderSuccess());
  watch(state, 'modal', () => renderModal());
};
