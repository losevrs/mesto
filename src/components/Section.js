export default class Section {
  constructor(itemList, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = (items, container) => itemList.renderer(items, container);
    this._items = itemList.items
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
