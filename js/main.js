$(document).ready(function () {
  $(".list_slider .container").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    prevArrow: `<button type='button' class='slick-prev pull-left'><svg  viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z" class="arrow"></path></svg></button>`,
    nextArrow: `<button type='button' class='slick-next pull-right'><svg  viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>`,
  });

  $(".list_slider .container").on(
    "afterChange",
    function (event, slick, currentSlide) {
      // Remove 'animation' class from all items
      $(".slide_item .slide_item_content")
        .children()
        .removeClass("animation-fadeInUp");

      // Add 'animation' class to the active item
      $(".slick-active .slide_item_content ")
        .children()
        .addClass("animation-fadeInUp");
    }
  );

  $(".openModalBtn").click(function () {
    $("#myModal").fadeIn();
  });

  $("#closeModalBtn").click(function () {
    $("#myModal").fadeOut();
  });

  $(window).click(function (event) {
    if (event.target.id === "myModal") {
      console.log(event.target);
      $("#myModal").fadeOut();
    }
  });

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $("#myModal").fadeOut();
    }
  });

  $(".pro-wishlist .pro-icon").on("click", function () {
    $(this).find("i").toggleClass("fas active");
  });

  $(".pro-variant .pr-color__item").hover(function (e) {
    e.preventDefault();
    $(".pro-variant .pr-color__item").removeClass("active");
    $(this).addClass("active");
    let img = $(this).find(".pr-color__value").css("background-image");
    let imgUrl = img.match(/url\(['"]?(.*?)['"]?\)/);
    let urlObject = new URL(imgUrl[1]);
    let pathName = urlObject.pathname;
    let productWrapper = $(this).closest(".product-wrapper");
    productWrapper.find(".pro-img a > img.active").attr("src", pathName);
  });

  $(".footer-mobile").click(function () {
    $(this).closest(".footer-wrap").toggleClass("is--footer_opened");
    $(this).closest(".footer-wrap").find(".footer-content").slideToggle();
  });

  const calcScrollValue = () => {
    let pos = $(document).scrollTop();
    let calc = $(document).height() - $(window).height();
    let scrollValue = Math.round((pos * 100) / calc);
    if (pos > 100) {
      $("#backToTop").css("display", "block");
    } else {
      $("#backToTop").css("display", "none");
    }

    $("#backToTop .circle--bg").css(
      "background",
      `conic-gradient(#000 ${scrollValue}%, #eee ${scrollValue}%)`
    );
  };

  $("#backToTop").on("click", function (e) {
    e.preventDefault();

    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $(window).scroll(calcScrollValue);

  $(".change-data").click(function () {
    let idElem = $(this).attr("data-id");
    if ($("#" + idElem).hasClass("is--opened")) {
      $("#" + idElem).removeClass("is--opened");
    } else {
      $(".current-scrollbar").removeClass("is--opened");
      $("#" + idElem).addClass("is--opened");
    }
  });

  /*page Product Category*/
  $(".btn-filter").on("click", function (e) {
    e.preventDefault();
    if ($(window).width() > 767) {
      $(".filter-area").slideToggle();
    } else {
      $(".filter-native").addClass("active");
      $(".close-overlay").addClass("is--visible");
      $(document).keyup(function (e) {
        if (e.key === "Escape") {
          $("#draw").addClass("in-active");
          $(".close-overlay").removeClass("is--visible");
        }
      });
      $(window).click(function (event) {
        if (event.target.id === "close-overlay") {
          $("#draw").removeClass("active");
          $(".close-overlay").removeClass("is--visible");
        }
      });
      $(".drawer__close").click(function (event) {
        $("#draw").removeClass("active");
        $(".close-overlay").removeClass("is--visible");
      });
    }
  });

  $(".dropdown__sortby").on("click", function () {
    if ($(window).width() > 766) {
      $(this).find(".dropdown__wrapper").toggleClass("active");
      $(this).find("button svg").toggleClass("active");
    } else {
      $(".dropdown-mobile").addClass("active");
      $(".close-overlay").addClass("is--visible");
      $(document).keyup(function (e) {
        if (e.key === "Escape") {
          $("#dropdown-mobile").removeClass("active");
          $(".close-overlay").removeClass("is--visible");
        }
      });
      $(window).click(function (event) {
        if (event.target.id === "close-overlay") {
          $("#dropdown-mobile").removeClass("active");
          $(".close-overlay").removeClass("is--visible");
        }
      });
      $("#dropdown_close").click(function (event) {
        $("#dropdown-mobile").removeClass("active");
        $(".close-overlay").removeClass("is--visible");
      });
    }
  });

  /*end*/
  let height = window.innerHeight;
  $('header').css("--max-height", height-150+"px");
  $(window).resize(function(){
    let height = window.innerHeight;
    $('header').css("--max-height", height-150+"px");
  });

  $(".action-sidebar").click(function () {
    let idElem = $(this).attr("data-action");

    $(".bala-sidebar").removeClass("is-active")
    $(".close-overlay").addClass("is--visible")
    $("body").addClass("lock-scroll")
    $("#"+idElem).addClass("is-active")

    if (idElem == "menu-mobile") $(".drawer-menu__close").addClass("is--active")

  });

  $(".close-overlay, .drawer__close, .drawer-menu__close").click(function () {
    $(".close-overlay.is--visible").removeClass("is--visible")
    $(".bala-sidebar").removeClass("is-active")
    $("body").removeClass("lock-scroll")
    if ($(".drawer-menu__close").hasClass("is--active")) $(".drawer-menu__close").removeClass("is--active")
  });

  $(".button-action").click(function () {
    let idElem = $(this).attr("data-login-sidebar");

    $(".content-login-sidebar, .title-sidebar").removeClass("is-active")
    $(".is--"+idElem).addClass("is-active")
  });

  $(".mini_cart_tool_btn").click(function () {
    let idElem = $(this).attr("data-id");
    $("#cart-sidebar").toggleClass("is--contentUpdate");

    if (idElem == "note") {
      $(".mini_cart-tool__content.is--note").addClass('is--opend')
      $(".txt_add_note").removeClass("d-none")
      $(".txt_edit_note").addClass("d-none")
    }
    if (idElem == "edit") {
      $(".mini_cart-tool__content.is--note").addClass('is--opend');
      $(".txt_edit_note").removeClass("d-none")
      $(".txt_add_note").addClass("d-none")
    }

    if (idElem == "discount") {
      $(".mini_cart-tool__content.is--discount").addClass('is--opend');
    }
  });

  $(".mini_cart-tool__back, .overlay-cart").click(function () {
    if ($("#cart-sidebar").hasClass("is--contentUpdate")) {
      $("#cart-sidebar").removeClass("is--contentUpdate");
      $(".mini_cart-tool__content").removeClass('is--opend')
    }
  });

  $(".mb-tab__title").click(function () {
    let idElem = $(this).attr("data-id");
    $(".mb-tab__title, .mb-tab__content").removeClass("is--active")
    $(this).addClass("is--active")
    $(idElem).addClass("is--active")
  });

  $(".menu-item-has-children").click(function () {
    let currentElm = $(this);
    if (!currentElm.hasClass('is--opend')) {
      currentElm.addClass("is--opend").find(".sub-menu").show(300)
    } else {
      currentElm.removeClass("is--opend").find(".sub-menu").hide(300)
    }
  });

});
