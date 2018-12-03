const createModal = ({ id, title, desription }) => `
  <div id="#modalDescription${id}" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">${title}</h4>
      </div>
      <div class="modal-body">
        ${desription}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
      </div>
    </div>
  </div>
  </div>
`;

const createCard = ({ id, title }) => `
  <div class="card">
    <div id="heading${id}" class="card-header">
      <h5 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
          ${title}
        </button>
      </h5>
    </div>
    <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-parent="#accordionExample">
      <div class="card-body">
        <ul class="list-group"></ul>
      </div>
    </div>
  </div>
`;

const addNews = ({
  id, title, desription, link,
}) => `
  <li class="list-group-item">
    ${title}
    <button class="btn btn-primary modal-btn" type="button" data-toggle="modal" data-target="#modalDescription" data-id="#modalDescription${id}" data-title="${title}" data-description="${desription}" data-link="${link}">...</button>
  </li>
`;

const addChannel = ({
  id, title, news,
}) => {
  const element = document.getElementById('accordionExample');
  const card = document.createElement('div');
  card.innerHTML = createCard({ id, title });
  const ul = card.querySelector('.list-group');
  news.forEach((article) => {
    const li = document.createElement('li');
    li.innerHTML = addNews(article);
    li.classList.add('list-group-item');
    ul.appendChild(li.firstElementChild);
    const modal = document.createElement('div');
    modal.innerHTML = createModal(article);
    ul.appendChild(modal.firstElementChild);
  });
  element.appendChild(card.firstElementChild);
};

export default (state) => {
  console.log(state);
  const element = document.getElementById('accordionExample');
  element.innerHTML = '';
  const { chanels } = state;
  chanels.forEach((channel) => {
    addChannel(channel);
  });
  const form = document.querySelector('form');
  form.reset();
};
