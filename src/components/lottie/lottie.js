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
        container: $('#lottie-particles')[0],
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
      let animation = bodymovin.loadAnimation({
        container: $('#lottie-lion')[0],
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'json/lottie_lion.json',
      });

      this.data.lion = animation;
      animation.addEventListener('data_ready', () => {
        this.setAR(animation);
      });
    },
    setAR: function (animation) {
      const svg = animation.wrapper.querySelector('svg');

      if (svg) {
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      }
    },
    watchViewport: function () {
      var _this = this;
      var $looties = $('.lottie [data-key]');
      if ($looties.length > 0) {
        $looties.each(function (i, element) {
          var $lootie = $(element);
          var dataKey = $lootie.data('key');

          var scrollWatcher = scrollMonitor.create(element);

          if (dataKey && $lootie.length && scrollWatcher) {
            scrollWatcher.enterViewport(
              throttle(
                function () {
                  console.log('lootie entered viewport');
                  _this.data[dataKey].play();
                },
                100,
                {
                  leading: true,
                }
              )
            );

            scrollWatcher.exitViewport(
              throttle(
                function () {
                  _this.data[dataKey].pause();
                },
                100,
                {
                  leading: true,
                }
              )
            );
          }
        });
      }
    },
  };
})(jQuery, window.APP);
