import RssList from './RssList';
import exampleState from './stateExample';

const state = {
  chanels: [
    {
      id: 1,
      title: 'title chanel',
      link: 'www.hexlet.io',
      news: [
        {
          id: 1,
          title: 'title news',
          description: 'description news',
          link: 'www.hexlet.io',
        },
      ],
    },
  ],
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
};
