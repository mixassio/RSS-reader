import _ from 'lodash';

export const proxy = 'https://cors-anywhere.herokuapp.com/';

export const getNewChannel = (XMLdata) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(XMLdata, 'application/xml');
  const items = doc.querySelectorAll('item');
  const channel = doc.querySelector('channel');
  const titleChannel = channel.querySelector('title').textContent;
  return {
    id: _.uniqueId(),
    title: titleChannel,
    news: [...items].map((item, id) => ({
      id,
      title: item.querySelector('title').textContent,
      desription: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    })),
  };
};
