export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._renderItemBinded = this._renderItem.bind(this);
  }

  addItem(element) {
    this._renderItem(element);
  }

  _renderItem(item) {
    const template = this._renderer(item);
    this._container.prepend(template);
  }

  render() {
    this._items.forEach(this._renderItemBinded);
  }
}
