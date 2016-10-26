$(document).ready(function() {
"use strict";
if(!Modernizr.input.placeholder){
	$('[placeholder]').focus(function() {var input = $(this);if (input.val() == input.attr('placeholder')) {input.val('');input.removeClass('placeholder');}}).blur(function() {var input = $(this);if (input.val() == '' || input.val() == input.attr('placeholder')) {input.addClass('placeholder');input.val(input.attr('placeholder'));}}).blur();$('[placeholder]').parents('form').submit(function() {$(this).find('[placeholder]').each(function() {var input = $(this);if (input.val() == input.attr('placeholder')) {input.val('');}})});
};
$('ul li:last-child').addClass('lastItem');
$('ul li:first-child').addClass('firstItem');
$('#gallery .span6:eq(-1), #gallery .span6:eq(-2)').addClass('mar-clear');
$('.complete').appendTo('body');
setTimeout(function() {
	$('.complete').animate({ 'opacity': 0 }, 700);
}, 10000)
$('.complete').hover(function() {
	$(this).animate({ 'opacity': 'hide' }, 350);
})
$('.mob-ver-menu').click(function() {
	$(this).toggleClass('active')
	$('.trig-mob ul').slideToggle();
});
var a = (10 - 0.5 + Math.random() * (300-10+1)).toFixed();
var b = (5 - 0.5 + Math.random() * (40-5+1)).toFixed();
var result = +a + +b;

$('#numb1').html(a);
$('#numb2').html(b);
$('#chek').attr("data-pattern", result);
$('input[name = resultCaptcha]').val(result);
$("[data-default]").focus(function() {
if ( this.value == this.getAttribute( 'data-default' ) ) {
	this.value = "";
}
}).blur(function() {
if ( this.value == "" ) {
	this.value = this.getAttribute( 'data-default' );
}
}).blur();
jQuery(window).scroll(function () {
	if (jQuery(this).scrollTop() > 750) {
		jQuery('#back-top').removeClass('bounceOut').addClass('bounceIn');
	} else {
		jQuery('#back-top').removeClass('bounceIn').addClass('bounceOut');
	}
});
jQuery('#back-top').click(function () {
	jQuery('body,html').stop(false, false).animate({
		scrollTop: 0
	}, 900);
	return false;
});
$('[data-scroll]').on('click', function() {
	var scrollAnchor = $(this).attr('data-scroll'),
		scrollPoint = $('[data-anchor="' + scrollAnchor + '"]').offset().top - 30;
	$('body,html').animate({
		scrollTop: scrollPoint
	}, 500);
	return false;
});
$(window).load(function() {
	$('#status').delay(100).fadeOut('slow');
	$('#preloader').delay(500).fadeOut('slow');
	$('body').delay(500).css({'overflow':'visible'});
});
});



 (function () {
            $.fn.smint = function (options) {
                var settings = $.extend({
                    'scrollSpeed': 500
                    , 'mySelector': 'div'
                }, options);
                // adding a class to users div
                $(this).addClass('smint');
                //Set the variables needed
                var optionLocs = new Array()
                    , lastScrollTop = 0
                    , menuHeight = $(".smint").height()
                    , smint = $('.smint')
                    , smintA = $('.smint a')
                    , myOffset = smint.height();
                if (settings.scrollSpeed) {
                    var scrollSpeed = settings.scrollSpeed
                }
                if (settings.mySelector) {
                    var mySelector = settings.mySelector
                };
                return smintA.each(function (index) {
                    var id = $(this).attr('href').split('#')[1];
                    if (!$(this).hasClass("extLink")) {
                        $(this).attr('id', id);
                    }
                    //Fill the menu
                    optionLocs.push(Array(
                        $(mySelector + "." + id).position().top - menuHeight
                        , $(mySelector + "." + id).height() + $(mySelector + "." + id).position().top, id));
                    ///////////////////////////////////
                    // get initial top offset for the menu
                    var stickyTop = smint.offset().top;
                    // check position and make sticky if needed
                    var stickyMenu = function (direction) {
                        // current distance top
                        var scrollTop = $(window).scrollTop() + myOffset;
                        // if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
                        if (scrollTop > stickyTop + myOffset) {
                            smint.css({
                                'position': 'fixed'
                                , 'top': 0
                                , 'left': 0
                            }).addClass('fxd');

                            // add padding to the body to make up for the loss in heigt when the menu goes to a fixed position.
                            // When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
                            $('body').css('padding-top', menuHeight);
                        } else {
                            smint.css('position', 'relative').removeClass('fxd');
                            //remove the padding we added.
                            $('body').css('padding-top', '0');
                        }

                        // Check if the position is inside then change the menu
                        // Courtesy of Ryan Clarke (@clarkieryan)
                        if (optionLocs[index][0] <= scrollTop && scrollTop <= optionLocs[index][1]) {
                            if (direction == "up") {
                                $("#" + id).addClass("active");
                                $("#" + optionLocs[index + 1][2]).removeClass("active");
                            } else if (index > 0) {
                                $("#" + id).addClass("active");
                                $("#" + optionLocs[index - 1][2]).removeClass("active");
                            } else if (direction == undefined) {
                                $("#" + id).addClass("active");
                            }
                            $.each(optionLocs, function (i) {
                                if (id != optionLocs[i][2]) {

                                    $("#" + optionLocs[i][2]).removeClass("active");
                                }
                            });
                        }
                    };
                    // run functions
                    stickyMenu();
                    // run function every time you scroll
                    $(window).scroll(function () {
                        //Get the direction of scroll
                        var st = $(this).scrollTop() + myOffset;
                        if (st > lastScrollTop) {
                            direction = "down";
                        } else if (st < lastScrollTop) {
                            direction = "up";
                        }
                        lastScrollTop = st;
                        stickyMenu(direction);
                        // Check if at bottom of page, if so, add class to last <a> as sometimes the last div
                        // isnt long enough to scroll to the top of the page and trigger the active state.

                        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                            smintA.removeClass('active')
                            $(".smint a:not('.extLink'):last").addClass('active')

                        } else {
                            smintA.last().removeClass('active')
                        }
                    });
                    ///////////////////////////////////////
                    $(this).on('click', function (e) {
                        // gets the height of the users div. This is used for off-setting the scroll so the menu doesnt overlap any content in the div they jst scrolled to
                        var myOffset = smint.height();
                        // stops hrefs making the page jump when clicked
                        e.preventDefault();
                        // get the hash of the button you just clicked
                        var hash = $(this).attr('href').split('#')[1];
                        var goTo = $(mySelector + '.' + hash).offset().top - myOffset;
                        // Scroll the page to the desired position!
                        $("html, body").stop().animate({
                            scrollTop: goTo
                        }, scrollSpeed);
                        // if the link has the '.extLink' class it will be ignored
                        // Courtesy of mcpacosy â€(@mcpacosy)
                        if ($(this).hasClass("extLink")) {
                            return false;
                        }
                    });
                    //This lets yo use links in body text to scroll. Just add the class 'intLink' to your button and it will scroll
                    $('.intLink').on('click', function (e) {
                        var myOffset = smint.height();
                        e.preventDefault();
                        var hash = $(this).attr('href').split('#')[1];
                        if (smint.hasClass('fxd')) {
                            var goTo = $(mySelector + '.' + hash).position().top - myOffset;
                        } else {
                            var goTo = $(mySelector + '.' + hash).position().top - myOffset * 2;
                        }
                        $("html, body").stop().animate({
                            scrollTop: goTo
                        }, scrollSpeed);
                        if ($(this).hasClass("extLink")) {
                            return false;
                        }
                    });
                });
            };
            $.fn.smint.defaults = {
                'scrollSpeed': 500
                , 'mySelector': 'div'
            };
        })(jQuery);
