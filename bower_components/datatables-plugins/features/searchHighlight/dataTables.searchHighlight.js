/*! SearchHighlight for DataTables v1.0.1
 * 2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     SearchHighlight
 * @description Search term highlighter for DataTables
 * @version     1.0.1
 * @file        dataTables.searchHighlight.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2014 SpryMedia Ltd.
 * 
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in for DataTables will highlight search terms in the
 * DataTable as they are entered into the main search input element, or via the
 * `search()` API method.
 *
 * It depends upon the jQuery Highlight plug-in by Bartek Szopka:
 * 	  http://bartaz.github.io/sandbox.js/jquery.highlight.js
 *
 * Search highlighting in DataTables can be enabled by:
 *
 * * Adding the class `searchHighlight` to the HTML table
 * * Setting the `searchHighlight` parameter in the DataTables initialisation to
 *   be true
 * * Setting the `searchHighlight` parameter to be true in the DataTables
 *   defaults (thus causing all tables to have this feature) - i.e.
 *   `$.fn.dataTable.defaults.searchHighlight = true`.
 *
 * For more detailed information please see:
 *     http://datatables.net/blog/2014-10-22
 */

(function(window, document, $){


// Listen for DataTables initialisations
$(document).on( 'init.dt.dth', function (e, settings, json) {
	var table = new $.fn.dataTable.Api( settings );
	var body = $( table.table().body() );

	if (
		$( table.table().node() ).hasClass( 'searchHighlight' ) || // table has class
		settings.oInit.searchHighlight                          || // option specified
		$.fn.dataTable.defaults.searchHighlight                    // default set
	) {
		table
			.on( 'draw.dt.dth column-visibility.dt.dth', function () {
				// On each draw highlight search results, removing the old ones
				body.unhighlight();

				// Don't highlight the "not found" row
				if ( table.rows( { filter: 'applied' } ).data().length ) {
					body.highlight( table.search().split(' ') );
				}
			} )
			.on( 'destroy', function () {
				// Remove event handler
				table.off( 'draw.dt.dth column-visibility.dt.dth' );
			} );
	}
} );


})(window, document, jQuery);
