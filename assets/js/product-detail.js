const products = {
  "1": {
    name: "Call of Duty®: Modern Warfare® II",
    priceOld: 150,
    priceNew: 100,
    image: "assets/images/single-game.jpg",
    description: `Game bắn súng hành động`,
    genre: ["Hành động", "Đồng đội", "1 người chơi"],
    tags: ["Chiến tranh", "Chiến đấu", "Hoàng gia"],
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
    genre: ["Phiêu lưu", "Thế giới mở"],
    tags: ["Viking", "Cốt truyện", "Chiến đấu"],
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
  document.querySelector(".price").innerHTML = `<em>${product.priceOld}.000 đ</em> ${product.priceNew}.000 đ`;

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
    <li><span>Thể loại:</span> ${product.genre.map(g => `<a href="#">${g}</a>`).join(", ")}</li>
    <li><span>Multi-tags:</span> ${product.tags.map(t => `<a href="#">${t}</a>`).join(", ")}</li>
  `;

  // Reviews
  const reviewContainer = document.querySelector("#reviews");
  reviewContainer.innerHTML = product.reviews.map(r => `<p>${r}</p>`).join("");
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
