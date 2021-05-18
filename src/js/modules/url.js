//////////
// URLS
//////////
(function ($, APP) {
  APP.Plugins.URL = {
    data: {
      preloader: true,
      scroll: true,
    },
    init: function (fromPjax) {
      const params = new URL(document.location).searchParams;

      if (params.get('preloader')) {
        this.data.preloader = params.get('preloader');
      }
      if (params.get('scroll')) {
        this.data.scroll = params.get('scroll');
      }
    },
  };
})(jQuery, window.APP);

// infoScene.setPin('[data-scroll="intro-2"]');
