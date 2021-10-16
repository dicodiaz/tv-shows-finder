import HomepageDom from '../HomepageDom.js';
import TvMaze from '../__mocks__/TvMaze.js';

describe('Testing episodes counter', () => {
  test('Testing with a mock input of length 5', () => {
    TvMaze.getEpisodes().then((episodes) => {
      const episodesCount = HomepageDom.getEpisodesCount(episodes);
      expect(episodesCount).toBe(5);
    });
  });
});
