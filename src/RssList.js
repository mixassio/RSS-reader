
export default class RssList {
  constructor(element) {
    this.element = element;
    console.log('constructor', new Date());
  }

  init() {
    this.element.textContent = 'There will be your rss-chanell';
  }

  addChanel({
    id, title, link, news,
  }) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    const cardHeadEl = document.createElement('div');
    cardHeadEl.setAttribute('id', `heading${id}`);
    cardHeadEl.setAttribute('class', 'card-header');
    cardEl.appendChild(cardHeadEl);
    const h5El = document.createElement('h5');
    h5El.classList.add('mb-0');
    cardHeadEl.appendChild(h5El);
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('btn', 'btn-link');
    buttonEl.setAttribute('type', 'button');
    buttonEl.setAttribute('data-toggle', 'collapse');
    buttonEl.setAttribute('data-target', `#collapse${id}`);
    buttonEl.setAttribute('aria-expanded', 'true');
    buttonEl.setAttribute('aria-controls', `collapse${id}`);
    buttonEl.textContent = title;
    h5El.appendChild(buttonEl);
    const collapseEl = document.createElement('div');
    collapseEl.setAttribute('id', `collapse${id}`);
    collapseEl.setAttribute('class', 'collapse');
    collapseEl.setAttribute('aria-labelledby', `heading${id}`);
    collapseEl.setAttribute('data-parent', '#accordionExample');
    cardEl.appendChild(collapseEl);
    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');
    collapseEl.appendChild(cardBodyEl);
    const ulNewsEl = document.createElement('ul');
    ulNewsEl.classList.add('list-group');
    cardBodyEl.appendChild(ulNewsEl);
    news.forEach((element) => {
      const liNewsEl = document.createElement('li');
      liNewsEl.classList.add('list-group-item');
      liNewsEl.textContent = element.title;
      ulNewsEl.appendChild(liNewsEl);
    });
    this.element.appendChild(cardEl);
  }

  render(state) {
    console.log(state);
    const input = document.getElementById('inlineFormInput');
    const submit = document.querySelector('.submit');
    submit.disabled = state.registrationProcess.submitDisabled;
    if (state.registrationProcess.valid) {
      input.style.border = null;
    } else {
      input.style.border = 'thick solid red';
    }
    const { chanels } = state;
    chanels.forEach((chanel) => {
      this.addChanel(chanel);
    });
    return this.element;
  }
}
