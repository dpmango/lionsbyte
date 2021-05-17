//////////
// Preloader
//////////
(function ($, APP) {
  APP.Components.Preloader = {
    data: {
      canvas: null,
      context: null,
      resolution: 1,
      frameCount: 261,
      images: [],
      preloader: {
        frame: 0,
      },
    },
    loaded: function () {
      $('body').addClass('is-preloaded');

      setTimeout(() => {
        APP.Plugins.AOS.init();
      }, 500);
    },
    init: function (fromPjax) {
      this.getData();
      this.loadFrames();
      this.gsapAnimation();
      this.resize();
    },
    getData: function () {
      const canvas = document.getElementById('preloader');
      const context = canvas.getContext('2d');
      const resolution = window.devicePixelRatio || 1;

      this.data.canvas = canvas;
      this.data.context = context;
      this.data.resolution = resolution;
    },
    loadFrames: function () {
      var _data = this.data;
      const currentFrame = (index) =>
        `/img/preloader/Lion_byte_4_2_${index.toString().padStart(5, '0')}.png`;

      // preload
      for (let i = 0; i < _data.frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        _data.images.push(img);
      }

      _data.images[0].onload = this.render.bind(this);
    },
    gsapAnimation: function () {
      var _this = this;
      var _data = this.data;

      gsap.to(_data.preloader, 8.7, {
        frame: _data.frameCount - 1,
        snap: 'frame',
        ease: 'Power0.none',
        onUpdate: () => _this.render(),
        onComplete: () => APP.Components.Preloader.loaded(),
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
          _data.canvas.height
          // 0.5,
          // 0.5
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
