import Involvement from './Involvement.js';

export default class HomepageDom {
  static insertEpisodes = (episodes, showId) => {
    if (episodes) {
      const episodesCount = this.getEpisodesCount(episodes);
      const episodesCountContainer = document.querySelector('#episodes-count');
      if (episodesCountContainer) episodesCountContainer.innerText = episodesCount;
      const cardWrapper = document.querySelector('.card-wrapper');
      cardWrapper.innerHTML = '';
      cardWrapper.id = `show-${showId}`;
      episodes.forEach((episode) => {
        const card = document.createElement('div');
        card.innerHTML = `<div id = "card${episode.id}" class="p-3">
          <div class="card border">
            <img src="${
              episode.image && episode.image.medium ? episode.image.medium : ''
            }" class="card-img-top" alt="${episode.name}"></img>
            <div class="card-body">
              <div class="d-flex flex-row justify-content-between">
              <h5 class="card-title">${episode.name}</h5>
              <div class="d-flex flex-column align-items-center">
                <a id="like${episode.id}" class="like"><i class="far fa-heart"></i></a>
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
  };

  static updateSingleLikeCount = (id) => {
    Involvement.getLikes().then((likes) => {
      const likeCount = likes.find((like) => like.item_id === id).likes;
      const likeSpan = document.getElementById(`span${id}`);
      likeSpan.innerHTML = likeCount;
    });
  };

  static getEpisodesCount = (episodes) => episodes.length;
}
