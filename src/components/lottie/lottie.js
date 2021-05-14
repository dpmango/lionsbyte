//////////
// Lottie
//////////
(function ($, APP) {
  APP.Components.Lottie = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }

      this.startLottie();
    },
    eventListeners: function () {},
    startLottie: function () {
      // options
      // http://airbnb.io/lottie/#/web

      let animation = bodymovin.loadAnimation({
        container: $('#lottie2')[0],
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'json/lottie_2.json',
      });

      animation.play();

      animation.addEventListener('data_ready', () => {
        const svg = animation.wrapper.querySelector('svg');

        if (svg) {
          svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        }
      });
    },
  };
})(jQuery, window.APP);
