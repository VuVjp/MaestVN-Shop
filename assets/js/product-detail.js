const products = {
  "1": {
    name: "Call of Duty®: Modern Warfare® II",
    priceOld: 28,
    priceNew: 22,
    image: "assets/images/single-game.jpg",
    description: `LUGX Gaming Template is based on the latest Bootstrap 5 CSS framework.
This template is suitable for your gaming shop ecommerce websites.
Feel free to use this for any purpose. Thank you.`,
    genre: ["Action", "Team", "Single"],
    tags: ["War", "Battle", "Royal"],
    id: "COD MMII",
    reviews: [
      "Game rất hay, đồ họa đỉnh cao!",
      "Chiến dịch hấp dẫn và nhiều chế độ chơi.",
      "Giá hợp lý với chất lượng."
    ]
  },
  "2": {
    name: "Assassin's Creed® Valhalla",
    priceOld: 30,
    priceNew: 25,
    image: "assets/images/assassins-creed.jpg",
    description: `Trải nghiệm thế giới Viking tuyệt đẹp.
Valhalla mang lại lối chơi nhập vai hấp dẫn cùng với cốt truyện phong phú.`,
    genre: ["Adventure", "Open World"],
    tags: ["Viking", "Story", "Combat"],
    id: "ACV",
    reviews: [
      "Cốt truyện Valhalla rất cuốn hút!",
      "Gameplay sáng tạo, không bị lặp lại.",
      "Cảnh quan đẹp, rất đáng chơi."
    ]
  }
};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function renderProductDetail() {
  const productId = getQueryParam("id");
  const product = products[productId];

  if (!product) {
    document.body.innerHTML = "<h2 class='text-center mt-5'>Sản phẩm không tồn tại.</h2>";
    return;
  }

  // Header
  document.querySelector("h3").innerText = product.name;
  document.querySelector(".breadcrumb").innerHTML = `<a href="#">Home</a>  >  <a href="#">Shop</a>  >  ${product.name}`;

  // Image
  const img = document.querySelector(".left-image img");
  img.src = product.image;
  img.alt = product.name;

  // Title and price
  document.querySelector(".col-lg-6.align-self-center h4").innerText = product.name;
  document.querySelector(".price").innerHTML = `<em>$${product.priceOld}</em> $${product.priceNew}`;

  // Description with line breaks
  const descHTML = product.description
    .split('\n')
    .map(line => `<p>${line}</p>`)
    .join('');
  document.querySelector("#description").innerHTML = descHTML;

  // Details
  const ul = document.querySelector(".col-lg-6.align-self-center ul");
  ul.innerHTML = `
    <li><span>Game ID:</span> ${product.id}</li>
    <li><span>Genre:</span> ${product.genre.map(g => `<a href="#">${g}</a>`).join(", ")}</li>
    <li><span>Multi-tags:</span> ${product.tags.map(t => `<a href="#">${t}</a>`).join(", ")}</li>
  `;

  // Reviews
  const reviewContainer = document.querySelector("#reviews");
  reviewContainer.innerHTML = product.reviews.map(r => `<p>${r}</p>`).join("");
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
