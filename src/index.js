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
const showInfo = document.querySelector('#show-info');

window.onload = () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  searchBtn.addEventListener('click', () => {
    const searchBarValue = searchBar.value;
    searchBar.value = '';
    if (searchBarValue !== '') {
      TvMaze.singleSearch(searchBarValue).then((show) => {
        if (show) {
          TvMaze.getEpisodes(show.id).then((episodes) => {
            HomepageDom.insertEpisodes(episodes, show.id).insertShowInfo(show, episodes, showInfo);
            Involvement.getLikes().then((likes) => {
              HomepageDom.insertLikesCount(likes);
            });
          });
          welcomeMsg.classList.add('d-none');
        } else {
          showInfo.innerText = '';
          document.querySelector('.card-wrapper').innerHTML = '';
          welcomeMsg.classList.remove('d-none');
          welcomeMsg.innerText = `No show found with the name "${searchBarValue}". Please try again.`;
        }
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
