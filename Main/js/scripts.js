'use strict'
$(document).ready(function () {
    var toggleMobileMenu = function () {
        if ($(window).width() < 768) {
            $('.menu-collapsed').toggleClass("menu-expanded");
        }
    };

    $(".menu-collapsed").on('click', function () {
        toggleMobileMenu();
    });

    //smooth scrolling
    $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            toggleMobileMenu();
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    //animating headers
    var hideHeader = function(header) {
        header.css('text-indent', '-9999px');
    };

    var showHeader = function(header) {
        header.css('text-indent', '0px');
    };

    var animateHeader = function(header, text) {
        //clear header text
        header.text("");
        //and animate it
        var nextAnimationStep = function() {
            if (text.length > 0) {
                header.text(header.text() + text.substr(0,1));
                text = text.substr(1);
               setTimeout(nextAnimationStep, 100);
            }
        };
        nextAnimationStep();
    };

    //filtering for portfolio
    var previousClickedMenuLink = undefined;
    $('.portfolio_menu').on('click', 'a', function(event){
        event.preventDefault();

        if (previousClickedMenuLink) {
            previousClickedMenuLink.removeClass('active');
        }
        var link = $(event.target);
        link.addClass('active');
        previousClickedMenuLink = link;

        var targetTag = $(event.target).data('portfolio-target-tag');
        var portfolioItems = $('.portfolio_items').children();

        if (targetTag === 'all') {
            portfolioItems.fadeIn({duration: 500});
        } else {
            portfolioItems.hide();
        }

        portfolioItems.each(function(index, value){
            var item = $(value);
            if (item.data('portfolio-tag') === targetTag) {
                item.fadeIn({duration: 500});
            }
        });
    });

    //review slider stuff
    var reviewSlides = $('#reviews').children();
    var numOfReviews = reviewSlides.length;
    var currentSlide = 0;

    reviewSlides.hide();
    reviewSlides.eq(currentSlide).fadeIn();

    $('.js-review-btn-left').on('click', function (event){
        event.preventDefault();
        reviewSlides.eq(currentSlide).hide();

        if(currentSlide === 0) {
            currentSlide = numOfReviews - 1;
        } else {
            currentSlide = currentSlide - 1;
        };

        reviewSlides.eq(currentSlide).fadeIn();
    });

    $('.js-review-btn-right').on('click', function (event){
        event.preventDefault();
        reviewSlides.eq(currentSlide).hide();

        if(currentSlide === numOfReviews - 1) {
            currentSlide = 0;
        } else {
            currentSlide = currentSlide + 1;
        };

        reviewSlides.eq(currentSlide).fadeIn();
    });

    // Modal content for portfolio
    $('#portfolio-modal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var currentParent = button.closest('.js-portfolio-item');
      var title = currentParent.find('.portfolio_title').html(),
          img = currentParent.find('img').attr('src'),
          desc = currentParent.find('.portfolio_description').html(),
          url = currentParent.find('.portfolio_link').html(),
          stack = currentParent.find('.list-inline').html();
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this);
      modal.find('#portfolio-modal-label').html(title);
      modal.find('.img-responsive').attr('src' , img);
      modal.find('.img-responsive').html(img);
      modal.find('.portfolio_description').html(desc);
      modal.find('.portfolio_link').attr('href' , url);
      modal.find('.portfolio_link').html(url);
      modal.find('.list-inline').html(stack);
    });

    // Contact form action
    $('#contact-form').submit(function () {
        var name = $('#name-input').val();
        var email = $('#email-input').val();
        var message = $('#message-input').val();

        var formData = {
            name: name,
            email: email,
            message: message
        };

        $.ajax({
          type: "POST",
          url: '/mail.php',
          data: formData,
          success: function() {
            $('#form-submit-errors').text("Success!");
          },
          error: function() {
            $('#form-submit-errors').text("Something went wrong...");
          }
        });

        return false;
    });
});
