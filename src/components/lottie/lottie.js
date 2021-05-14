//////////
// Lottie
//////////

// http://airbnb.io/lottie/#/web

(function ($, APP) {
  APP.Components.Lottie = {
    data: {
      particles: null,
      lion: null,
    },
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
        this.watchViewport();
      }

      this.particles();
      this.lion();
    },
    eventListeners: function () {},
    particles: function () {
      let animation = bodymovin.loadAnimation({
        container: $('#lottie2')[0],
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'json/lottie_2.json',
      });

      // animation.play();
      this.data.particles = animation;

      animation.addEventListener('data_ready', () => {
        this.setAR(animation);
      });
    },
    lion: function () {
      // let animation = bodymovin.loadAnimation({
      //   container: $('#lottie-lion')[0],
      //   renderer: 'svg',
      //   loop: true,
      //   autoplay: false,
      //   path: 'json/lottie_lion.json',
      // });
      // this.data.lion = animation;
      // animation.addEventListener('data_ready', () => {
      //   this.setAR(animation);
      // });
    },
    setAR: function (animation) {
      const svg = animation.wrapper.querySelector('svg');

      if (svg) {
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      }
    },
    watchViewport: function () {
      var _this = this;
      var $particles = $('#lottie2');
      var particlesWatcher = scrollMonitor.create($particles);

      if ($particles.length && particlesWatcher) {
        particlesWatcher.enterViewport(
          throttle(
            function () {
              _this.data.particles.play();
            },
            100,
            {
              leading: true,
            }
          )
        );

        particlesWatcher.exitViewport(
          throttle(
            function () {
              _this.data.particles.pause();
            },
            100,
            {
              leading: true,
            }
          )
        );
      }
    },
  };
})(jQuery, window.APP);
