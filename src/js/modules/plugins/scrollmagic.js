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
    scrollmagic: function () {
      // init controller
      var controller = new ScrollMagic.Controller();

      // create a scene
      const $intro = $('.intro');
      if ($intro.length > 0) {
        const infoScene = new ScrollMagic.Scene({
          duration: $intro.height() - window.innerHeight,
          offset: 0,
        })
          .setTween('[data-scroll="intro-2"]', 0.5, { backgroundColor: 'green' })
          .addIndicators({ name: '1 (duration: 0)' }); // add indicators (requires plugin)

        infoScene.on('enter', function (event) {
          $('.intro').find('[data-aos]').addClass('aos-animate');
        });

        infoScene.on('progress', function (event) {
          console.log('infoScene progress', event.progress);
        });

        controller.addScene(infoScene);
      }
    },
    scrollTrigger: function () {
      const buildParams = (custom) => {
        const params = {
          markers: {
            startColor: 'forestgreen',
            endColor: 'crimson',
            fontSize: '15px',
            fontWeight: 'bold',
            indent: 20,
          },
          scrub: 1,
        };

        return { ...params, ...custom };
      };

      const scroll = (x) => `[data-scroll="${x}"]`;
      const section = (x) => `[data-section="${x}"]`;

      const $intro = $('.intro');
      if ($intro.length > 0) {
        // timeline instance
        let timeline = gsap.timeline({
          scrollTrigger: buildParams({
            trigger: section('intro-first'),
            start: 'top top',
            end: 'bottom bottom',
            pin: `${section('intro-first')} .container`,
            // snap: {
            //   snapTo: 'labels', // snap to the closest label in the timeline
            //   duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
            //   ease: 'power1.inOut', // the ease of the snap animation ("power3" by default)
            // },
            onToggle: (self) => console.log('toggled, isActive:', self.isActive),
            onUpdate: (self) => {
              console.log(
                'progress:',
                self.progress.toFixed(3),
                'direction:',
                self.direction,
                'velocity',
                self.getVelocity()
              );
            },
          }),
        });

        timeline
          .from(scroll('intro-name'), { x: 200 }, 0)
          .from(scroll('intro-text'), { x: -200 }, 0);

        // SECOND
        let timeline_2 = gsap.timeline({
          scrollTrigger: buildParams({
            trigger: section('intro-second'),
            start: 'top top',
            end: 'bottom bottom',
            pin: `${section('intro-second')} .container`,
          }),
        });

        timeline_2
          .from(scroll('intro-second-top'), { y: 100 }, 0)
          .from(scroll('intro-second-bottom'), { y: -100 }, 0);
      }
    },
  };
})(jQuery, window.APP);

// infoScene.setPin('[data-scroll="intro-2"]');
