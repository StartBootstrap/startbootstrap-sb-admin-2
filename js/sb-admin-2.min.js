/*!
 * Start Bootstrap - SB Admin 2 v4.0.0 (https://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

!function(l){"use strict";l("#sidebarToggle, #sidebarToggleTop").on("click",function(o){o.preventDefault(),l("body").toggleClass("sidebar-toggled"),l(".sidebar").toggleClass("toggled")}),l("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel",function(o){if(768<l(window).width()){var e=o.originalEvent,t=e.wheelDelta||-e.detail;this.scrollTop+=30*(t<0?1:-1),o.preventDefault()}}),l(document).on("scroll",function(){100<l(this).scrollTop()?l(".scroll-to-top").fadeIn():l(".scroll-to-top").fadeOut()}),l(document).on("click","a.scroll-to-top",function(o){var e=l(this);l("html, body").stop().animate({scrollTop:l(e.attr("href")).offset().top},1e3,"easeInOutExpo"),o.preventDefault()})}(jQuery);