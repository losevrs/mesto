export default class Section {
  constructor(itemList, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = (items, container) => itemList.renderer(items, container);
    this._items = itemList.items
  }

  renderItems() {
    this._renderer(this._items, this._container);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
