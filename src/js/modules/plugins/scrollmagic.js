/* eslint-disable camelcase */
//////////
// Scroll agic
//////////
(function ($, APP) {
  APP.Plugins.ScrollMagic = {
    init: function (fromPjax) {
      if (APP.Plugins.URL.data.scroll !== 'false') {
        $('body').addClass('scroll-trigger-working');
        // this.scrollmagic()
        this.scrollTrigger();
      } else {
        $('body').addClass('no-scroll-trigger');
      }
    },
    scrollTrigger: function () {
      const buildParams = (custom) => {
        const params = {
          defaults: { duration: 1 },
          markers: {
            startColor: 'forestgreen',
            endColor: 'crimson',
            fontSize: '15px',
            fontWeight: 'bold',
            indent: 20,
          },
          scrub: 1,
          start: 'top top',
          end: 'bottom bottom',
        };

        return { ...params, ...custom };
      };

      const scroll = (x) => `[data-scroll="${x}"]`;
      const section = (x) => `[data-section="${x}"]`;

      const totalVH = _document.height() / _window.innerHeight();
      const oneVhProgress = 1 / totalVH;

      const $background = $(section('background'));
      if ($background.length > 0) {
        let timeline_bg = gsap.timeline({
          scrollTrigger: buildParams({
            trigger: 'body',
            onToggle: (self) => {
              // if (!self.isActive) {
              //   $(self.trigger).addClass('is-finnished');
              // } else {
              //   $(self.trigger).addClass('is-finnished');
              // }
            },

            // end: function () {
            //   return _window.innerHeight() * 3;
            // },
            // pin: true,
          }),
        });

        timeline_bg
          .from(
            '#separator-line-45-deg',
            {
              // rotation: 0,
              // transformOrigin: '50% 50%',
              duration: 1,
            },
            0
          )
          .to(
            '#separator-line-45-deg',
            {
              rotation: 45,
              transformOrigin: '50% 50%',
              duration: oneVhProgress * 0.8,
            },
            oneVhProgress * 2.3
          );
      }

      const $intro = $('.intro');
      if ($intro.length > 0) {
        // timeline instance
        let timeline = gsap.timeline({
          scrollTrigger: buildParams({
            trigger: section('intro-first'),
            pin: `${section('intro-first')} [data-pin]`,
            // snap: {
            //   snapTo: 'labels', // snap to the closest label in the timeline
            //   duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
            //   ease: 'power1.inOut', // the ease of the snap animation ("power3" by default)
            // },
            // onUpdate: (self) => {
            //   console.log(
            //     'progress:',
            //     self.progress.toFixed(3),
            //     'direction:',
            //     self.direction,
            //     'velocity',
            //     self.getVelocity()
            //   );
            // },
          }),
        });

        timeline
          .from(scroll('intro-name'), { x: 400 }, 0)
          .from(scroll('intro-text'), { x: -600 }, 0)
          .from(scroll('intro-name'), { opacity: 0, duration: 0.2 }, 0)
          .from(scroll('intro-text'), { opacity: 0, duration: 0.2 }, 0);

        // SECOND
        let timeline_2 = gsap.timeline({
          scrollTrigger: buildParams({
            trigger: section('intro-second'),
            pin: `${section('intro-second')} [data-pin]`,
          }),
        });

        timeline_2
          .from(scroll('intro-second-top'), { y: 240 }, 0)
          .from(scroll('intro-second-bottom'), { y: -240 }, 0)
          .from(scroll('intro-second-top'), { opacity: 0, duration: 0.2 }, 0)
          .from(scroll('intro-second-bottom'), { opacity: 0, duration: 0.2 }, 0);

        // LION
        let timeline_lion = gsap.timeline({
          scrollTrigger: buildParams({
            trigger: section('overlay-lion'),
            pin: `${section('overlay-lion')} .lottie`,
            onUpdate: (self) => {
              const lionLootie = APP.Components.Lottie.data.lion;
              if (lionLootie) {
                const totalFrames = lionLootie.totalFrames;
                const curFrame = Math.floor(totalFrames * self.progress);

                if (curFrame > 0 && curFrame < totalFrames) {
                  lionLootie.goToAndStop(curFrame, true);
                }
              }
            },
          }),
        });
      }
    },
    // scrollmagic: function () {
    //   // init controller
    //   var controller = new ScrollMagic.Controller();

    //   // create a scene
    //   const $intro = $('.intro');
    //   if ($intro.length > 0) {
    //     const infoScene = new ScrollMagic.Scene({
    //       duration: $intro.height() - window.innerHeight,
    //       offset: 0,
    //     })
    //       .setTween('[data-scroll="intro-2"]', 0.5, { backgroundColor: 'green' })
    //       .addIndicators({ name: '1 (duration: 0)' }); // add indicators (requires plugin)

    //     infoScene.on('enter', function (event) {
    //       $('.intro').find('[data-aos]').addClass('aos-animate');
    //     });

    //     infoScene.on('progress', function (event) {
    //       console.log('infoScene progress', event.progress);
    //     });

    //     controller.addScene(infoScene);
    //   }
    // },
  };
})(jQuery, window.APP);

// infoScene.setPin('[data-scroll="intro-2"]');
