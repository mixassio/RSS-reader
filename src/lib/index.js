import _ from 'lodash';

export const proxy = 'https://cors-anywhere.herokuapp.com/';

export const getNewChanell = XMLdata => Promise.resolve()
  .then(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(XMLdata, 'application/xml');
    const items = doc.querySelectorAll('item');
    const channel = doc.querySelector('channel');
    const titleChanell = channel.querySelector('title').textContent;
    const newChanell = {
      id: _.uniqueId(),
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
    return newChanell;
  });
