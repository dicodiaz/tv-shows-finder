export default class Involvement {
  static #ROOT_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

  static #APP_ID = 'Oy4ygJ5mBEBnH4ExavgC';

  static getComments = async (id) => {
    const url = `${this.#ROOT_URL}/apps/${this.#APP_ID}/comments?item_id=${id}`;
    const response = await fetch(url);
    return response.json();
  };

  static postComment = async (data) => {
    const url = `${this.#ROOT_URL}/apps/${this.#APP_ID}/comments`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  };
}
