(function($){
    "use strict";



  // Foundars slider 
  function mainSlider() {
    var BasicSlider = $('.founders-slider-active');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find(
        '[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      dots: false,
      infinite: true,
      autoplay: false,
      fade: true,
      autoplaySpeed: 10000,
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next<i class="fas fa-long-arrow-alt-right"></i></button>',
      responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: false,
            fade: true,
            autoplaySpeed: 10000
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: false,
            fade: true,
            autoplaySpeed: 10000
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();





  // Company Picture Slider
  $('.company-img-slider').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });





})(jQuery);


