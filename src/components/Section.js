export default class Section {
  constructor(itemList, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = itemList.renderer.bind(this);
    this._items = itemList.items
  }

  renderItems() {
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
