/**
 * Sort by priority through an enumerated list. In this case the words _High_,
 * _Medium_ and _Low_ are used and thus sorted in priority order. This works 
 * by converting the works to a numerical value and then sorting based on that
 * value.
 *
 *  @name enum
 *  @summary Sort an enumerated list of options
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'enum', targets: 0 }
 *       ]
 *    } );
 */

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"enum-pre": function ( a ) {
		// Add / alter the switch statement below to match your enum list
		switch( a ) {
			case "High":   return 1;
			case "Medium": return 2;
			case "Low":    return 3;
			default:       return 4;
		}
	},

	"enum-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"enum-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
} );
