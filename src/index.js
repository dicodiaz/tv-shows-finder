import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomepageDom from './HomepageDom.js';
import Involvement from './Involvement.js';
import ModalDom from './ModalDom.js';
import './styles.css';
import TvMaze from './TvMaze.js';

const modal = document.querySelector('#modal');
const modalBody = modal.querySelector('.modal-body');
const searchBar = document.querySelector('#search-bar');
const form = document.querySelector('#form');
const searchBtn = document.querySelector('#search-btn');
const welcomeMsg = document.querySelector('#welcome-msg');

window.onload = () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  searchBtn.addEventListener('click', () => {
    if (searchBar.value !== '') {
      TvMaze.singleSearch(searchBar.value).then((show) => {
        if (show) {
          TvMaze.getEpisodes(show.id).then((episodes) => {
            HomepageDom.insertEpisodes(episodes, show.id);
            Involvement.getLikes().then((likes) => {
              HomepageDom.insertLikesCount(likes);
            });
          });
          welcomeMsg.classList.add('d-none');
        } else {
          document.querySelector('.card-wrapper').innerHTML = '';
          welcomeMsg.classList.remove('d-none');
          welcomeMsg.innerText = `No show found with the name "${searchBar.value}". Please try again.`;
        }
        searchBar.value = '';
      });
    }
  });
  searchBar.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) searchBtn.click();
  });
  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const episodeId = Number(button.getAttribute('data-bs-episodeId'));
    const showId = Number(button.getAttribute('data-bs-showId'));
    ModalDom.insertFormSection(modalBody, episodeId);
    TvMaze.getEpisode(episodeId, showId).then((episode) => {
      ModalDom.insertDetailsSection(modalBody, episode);
      Involvement.getComments(episodeId).then((comments) => {
        ModalDom.insertCommentSection(modalBody).insertComments(modalBody, comments);
      });
    });
  });
};
