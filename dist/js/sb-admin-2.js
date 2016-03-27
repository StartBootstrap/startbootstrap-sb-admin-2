$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

	/* current item is set "active" */
	activeCurrentItem();

	/*
	 instead more .filter() calls it used only one .each() iteration.
	 Pathname is used to purge: protocol, host, port, search and hash.
	 */
	function activeCurrentItem() {
		var windowPathname = window.location.pathname;
		var windowSearch = window.location.search;
		var currentItem = document.createElement('a');

		$('ul.nav a')
			.each(function (index, item) {
				var matchSearch = $(item).data('search');
				var windowLink = windowPathname;
				var itemLink = item.pathname;
				var currentLink = currentItem.pathname;

				// skip href="#"
				if (this.href.slice(-1) !== '#') {
					if (matchSearch) {
						// add search to pathname
						windowLink += windowSearch;
						itemLink += item.search;
						currentLink += currentItem.search;
					}

					if (itemLink === windowLink) {
						// equal match founded, got it and stopped iteration
						currentItem = item;
						return false;
					} else if (windowLink.indexOf(itemLink) === 0 && itemLink.length > currentLink.length) {
						// window location href start with same link href, i get longer pathname to match
						currentItem = item;
					}
				}
			});

		if (currentItem.pathname.length) {
			currentItem = $(currentItem).addClass('active');
			$('#side-menu ul.nav').has(currentItem).addClass('in').parent().addClass('active');
		}
	}
});
