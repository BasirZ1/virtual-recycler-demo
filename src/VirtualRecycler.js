export class VirtualRecycler {
  constructor({ container, data, itemHeight, visibleCount, render }) {
    this.container = container;
    this.data = data;
    this.itemHeight = itemHeight;
    this.visibleCount = visibleCount;
    this.render = render;

    this.totalItems = data.length;
    this.currentStartIndex = 0;
    this.domPool = [];

    this._setupContainer();
    this._initDOMPool();
    this._attachScrollHandler();
  }

  _setupContainer() {
    this.container.style.position = "relative";
    this.container.style.overflowY = "auto";

    this.spacer = document.createElement("div");
    this.spacer.style.height = `${this.totalItems * this.itemHeight}px`;
    this.container.appendChild(this.spacer);

    this.poolWrapper = document.createElement("div");
    this.poolWrapper.style.position = "absolute";
    this.poolWrapper.style.top = "0";
    this.poolWrapper.style.left = "0";
    this.poolWrapper.style.right = "0";
    this.container.appendChild(this.poolWrapper);
  }

  _initDOMPool() {
    for (let i = 0; i < this.visibleCount; i++) {
      const el = document.createElement("div");
      el.className = "recycler-item";
      el.style.position = "absolute";
      el.style.height = `${this.itemHeight}px`;
      this.poolWrapper.appendChild(el);
      this.domPool.push(el);
    }
    this._renderVisibleItems(0);
  }

  _attachScrollHandler() {
    this.container.addEventListener("scroll", () => {
      const scrollTop = this.container.scrollTop;
      const startIndex = Math.floor(scrollTop / this.itemHeight);

      if (startIndex !== this.currentStartIndex) {
        this._renderVisibleItems(startIndex);
        this.currentStartIndex = startIndex;
      }
    });
  }

  _renderVisibleItems(startIndex) {
    for (let i = 0; i < this.visibleCount; i++) {
      const realIndex = startIndex + i;
      const el = this.domPool[i];

      if (realIndex >= this.totalItems) {
        el.style.display = "none";
        continue;
      }

      el.style.display = "block";
      el.style.transform = `translateY(${realIndex * this.itemHeight}px)`;
      this.render(el, this.data[realIndex], realIndex);
    }
  }

  // Optional: replace all data and re-render
  updateData(newData) {
    this.data = newData;
    this.totalItems = newData.length;
    this.spacer.style.height = `${this.totalItems * this.itemHeight}px`;
    this._renderVisibleItems(this.currentStartIndex);
  }
}
