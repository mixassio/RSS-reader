
export default class RssList {
  constructor(element) {
    this.element = element;
  }

  init() {
    this.element.textContent = 'There will be your rss-chanell';
  }

  addChanel({
    id, title, news,
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
      const buttonLiEl = document.createElement('button');
      buttonLiEl.textContent = '...';
      buttonLiEl.classList.add('description-news');
      const liNewsEl = document.createElement('li');
      liNewsEl.classList.add('list-group-item');
      liNewsEl.textContent = element.title;
      liNewsEl.appendChild(buttonLiEl);
      // liNewsEl.setAttribute('href', element.link);
      ulNewsEl.appendChild(liNewsEl);
    });
    this.element.appendChild(cardEl);
  }

  renderTop(state) {
    console.log(state);
    const input = document.getElementById('inlineFormInput');
    const submit = document.querySelector('.submit');
    submit.disabled = state.registrationProcess.submitDisabled;
    if (state.registrationProcess.valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
    return this.element;
  }

  renderSuccess() {
    const allertEl = document.createElement('div');
    allertEl.textContent = 'something was wrong';
    allertEl.classList.add('alert', 'alert-danger');
    allertEl.setAttribute('role', 'alert');
    const form = document.querySelector('form');
    form.reset();
    this.element.appendChild(allertEl);
  }

  render(state) {
    console.log(state);
    this.element.innerHTML = '';
    const { chanels } = state;
    chanels.forEach((chanel) => {
      console.log('chanel', chanel);
      this.addChanel(chanel);
    });
    const form = document.querySelector('form');
    form.reset();
    return this.element;
  }

  renderModal() {
    const modalEl = document.createElement('div');
    modalEl.classList.add('modal');
    modalEl.setAttribute('role', 'dialog');

    const modalElDialog = document.createElement('div');
    modalElDialog.classList.add('modal-dialog');
    modalElDialog.setAttribute('role', 'document');
    modalEl.appendChild(modalElDialog);

    const modalElContent = document.createElement('div');
    modalElContent.classList.add('modal-content');
    modalElDialog.appendChild(modalElContent);

    const modalElHeader = document.createElement('div');
    modalElHeader.classList.add('modal-header');
    const h5El = document.createElement('h5');
    h5El.classList.add('modal-title');
    h5El.textContent = 'Modal title';
    const buttonClose = document.createElement('button');
    buttonClose.setAttribute('type', 'button');
    buttonClose.setAttribute('data-dismiss', 'modal');
    buttonClose.setAttribute('aria-label', 'Close');
    buttonClose.classList.add('close');
    const spanEl = document.createElement('span');
    spanEl.setAttribute('aria-label', 'Close');
    spanEl.textContent = '&times;';
    buttonClose.appendChild(spanEl);
    modalElHeader.appendChild(h5El);
    modalElHeader.appendChild(buttonClose);
    modalElContent.appendChild(modalElHeader);

    const modalBodyEl = document.createElement('div');
    modalBodyEl.classList.add('modal-body');
    const pEl = document.createElement('p');
    pEl.textContent = 'Modal body text goes here.';
    modalBodyEl.appendChild(pEl);
    modalElContent.appendChild(modalBodyEl);

    this.element.appendChild(modalEl);
  }
}
