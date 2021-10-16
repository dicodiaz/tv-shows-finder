export default class TvMaze {
  static #ROOT_URL = 'https://api.tvmaze.com';

  static getEpisodes = async (showId) => {
    const url = `${this.#ROOT_URL}/shows/${showId}/episodes`;
    const response = await fetch(url);
    return response.json();
  };

  static getEpisode = async (episodeId, showId) => {
    const episodes = await this.getEpisodes(showId);
    return episodes.find((episode) => episode.id === episodeId);
  };

  static singleSearch = async (showName) => {
    const url = `${this.#ROOT_URL}/singlesearch/shows?q=:${showName}`;
    const response = await fetch(url);
    return response.json();
  };
}
