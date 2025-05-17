const games = [
  { id: 1, name: "Assassin Creed", category: "Adventure", img: "assets/images/trending-01.jpg", price: 24, oldPrice: 36, description: "An epic action-adventure game.", filterClass: "adv" },
  { id: 2, name: "Farming Simulator", category: "Strategy", img: "assets/images/trending-02.jpg", price: 22, oldPrice: 32, description: "A realistic farming experience.", filterClass: "str" },
  { id: 3, name: "DSN", category: "NguyenDong", img: "assets/images/trending-01.jpg", price: 24, oldPrice: 36, description: "An epic action-adventure game.", filterClass: "nd" },
  { id: 4, name: "SIGMABAUS", category: "NguyenDong", img: "assets/images/trending-02.jpg", price: 22, oldPrice: 32, description: "A realistic farming experience.", filterClass: "nd" },
  { id: 5, name: "MR NGUYENDONG", category: "NguyenDong", img: "assets/images/trending-01.jpg", price: 24, oldPrice: 36, description: "An epic action-adventure game.", filterClass: "nd" },
  { id: 6, name: "NJACK", category: "NguyenDong", img: "assets/images/trending-02.jpg", price: 22, oldPrice: 32, description: "A realistic farming experience.", filterClass: "nd" },
  { id: 7, name: "Đồng Sỹ Nguyên", category: "NguyenDong", img: "assets/images/trending-02.jpg", price: 22, oldPrice: 32, description: "A realistic farming experience.", filterClass: "nd" },
  { id: 8, name: "Nguyên-Chan", category: "NguyenDong", img: "assets/images/trending-02.jpg", price: 22, oldPrice: 32, description: "A realistic farming experience.", filterClass: "nd" }
];

const ITEMS_PER_PAGE = 4;
let currentFilter = "all";
let currentPriceFilter = "all";
let currentPage = 1;
let searchKeyword = "";

function renderGames() {
  const container = document.getElementById("game-list");
  container.classList.remove("show");

  setTimeout(() => {
    let filteredGames = currentFilter === "all" ? [...games] : games.filter(g => g.filterClass === currentFilter);

    if (searchKeyword.trim()) {
      filteredGames = filteredGames.filter(g => g.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    filteredGames = filteredGames.filter(g => {
      const price = g.price;
      switch (currentPriceFilter) {
        case "free": return price === 0;
        case "20": return price > 0 && price < 20;
        case "50": return price < 50;
        case "100": return price < 100;
        case "200": return price < 200;
        case "more": return price >= 200;
        default: return true;
      }
    });

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    currentPage = Math.min(currentPage, totalPages || 1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    container.innerHTML = "";

    if (pageGames.length === 0) {
      container.innerHTML = '<p class="text-center text-muted">No games found.</p>';
    }

    pageGames.forEach(game => {
      const col = document.createElement("div");
      col.className = `col-lg-3 col-md-6 game-item ${game.filterClass}`;

      col.innerHTML = `
  <div class="card h-100 shadow-sm rounded-4 overflow-hidden">
    <img src="${game.img}" alt="${game.name}" class="card-img-top rounded-top-4" style="cursor: pointer;" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${game.name}</h5>
      <p class="card-text flex-grow-1">${game.description}</p>
      <p class="card-text fw-bold">
        ${game.oldPrice && game.oldPrice > game.price ? `<span style="text-decoration: line-through; color: #888; margin-right: 8px;">$${game.oldPrice}</span>` : ''}
        ${game.price === 0 ? 'Free' : `$${game.price}`}
      </p>
      <a href="product-details.html?id=${game.id}" class="btn btn-primary rounded-pill mt-auto buy-now-btn">Buy Now</a>
    </div>
  </div>
`;
      // Cả ảnh và nút đều trỏ link kèm id
      const thumb = col.querySelector(".card-img-top");
      thumb.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${game.id}`;
      });

      container.appendChild(col);
    });

    container.classList.add("show");
    renderPagination(totalPages);
  }, 200);
}

function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  if (totalPages <= 1) return;

  const createPageButton = (content, isDisabled, isActive, onClick) => {
    const li = document.createElement("li");
    li.className = `page-item ${isDisabled ? "disabled" : ""} ${isActive ? "active" : ""}`;
    li.innerHTML = `
      <a class="page-link rounded-circle d-flex align-items-center justify-content-center"
         style="width: 40px; height: 40px;" href="#">${content}</a>`;
    if (!isDisabled) li.onclick = onClick;
    return li;
  };

  pagination.appendChild(createPageButton('<i class="fas fa-chevron-left"></i>', currentPage === 1, false, e => {
    e.preventDefault();
    currentPage--;
    renderGames();
  }));

  for (let i = 1; i <= totalPages; i++) {
    pagination.appendChild(createPageButton(i, false, currentPage === i, e => {
      e.preventDefault();
      currentPage = i;
      renderGames();
    }));
  }

  pagination.appendChild(createPageButton('<i class="fas fa-chevron-right"></i>', currentPage === totalPages, false, e => {
    e.preventDefault();
    currentPage++;
    renderGames();
  }));
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const filter = btn.dataset.filter;
      if (filter !== currentFilter) {
        currentFilter = filter;
        currentPage = 1;
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderGames();
      }
    });
  });
}

function setupPriceFilter() {
  const priceBtns = document.querySelectorAll(".price-filter-btn");
  priceBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const price = btn.dataset.price;
      if (price !== currentPriceFilter) {
        currentPriceFilter = price;
        currentPage = 1;
        priceBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderGames();
      }
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      searchKeyword = e.target.value;
      currentPage = 1;
      renderGames();
    });
  }
}

// MAIN
window.onload = () => {
  setupFilterButtons();
  setupPriceFilter();
  setupSearch();
  renderGames();
};
