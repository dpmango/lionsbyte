//////////
// Lottie
//////////

// http://airbnb.io/lottie/#/web

(function ($, APP) {
  APP.Components.Lottie = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
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

      animation.play();

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
      // animation.play();
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
  };
})(jQuery, window.APP);
