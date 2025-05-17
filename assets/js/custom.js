(function ($) {

	"use strict";

	// Page loading animation
	$(window).on('load', function () {

		$('#js-preloader').addClass('loaded');

	});


	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	})

	var width = $(window).width();
	$(window).resize(function () {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.trending-box');
	const filtersElem = document.querySelector('.trending-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.trending-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function (event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function () {
		if ($('.cover').length) {
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function () {
			setTimeout(function () {
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});



})(window.jQuery);

/* Search */

function handleSearch() {
	var query = document.getElementById("searchText").value.toLowerCase();
	var results = document.getElementsByClassName("result");

	for (var i = 0; i < results.length; i++) {
		var content = results[i].textContent.toLowerCase();
		if (content.includes(query)) {
			results[i].style.display = "block";
		} else {
			results[i].style.display = "none";
		}
	}
}


  // Giỏ hàng mẫu (sẽ thay bằng localStorage hoặc API)
  const cart = [
    {
      name: "Call of Duty®: Modern Warfare® II",
      price: 100000,
      quantity: 1,
      image: "assets/images/single-game.jpg"
    },
    {
      name: "Assassin's Creed® Valhalla",
      price: 25000,
      quantity: 2,
      image: "assets/images/assassins-creed.jpg"
    }
  ];

  function formatVND(n) {
    return n.toLocaleString("vi-VN") + " đ";
  }

  function renderCart() {
    const tbody = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");
    let total = 0;
    tbody.innerHTML = "";

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" style="width: 80px; border-radius: 10px;"></td>
        <td>${item.name}</td>
        <td>${formatVND(item.price)}</td>
        <td><input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm w-50" onchange="updateQuantity(${index}, this.value)" /></td>
        <td>${formatVND(itemTotal)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})"><i class="fa fa-trash"></i></button></td>
      `;
      tbody.appendChild(row);
    });

    totalDisplay.innerText = formatVND(total);
  }

  function updateQuantity(index, newQty) {
    cart[index].quantity = parseInt(newQty);
    renderCart();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
  }

  document.addEventListener("DOMContentLoaded", renderCart);
  

