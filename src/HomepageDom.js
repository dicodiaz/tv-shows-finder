import Involvement from './Involvement.js';

export default class HomepageDom {
  static insertEpisodes = (episodes, showId) => {
    if (episodes) {
      const episodesCount = this.getEpisodesCount(episodes);
      const episodesCountContainer = document.querySelector('#episodes-count');
      if (episodesCountContainer) episodesCountContainer.innerText = episodesCount;
      const cardWrapper = document.querySelector('#card-wrapper');
      cardWrapper.innerHTML = '';
      episodes.forEach((episode) => {
        const card = document.createElement('div');
        card.innerHTML = `<div class="p-3 h-100">
          <div class="card border h-100">
            <img src="${
              episode.image && episode.image.medium ? episode.image.medium : ''
            }" class="card-img-top" alt="${episode.name}"></img>
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="row mx-0 g-0 row-cols-2 justify-content-between align-items-center">
                <h5 class="flex-grow-1 px-2 mb-0">${episode.name}</h5>
                <div class="col-auto d-flex flex-column align-items-center px-2">
                  <a id="like${episode.id}" role="button"><i class="far fa-heart"></i></a>
                  <span><span id= "span${episode.id}" class="like-span"></span> likes</span>
                </div>
              </div>
              <div class="d-flex flex-column justify-content-between">
                <button class="btn btn-outline-dark m-3" data-bs-toggle="modal" data-bs-target="#modal" data-bs-episodeId="${
                  episode.id
                }" data-bs-showId="${showId}">Comments</button>
              </div>
            </div>
          </div>
        </div>`;
        cardWrapper.appendChild(card);

        const likeBtn = document.getElementById(`like${episode.id}`);
        likeBtn.addEventListener('click', () => {
          const data = { item_id: episode.id };
          Involvement.postLike(data).then((ok) => {
            if (ok) {
              this.updateSingleLikeCount(episode.id);
            }
          });
        });
      });
    }
    return this;
  };

  static insertLikesCount = (data) => {
    data.forEach((element) => {
      const likeSpan = document.getElementById(`span${element.item_id}`);
      if (likeSpan) likeSpan.innerText = element.likes;
    });
    const likeSpans = document.querySelectorAll('.like-span');
    likeSpans.forEach((likeSpan) => {
      likeSpan.innerText = likeSpan.innerText || 0;
    });
    return this;
  };

  static updateSingleLikeCount = (id) => {
    Involvement.getLikes().then((likes) => {
      const likeCount = likes.find((like) => like.item_id === id).likes;
      const likeSpan = document.getElementById(`span${id}`);
      likeSpan.innerHTML = likeCount;
    });
    return this;
  };

  static insertShowInfo = (show, episodes, container) => {
    const episodesCount = this.getEpisodesCount(episodes);
    container.innerText = `${show.name} (${episodesCount} episodes)`;
  };

  static getEpisodesCount = (episodes) => episodes.length;
}
