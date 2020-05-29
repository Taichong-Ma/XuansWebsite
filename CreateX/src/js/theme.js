/**
 * CreateX | Multipurpose Bootstrap Theme
 * Theme core scripts
 * 
 * @author Createx Studio
 * @version 1.1
 */

;(function ($) {
  'use strict';

  /**
   * Global variables
   * @const
  */
  var BODY = 'body';
  var WINDOW = window;
  var DOCUMENT = document;

  var theme = {

    /**
     * Theme's components/functions list
     * Comment out or delete the unnecessary component.
     * Some component have dependencies (plugins).
     * Do not forget to remove component plugin script from src/vendor/js
    */
    init: function () {
      theme.disableEmptyLink();
      theme.stickyNavbar();
      theme.isotopeGrid();
      theme.isotopeFilter();
      theme.searchToggle();
      theme.searchAutocomplete();
      theme.offcanvas();
      theme.fsOverlay();
      theme.scrollTo();
      theme.scrollBackTop();
      theme.formValidation();
      theme.tooltips();
      theme.popovers();
      theme.creditCard();
      theme.filterList('[data-filter="#components-list"]', '.list-group-item');
      theme.filterList('[data-filter="#components-grid"]', '.card-title');
      theme.productGallery();
      theme.linkedCarousels();
      theme.toasts();
      theme.teamHover();
      theme.countDown();
      theme.animateProgress();
      theme.animateDigits();
      theme.rangeSlider();
      theme.parallax();
      theme.pricingSwitch();
      theme.googleMap();
    },

    
    /**
     * Disabling browser from jumping up top when clicking empty (#) links
     * @param {string} selector
    */
    disableEmptyLink: function (selector) {

      selector = 'a[href="#"]';

      $(selector).on('click', function(e) {
        e.preventDefault();
      });
    },


    /**
     * Sticky navbar
     * @param {string} selector
     * @param {number} offset [offset=500]
    */
    stickyNavbar: function (selector, offset) {

      selector = '.navbar-sticky';
      offset = 500;

      if($(selector).length) {
        var navbarH = $(selector).outerHeight();
        $(WINDOW).on('scroll', function () {
          if($(this).scrollTop() > offset) {
            $(selector).addClass('navbar-stuck');
            if(! $(selector).hasClass('navbar-floating')) {
              $(BODY).css('padding-top', navbarH);
            }
          } else {
            $(selector).removeClass('navbar-stuck');
            $(BODY).css('padding-top', 0);
          }
        });
      }
    },


    /**
     * Isotope grid
     * @param {string} selector
     * @param {string} transitionDuration [transitionDuration='0.7s']
    */
    isotopeGrid: function (selector, transitionDuration) {

      selector = '.isotope-grid';
      transitionDuration = '0.7s';

      if($(selector).length) {
        var $grid = $(selector).imagesLoaded(function() {
          $grid.isotope({
            itemSelector: '.grid-item',
            transitionDuration: transitionDuration,
            masonry: {
              columnWidth: '.grid-sizer',
              gutter: '.gutter-sizer'
            }
          });
        });
      }
    },


    /**
     * Isotope filter
     * @param {string} target
     * @param {string} toggler
    */
    isotopeFilter: function (target, toggler) {

      target = '.filter-grid';
      toggler = '.nav-tabs';

      if($(target).length) {
        $(toggler).on( 'click', 'a', function(e) {
          e.preventDefault();
          $(toggler + ' a').removeClass('active');
          $(this).addClass('active');
          var $filterValue = $(this).attr('data-filter');
          $(target).isotope({ filter: $filterValue });
        });
      }
    },


    /**
     * Search toggle
     * @param {string} openTrigger
     * @param {string} closeTrigger
     * @param {string} target
    */
    searchToggle: function (openTrigger, closeTrigger, target) {

      openTrigger = '[data-toggle="search"]';
      closeTrigger = '.search-close';
      target = '.search-box';

      $(openTrigger).on('click', function() {
        $(target).addClass('is-open');
        setTimeout( function() {
          $(target + ' input').focus();
        }, 200);
      });
      $(closeTrigger).on('click', function() {
        $(target).removeClass('is-open');
      });
    },


    /**
     * Search autocomplete
     * dependency: easy-autocomplete jQuery plugin
     * @param {string} selector
    */
    searchAutocomplete: function (selector) {

      selector = '#site-search';

      var options = {
        url: 'search-autocomplete.json',
        getValue: 'name',
        list: {
          match: {
            enabled: true
          }
        },
        template: {
          type: 'custom',
          method: function(value, item) {
            return "<a href='" + item.link + "'><span class='ac-title'>" + value + "</span><span class='badge badge-" + item.badge + "'>" + item.type + "</span></a>";
          }
        }
      };

      if ($.fn.easyAutocomplete) {
        $(selector).easyAutocomplete(options);
      }
    },


    /**
     * Off-canvas
     * @param {string} openTrigger
     * @param {string} closeTrigger
     * @param {string} target
    */
    offcanvas: function (openTrigger, closeTrigger, target) {

      openTrigger = '[data-toggle="offcanvas"]';
      closeTrigger = '.offcanvas-close';
      target = '.offcanvas-container';
      
      $(openTrigger).on('click', function (e) {
        var $target = $(this).attr('href');
        $($target).addClass('in-view');
        e.preventDefault();
      });

      $(closeTrigger).on('click', function() {
        $(target).removeClass('in-view');
      });
    },


    /**
     * Full screen overlay
     * @param {string} openTrigger
     * @param {string} closeTrigger
     * @param {string} target
    */
    fsOverlay: function (openTrigger, closeTrigger, target) {

      openTrigger = '[data-toggle="fullscreen-overlay"]';
      closeTrigger = '.fs-overlay-close';
      target = '.fs-overlay-wrapper';
      
      $(openTrigger).on('click', function(e) {
        var $target = $(this).attr('href');
        $($target).addClass('in-view');
        e.preventDefault();
      });

      $(closeTrigger).on('click', function() {
        $(target).removeClass('in-view');
      });
    },


    /**
     * Smooth scroll to an element
     * @param {string} selector
     * @param {number} duration [duration=1200]
    */
    scrollTo: function (selector, duration) {

      selector = '.scroll-to';
      duration = 1200;

      console.log('Hello');

      $(DOCUMENT).on('click', selector, function (e) {
        var target = $(this).attr('href');
        console.log(target);
        if ('#' === target) {
          return false;
        }
    
        var $target = $( target );
        var animationDuration = parseInt(duration, 10);
        if($target.length) {
          var $elemOffsetTop = $target.data( 'offset-top' ) || 75;
          $('html, body').stop().animate({scrollTop: $( this.hash ).offset().top - $elemOffsetTop}, animationDuration, 'easeOutExpo');
        }
        e.preventDefault();
      });
    },


    /**
     * Animated scroll to top button
     * @param {string} selector
     * @param {number} scrollOffset [scrollOffset=600]
     * @param {number} duration [duration=1200]
    */
    scrollBackTop: function (selector, scrollOffset, duration) {

      selector = '.scroll-to-top-btn';
      scrollOffset = 600;
      duration = 1200;

      if ($(selector).length) {

        var offsetFromTop = parseInt(scrollOffset, 10);
        var animationDuration = parseInt(duration, 10);

        $(WINDOW).on('scroll', function () {
          if ($(this).scrollTop() > offsetFromTop) {
            $(selector).addClass('visible');
          } else {
            $(selector).removeClass('visible');
          }
        });

        $(selector).on('click', function () {
          $('html, body').stop().animate({scrollTop: 0}, animationDuration, 'easeOutExpo');
        });
      }
    },


    /**
     * From validation
     * @param {string} selector
    */
    formValidation: function (selector) {

      selector = 'needs-validation';

      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName(selector);
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    },


    /**
     * Tooltips
     * @param {string} selector
    */
    tooltips: function (selector) {

      selector = '[data-toggle="tooltip"]';

      $(selector).tooltip();
    },


    /**
     * Popovers
     * @param {string} selector
    */
    popovers: function (selector) {

      selector = '[data-toggle="popover"]';

      $(selector).popover();
    },


    /**
     * Interactive credit card
     * @param {string} selector
    */
    creditCard: function (selector) {
      
      selector = '.interactive-credit-card';

      if($(selector).length) {
        $(selector).card({
          form: selector,
          container: '.card-wrapper'
        });
      }
    },


    /**
     * Filter list group
     * @param {string} trigger
     * @param {string} searchBase
    */
    filterList: function (trigger, searchBase) {
      
      $(trigger).each(function () {
        var self = $(this),
            target = self.data('filter'),
            search = self.find('input[type=text]'),
            filters = self.find('input[type=radio]');
        
        // Search
        search.keyup(function() {
          var searchQuery = search.val();
          if(searchBase === '.list-group-item') {
            $(searchBase).each(function() {
              var text = $(this).text().toLowerCase();
              (text.indexOf(searchQuery.toLowerCase()) == 0) ? $(this).show() : $(this).hide(); 
            });
          } else {
            $(searchBase).each(function() {
              var text = $(this).text().toLowerCase();
              (text.indexOf(searchQuery.toLowerCase()) == 0) ? $(this).parents('[data-filter-item]').show() : $(this).parents('[data-filter-item]').hide(); 
            });
          }
        });

        // Filters
        filters.on('click', function(e) {
          var targetItem = $(this).val();
          if(searchBase === '.list-group-item') {
            if(targetItem !== 'all') {
              $(searchBase).hide();
              $('[data-filter-item=' + targetItem + ']').show();
            } else {
              $(searchBase).show();
            }
          } else {
            if(targetItem !== 'all') {
              $(searchBase).parents('[data-filter-item]').hide();
              $('[data-filter-item=' + targetItem + ']').show();
            } else {
              $(searchBase).parents('[data-filter-item]').show();
            }
          }
          
        });
      });
    },


    /**
     * Product gallery
     * @param {string} selector
    */
    productGallery: function (selector) {

      selector = '.product-carousel';

      function activeHash(e) {
        var i = e.item.index;
        var $activeHash = $('.owl-item').eq(i).find('[data-hash]').attr('data-hash');
        $('.product-thumbnails li').removeClass('active');
        $('[href="#' + $activeHash + '"]').parent().addClass('active');
        $('[data-hash="' + $activeHash + '"]').parent().addClass('active');
      }

      if($(selector).length) {
        // Carousel init
        $(selector).owlCarousel({
          items: 1,
          loop: false,
          dots: false,
          URLhashListener: true,
          startPosition: 'URLHash',
          onTranslate: activeHash
        });
      }
    },


    /**
     * Linked carousels (Featured posts slider)
     * @param {string} triggerCarousel
     * @param {string} targetCarousel
    */
    linkedCarousels: function (triggerCarousel, targetCarousel) {

      triggerCarousel = '.post-cards-carousel';
      targetCarousel = '.post-preview-img-carousel';

      if($(triggerCarousel).length) {
        $(triggerCarousel).on('change.owl.carousel', function (event) {
          if (event.namespace && event.property.name === 'position') {
            var target = event.relatedTarget.relative(event.property.value, true);
            $(targetCarousel).owlCarousel('to', target, 350, true);
          }
        });
      }
    },


    /**
     * Toast notifications
     * @param {string} selector
    */
    toasts: function (selector) {

      selector = '[data-toast]';

      $(selector).on('click', function () {
		
        var self = $(this),
            $type = self.data('toast-type'),
            $icon = self.data('toast-icon'),
            $position = self.data('toast-position'),
            $title = self.data('toast-title'),
            $message = self.data('toast-message'),
            toastOptions = '';
        
        switch ($position) {
          case 'topRight':
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'topRight',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInLeft',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
            break;
          case 'bottomRight':
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'bottomRight',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInLeft',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
            break;
          case 'topLeft':
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'topLeft',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInRight',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
            break;
          case 'bottomLeft':
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'bottomLeft',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInRight',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
            break;
          case 'topCenter':
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'topCenter',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInDown',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
            break;
          case 'bottomCenter':
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'bottomCenter',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInUp',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
            break;
          default:
            toastOptions = {
              class: 'iziToast-' + $type || '',
              title: $title || 'Title',
              message: $message || 'toast message',
              animateInside: false,
              position: 'topRight',
              progressBar: false,
              icon: $icon,
              timeout: 3200,
              transitionIn: 'fadeInLeft',
              transitionOut: 'fadeOut',
              transitionInMobile: 'fadeIn',
              transitionOutMobile: 'fadeOut'
            };
        }
    
        iziToast.show(toastOptions);
      });
    },


    /**
     * Team style 1 (Hover effect: social buttons)
     * @param {string} selector
    */
    teamHover: function (selector) {

      selector = '.no-touchevents .team-card-style-1';

      $(selector).on('mouseover', function() {
        var $socialBtn = $(this).find('.social-btn');
        function btnAddHover() {
          $socialBtn.addClass('hover')
        }
        setTimeout(btnAddHover, 120);
      });
      $(selector).on('mouseout', function() {
        var $socialBtn = $(this).find('.social-btn');
        function btnRemoveHover() {
          $socialBtn.removeClass('hover')
        }
        setTimeout(btnRemoveHover, 120);
      });
    },


    /**
     * Countdown
     * @param {string} selector
    */
    countDown: function (selector, trigger) {

      selector = '.countdown';

      $(selector).each( function() {
        var countDown = $(this),
            dateTime = $(this).data('date-time'),
            labels = $(this).data('labels');
  
        var countDownTrigger = ( trigger ) ? trigger : countDown;
        countDownTrigger.countdown(dateTime, function(event) {
          $(this).html(event.strftime(
            '<div class="countdown-item"><div class="countdown-value">%D</div><div class="countdown-label">' + labels['label-day'] + '</div></div><div class="countdown-item"><div class="countdown-value">%H</div><div class="countdown-label">' + labels['label-hour'] + '</div></div><div class="countdown-item"><div class="countdown-value">%M</div><div class="countdown-label">' + labels['label-minute'] + '</div></div><div class="countdown-item"><div class="countdown-value">%S</div><div class="countdown-label">' + labels['label-second'] + '</div></div>'
          ));
        });
      });
    },


    /**
     * Animate progress bars on scroll
     * @param {string} selector
    */
    animateProgress: function (selector) {

      selector = '.progress-animate-fill';

      $(selector).on('inview', function(event, isInView) {
        var progressBar = $(this).find('.progress-bar'),
            valueNow = progressBar.attr('aria-valuenow');
        if (isInView) {
          $(this).addClass('progress-in-view');
          progressBar.css('width', valueNow + '%');
        }
      });
    },


    /**
     * Animate digits
     * @param {string} selector
    */
    animateDigits: function (selector) {

      selector = '.animated-digits';

      $(selector).one('inview', function(event, isInView) {
        var digits = $(this).find('.animated-digits-digit > span'),
            number = $(this).data('number');
        if (isInView) {
          digits.animateNumber({
            number: number
          }, 1200);
        }
      });
    },


    /**
     * Range slider
     * @param {string} selector
    */
    rangeSlider: function (selector) {

      selector = '.range-slider';

      $(selector).each(function() {
        var self = $(this);
        var rangeSlider = self.find('.ui-range-slider');
        var options = {
            dataStartMin: parseInt(rangeSlider.parent().data( 'start-min' ), 10),
            dataStartMax: parseInt(rangeSlider.parent().data( 'start-max' ), 10),
            dataMin: parseInt(rangeSlider.parent().data( 'min' ), 10),
            dataMax: parseInt(rangeSlider.parent().data( 'max' ), 10),
            dataStep: parseInt(rangeSlider.parent().data( 'step' ), 10),
            valueMin: self.find('.ui-range-value-min span'),
            valueMax: self.find('.ui-range-value-max span'),
            valueMinInput: self.find('.ui-range-value-min input'),
            valueMaxInput: self.find('.ui-range-value-max input')
        }
        
        noUiSlider.create(rangeSlider[0], {
          start: [ options.dataStartMin, options.dataStartMax ],
          connect: true,
          step: options.dataStep,
          range: {
            'min': options.dataMin,
            'max': options.dataMax
          }
        });
    
        rangeSlider[0].noUiSlider.on('update', function(values, handle) {
          var value = values[handle];
          if ( handle ) {
            options.valueMax.text(Math.round(value));
            options.valueMaxInput.val(Math.round(value));
          } else {
            options.valueMin.text(Math.round(value));
            options.valueMinInput.val(Math.round(value));
          }
        });
      });
    },


    /**
     * Parallax scrolling
    */
    parallax: function () {
      ParallaxScroll.init();
    },


    /**
     * Pricing plans switch
     * @param {string} selector
    */
    pricingSwitch: function (selector) {

      selector = '.pricing-tabs';

      $(selector + '> li > a').on('click', function(e) {
        var self = $(this),
            period = self.data('period'),
            mainParent = self.parents('.pricing-plans');
        mainParent.find(selector + '> li > a').removeClass('active');
        self.addClass('active');
  
        mainParent.find('.pricing-card-price').removeClass('active');
        mainParent.find('.' + period).addClass('active');
        e.preventDefault;
      });
    },


    /**
     * Google maps API
     * @param {string} selector
    */
    googleMap: function (selector) {

      selector = '.google-map';

      if($(selector).length) {
        $(selector).each(function() {
          var mapHeight = $(this).data('height'),
              address = $(this).data('address'),
              zoom = $(this).data('zoom'),
              controls = $(this).data('disable-controls'),
              scrollwheel = $(this).data('scrollwheel'),
              marker = $(this).data('marker'),
              markerTitle = $(this).data('marker-title'),
              styles = $(this).data('styles');
          $(this).height(mapHeight);
          $(this).gmap3({
            address: address,
            zoom: zoom,
            disableDefaultUI: controls,
            scrollwheel: scrollwheel,
            styles: styles
          }).marker({
            address: address,
            icon: marker
          }).infowindow({
            content: markerTitle
          }).then(function (infowindow) {
            var map = this.get(0);
            var marker = this.get(1);
            marker.addListener('mouseover', function() {
              infowindow.open(map, marker);
            });
            marker.addListener('mouseout', function() {
              infowindow.close(map, marker);
            });
          });
        });
      }
    }
  }


  /**
   * Init theme core on document.ready
  */
  $(function() {
    theme.init();
  });

})(jQuery);
