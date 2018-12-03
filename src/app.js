import axios from 'axios';
import { uniqueId } from 'lodash';
import $ from 'jquery';
import isURL from 'validator/lib/isURL';
import WatchJS from 'melanke-watchjs';
// import { getNewChannel, proxy } from './lib';
import {
  renderChanels, renderModal, renderSuccess, renderTop,
} from './renderers';

export const proxy = 'https://cors-anywhere.herokuapp.com/';

export const getNewChannel = (XMLdata, linkChannel) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(XMLdata, 'application/xml');
  const items = doc.querySelectorAll('item');
  const channel = doc.querySelector('channel');
  const titleChannel = channel.querySelector('title').textContent;
  return {
    id: uniqueId(),
    title: titleChannel,
    link: linkChannel,
    news: [...items].map(item => ({
      title: item.querySelector('title').textContent,
      desription: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    })),
  };
};


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
    success: uniqueId(),
    refrash: false,
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
      .then(({ data }) => getNewChannel(data, input.value))
      .then((newChannel) => {
        state.linksRss.add(input.value);
        state.chanels.push({ ...newChannel, link: input.value });
        state.registrationProcess.submitDisabled = true;
        state.refrash = true;
      })
      .catch(() => {
        state.registrationProcess.submitDisabled = true;
        state.success = uniqueId();
      });
  });

  $('#modalDescription')
    .on('show.bs.modal', showModalHandler)
    .on('hide.bs.modal', hideModalHandler);

  const refresh = () => {
    const promises = state.chanels.map(el => el.link).map((address) => {
      console.log('1', address);
      return axios.get(`${proxy}${address}`).then(({ data }) => getNewChannel(data, address));
    });
    Promise.all(promises).then((responses) => {
      console.log('2', responses);
      responses.forEach((updChannel) => {
        console.log('3', state.chanels);
        const [oldChannel] = state.chanels.filter(el => el.link === updChannel.link);
        console.log(oldChannel);
        const oldNews = new Set(oldChannel.news.map(el => el.link));
        console.log('3,5', oldNews);
        const addNews = updChannel.news.reduce((acc, channel) => {
          if (!oldNews.has(channel.link)) {
            return [...acc, { channel }];
          }
          return acc;
        }, []);
        console.log('4', addNews);
        oldChannel.news = oldChannel.news.concat(addNews);
      });
      setTimeout(refresh, 5000);
    });
  };

  const { watch } = WatchJS;
  watch(state, 'registrationProcess', () => renderTop(state));
  watch(state, 'chanels', () => renderChanels(state));
  watch(state, 'success', () => renderSuccess());
  watch(state, 'modal', () => renderModal());
  watch(state, 'refrash', () => setTimeout(refresh, 5000));
};
