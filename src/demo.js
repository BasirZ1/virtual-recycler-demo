import { VirtualRecycler } from './VirtualRecycler.js';

const data = Array.from({ length: 10000 }, (_, i) => ({
  sku: `SKU-${1000 + i}`,
  name: `Product #${i + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`
}));

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('recycler');
  container.classList.add('recycler-container');

  new VirtualRecycler({
    container,
    data,
    itemHeight: 100,
    visibleCount: 12,
    render: (el, item, index) => {
      el.innerHTML = `
        <div>
            <strong class="product__name">${item.name}</strong>
            <span class="product__sku">(${item.sku})</span>
        </div>
        <small class="product__price">Price: ${item.price}</small>
      `;
    }
  });
});
