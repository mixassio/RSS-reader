
export default () => {
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

  const element = document.getElementById('accordionExample');
  element.appendChild(modalEl);
}
