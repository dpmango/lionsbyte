/* eslint-disable no-console */
//////////
// Preloader
//////////
(function ($, APP) {
  APP.Components.Preloader = {
    debug: {
      start: Date.now(),
    },
    data: {
      canvas: null,
      context: null,
      resolution: 1,
      frameCount: {
        starter: 55,
        total: 261,
      },
      images: [],
      preloader: {
        frame: 0,
      },
      imagesLoaded: {
        starter: false,
        total: false,
      },
      playbackState: {
        starter: false,
        total: false,
      },
    },
    loaded: function () {
      $('body').addClass('is-preloaded');

      setTimeout(() => {
        APP.Plugins.AOS.init();
      }, 500);
    },
    init: function (fromPjax) {
      if (APP.Plugins.URL.data.preloader !== 'false') {
        this.getData();
        this.loadFrames();
        // this.gsapAnimation();
        this.resize();

        if (!fromPjax) {
          this.listenResize();
        }
      } else {
        $('body').addClass('no-preloader');
        APP.Plugins.AOS.init();
      }
    },
    getData: function () {
      const canvas = document.getElementById('preloader');
      const context = canvas.getContext('2d');
      const resolution = window.devicePixelRatio || 1;

      this.data.canvas = canvas;
      this.data.context = context;
      this.data.resolution = resolution;
    },
    listenResize: function () {
      _window.on('resize', debounce(this.resize.bind(this), 100));
    },
    loadFrames: function () {
      var _this = this;
      var _data = this.data;
      // const currentFrame = (index) =>
      //   `/img/preloader/Lion_byte_4_2_${index.toString().padStart(5, '0')}.png`;

      const currentFrame = (index) =>
        `https://res.cloudinary.com/dqruxbmfq/image/upload/v1621367612/lion-loader/Lion_byte_4_2_${index
          .toString()
          .padStart(5, '0')}.png`;

      // create images
      let imagesUrlsStarter = [];
      let imageUrlsAll = [];
      for (let i = 0; i <= _data.frameCount.starter; i++) {
        imagesUrlsStarter.push(currentFrame(i));
      }

      for (let i = _data.frameCount.starter; i <= _data.frameCount.total; i++) {
        imageUrlsAll.push(currentFrame(i));
      }

      // images loader function
      function loadImages(imageUrlArray) {
        const promiseArray = [];

        for (let imageUrl of imageUrlArray) {
          promiseArray.push(
            new Promise((resolve) => {
              const img = new Image();

              img.onload = function () {
                resolve();
              };

              img.src = imageUrl;
              _data.images.push(img);
            })
          );
        }

        return Promise.all(promiseArray).then(() => {
          return _data.images;
        });
      }

      // load starter images and start animation
      // when the rest is loaded and animation compleate, start second (longer) part
      // images are loaded in 2 virtual streams (second should not wait till first animation compleate)
      loadImages(imagesUrlsStarter).then((images) => {
        console.log(
          `Preloader starter loaded in: ${((Date.now() - _this.debug.start) / 1000).toFixed(2)} s`
        );
        _data.imagesLoaded.starter = true;

        _this.gsapAnimationStart().then(() => {
          _data.playbackState.starter = true;

          var ticker = setInterval(readyChecker, 100);
          function readyChecker() {
            if (_data.imagesLoaded.total) {
              _this.gsapAnimationAll();
              clearInterval(ticker);
            }
          }
        });
      });

      loadImages(imageUrlsAll).then((images) => {
        console.log(
          `Preloader all loaded in: ${((Date.now() - _this.debug.start) / 1000).toFixed(2)} s`
        );

        _data.imagesLoaded.total = true;
      });

      // _data.images[0].onload = this.render.bind(this);
    },
    gsapAnimationStart: function () {
      var _this = this;
      var _data = this.data;

      return new Promise((resolve) => {
        gsap.to(_data.preloader, _data.frameCount.starter / 30, {
          frame: _data.frameCount.starter,
          snap: 'frame',
          ease: 'Power0.none',
          onUpdate: () => _this.render(),
          onComplete: resolve,
        });

        return;
      });
    },

    gsapAnimationAll: function () {
      var _this = this;
      var _data = this.data;

      gsap.to(_data.preloader, (_data.frameCount.total - _data.frameCount.starter) / 30, {
        frame: _data.frameCount.total,
        snap: 'frame',
        ease: 'Power0.none',
        onUpdate: () => _this.render(),
        onComplete: () => {
          APP.Components.Preloader.loaded();
          _data.playbackState.total = true;
        },
      });
    },
    render: function () {
      var _data = this.data;

      if (_data.context) {
        _data.context.clearRect(0, 0, _data.canvas.width, _data.canvas.height);
        this.canvasDrawImage(
          _data.context,
          _data.images[_data.preloader.frame],
          0,
          0,
          _data.canvas.width,
          _data.canvas.height,
          0.5,
          1
        );
      }
    },
    canvasDrawImage: function (ctx, img, x, y, w, h, offsetX, offsetY) {
      if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
      }

      // default offset is center
      offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
      offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

      // keep bounds [0.0, 1.0]
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > 1) offsetX = 1;
      if (offsetY > 1) offsetY = 1;

      var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r, // new prop. width
        nh = ih * r, // new prop. height
        cx,
        cy,
        cw,
        ch,
        ar = 1;

      // decide which gap to fill
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
      nw *= ar;
      nh *= ar;

      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    },
    resize: function () {
      var _data = this.data;
      let vw, vh, cx, cy;

      vw = window.innerWidth;
      vh = window.innerHeight;

      cx = vw / 2;
      cy = vh / 2;

      _data.canvas.width = vw;
      _data.canvas.height = vh;

      _data.canvas.style.width = vw + 'px';
      _data.canvas.style.height = vh + 'px';

      // _data.context.scale(_data.resolution, _data.resolution);

      this.render();
    },
  };
})(jQuery, window.APP);
