import {VirtualRecycler} from "virtual-recycler";

const data = Array.from({ length: 10000 }, (_, i) => ({
  sku: `SKU-${1000 + i}`,
  name: `Product #${i + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`
}));

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('recycler');
  container.classList.add('recycler-container');

  new VirtualRecycler({
    container: container,
    data: data,
    visibleCount: 30,
    render: (el, item) => {
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
