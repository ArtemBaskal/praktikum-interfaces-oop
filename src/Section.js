export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this.items = items;
    this.container.insertAdjacentHTML('beforeend', element);
  }

  render() {
    // items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    const markup = this.items.map(this.renderer);
    this.container.insertAdjacentHTML('beforeend', markup);
  }
}
