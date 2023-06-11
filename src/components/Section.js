import { page } from './constants.js';

export default class Section {
  constructor(containerSelector, renderer) {
    this._container = page.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }
}
