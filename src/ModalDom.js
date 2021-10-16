import Involvement from './Involvement.js';

export default class ModalDom {
  static insertDetailsSection = (container, episode) => {
    container.insertAdjacentHTML(
      'afterbegin',
      `<section class="row g-0 justify-content-center text-center">
    <div class="justify-content-end mb-2">
    <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="col-sm-11 col-lg-9 col-xl-6 mb-2">
    <img class="img-fluid" src="${
      episode.image && episode.image.original ? episode.image.original : ''
    }" alt="${episode.name}"></img>
    </div>
    <h2 class="mb-0 display-6">${episode.name}</h2>
    <div class="row row-cols-2 gy-1 mb-2 fw-bold">
    <span>S0${episode.season}E0${episode.number}</span>
    <span>Release: ${episode.airdate}</span>
    <span></span>
    <span>${episode.runtime} minutes</span>
    </div>
    ${episode.summary}
    </section>`,
    );
    return this;
  };

  static insertFormSection = (container, episodeId) => {
    container.innerHTML = `<section class="text-center">
    <h3>Add a comment</h3>
    <div class="row justify-content-center">
    <form class="col-sm-11 col-lg-9 col-xl-6">
    <input id="name" type="text" class="form-control my-2" placeholder="Your name"></input>
    <textarea id="comment" class="form-control my-2" placeholder="Your insights" rows="5"></textarea>
    <button id="submit-btn" type="button" class="btn btn-primary my-2">Comment</button>
    </form>
    </div>
    </section>`;

    const name = container.querySelector('#name');
    const comment = container.querySelector('#comment');
    const submitBtn = container.querySelector('#submit-btn');

    submitBtn.addEventListener('click', () => {
      if (name.value !== '' && comment.value !== '') {
        const data = { item_id: episodeId, username: name.value, comment: comment.value };
        Involvement.postComment(data).then((ok) => {
          if (ok) {
            Involvement.getComments(episodeId).then((comments) => {
              this.clearComments(container).insertComments(container, comments);
            });
          }
        });
        name.value = '';
        comment.value = '';
      }
    });

    return this;
  };

  static insertCommentSection = (container) => {
    container.firstChild.insertAdjacentHTML('afterEnd', '<section id="comment-section"></section>');
    return this;
  };

  static insertComments = (parentContainer, comments) => {
    const numberOfComments = this.getNumberOfComments(comments);
    const commentSection = parentContainer.querySelector('#comment-section');
    commentSection.innerHTML = `<div class="row justify-content-center mb-3">
        <h3 class="text-center">Comments (${numberOfComments})</h3>
        <div id="comment-list" class="col-sm-11 col-lg-9 col-xl-6"></div>
        </div>`;
    if (numberOfComments > 0) {
      const commentList = commentSection.querySelector('#comment-list');
      comments.forEach((comment) => {
        const date = new Date(comment.creation_date);
        date.setDate(date.getDate() + 1);
        commentList.insertAdjacentHTML(
          'beforeend',
          `<p class="mb-1">${date.toLocaleDateString('es-co')} ${comment.username}: ${
            comment.comment
          }</p>`,
        );
      });
    }
    return this;
  };

  static clearComments = (container) => {
    container.querySelector('#comment-section').innerHTML = '';
    return this;
  };

  static getNumberOfComments = (comments) => comments.length || 0;
}
