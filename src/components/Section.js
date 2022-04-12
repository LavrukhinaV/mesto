export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._initialArray.forEach(item => this._renderer(item));
  }

  addItemPrependElement(element) {
    this._container.prepend(element);
  }

  addItemAppendElement(element) {
    this._container.append(element);
  }
}