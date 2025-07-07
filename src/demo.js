import { VirtualRecycler } from './VirtualRecycler.js';

const data = Array.from({ length: 10000 }, (_, i) => ({
  code: `ROLL${i}`,
  name: `Item Name ${i}`
}));

const container = document.getElementById('recycler');
container.classList.add('recycler-container'); // For styling

new VirtualRecycler({
  container,
  data,
  itemHeight: 100,
  visibleCount: 12,
  render: (el, item, index) => {
    el.innerHTML = `<strong>${item.code}</strong> - ${item.name}`;
  }
});
