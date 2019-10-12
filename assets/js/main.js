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










var Typer = function(element) {
  this.element = element;
  var delim = element.dataset.delim || ",";
  var words = element.dataset.words || "override these,sample typing";
  this.words = words.split(delim).filter((v) => v); // non empty words
  this.delay = element.dataset.delay || 200;
  this.loop = element.dataset.loop || "true";
  if (this.loop === "false" ) { this.loop = 1 }
  this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;

  this.progress = { word: 0, char: 0, building: true, looped: 0 };
  this.typing = true;

  var colors = element.dataset.colors || "black";
  this.colors = colors.split(",");
  this.element.style.color = this.colors[0];
  this.colorIndex = 0;

  this.doTyping();
};

Typer.prototype.start = function() {
  if (!this.typing) {
    this.typing = true;
    this.doTyping();
  }
};
Typer.prototype.stop = function() {
  this.typing = false;
};
Typer.prototype.doTyping = function() {
  var e = this.element;
  var p = this.progress;
  var w = p.word;
  var c = p.char;
  var currentDisplay = [...this.words[w]].slice(0, c).join("");
  var atWordEnd;
  if (this.cursor) {
    this.cursor.element.style.opacity = "1";
    this.cursor.on = true;
    clearInterval(this.cursor.interval);
    this.cursor.interval = setInterval(() => this.cursor.updateBlinkState(), 400);
  }

  e.innerHTML = currentDisplay;

  if (p.building) {
    atWordEnd = p.char === this.words[w].length;
    if (atWordEnd) {
      p.building = false;
    } else {
      p.char += 1;
    }
  } else {
    if (p.char === 0) {
      p.building = true;
      p.word = (p.word + 1) % this.words.length;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      this.element.style.color = this.colors[this.colorIndex];
    } else {
      p.char -= 1;
    }
  }

  if (p.word === this.words.length - 1) {
    p.looped += 1;
  }

  if (!p.building && this.loop <= p.looped){
    this.typing = false;
  }

  setTimeout(() => {
    if (this.typing) { this.doTyping() };
  }, atWordEnd ? this.deleteDelay : this.delay);
};

var Cursor = function(element) {
  this.element = element;
  this.cursorDisplay = element.dataset.cursordisplay || element.dataset.cursorDisplay || "|";
  element.innerHTML = this.cursorDisplay;
  this.on = true;
  element.style.transition = "all 0.1s";
  this.interval = setInterval(() => this.updateBlinkState(), 400);
}
Cursor.prototype.updateBlinkState = function() {
  if (this.on) {
    this.element.style.opacity = "0";
    this.on = false;
  } else {
    this.element.style.opacity = "1";
    this.on = true;
  }
}

function TyperSetup() {
  var typers = {};
  for (let e of document.getElementsByClassName("typer")) {
    typers[e.id] = new Typer(e);
  }
  for (let e of document.getElementsByClassName("typer-stop")) {
    let owner = typers[e.dataset.owner];
    e.onclick = () => owner.stop();
  }
  for (let e of document.getElementsByClassName("typer-start")) {
    let owner = typers[e.dataset.owner];
    e.onclick = () => owner.start();
  }
  for (let e of document.getElementsByClassName("cursor")) {
    let t = new Cursor(e);
    t.owner = typers[e.dataset.owner];
    t.owner.cursor = t;
  }
}

TyperSetup();


































