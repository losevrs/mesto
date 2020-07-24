'use strict';

export default class Section {
  constructor(itemList, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = (item) => itemList.renderer(item);
    this._items = itemList.items
  }

  renderItems() {
    this._items.forEach(element => {
      const addItem = this._renderer(element);
      this._container.append(addItem);
    });
  }

  addItem(item) {
    const addItem = this._renderer(item);
    this._container.prepend(addItem);
  }
}
