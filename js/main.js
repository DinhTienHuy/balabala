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
    productWrapper.find(".pro-img a > img").attr("src", pathName);
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
    if ($("#"+idElem).hasClass('is--opened')) {
      $("#"+idElem).removeClass("is--opened")
    } else {
      $(".current-scrollbar").removeClass("is--opened")
      $("#"+idElem).addClass("is--opened")
    }
  });

  let height = window.innerHeight;
  $('header').css("--max-height", (height*32)/100+"px");
  $(window).resize(function(){
    let height = window.innerHeight;
    $('header').css("--max-height", (height*32)/100+"px");
  });
});
