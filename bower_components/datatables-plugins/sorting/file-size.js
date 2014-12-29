/**
 * When dealing with computer file sizes, it is common to append a post fix
 * such as KB, MB or GB to a string in order to easily denote the order of
 * magnitude of the file size. This plug-in allows sorting to take these
 * indicates of size into account. A counterpart type detection plug-in 
 * is also available.
 *
 *  @name File size
 *  @summary Sort abbreviated file sizes correctly (8MB, 4KB etc)
 *  @author _anjibman_
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'file-size', targets: 0 }
 *       ]
 *    } );
 */

 jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "file-size-pre": function ( a ) {
        var x = a.substring(0,a.length - 2);

        var x_unit = (a.substring(a.length - 2, a.length) == "MB" ?
            1000 : (a.substring(a.length - 2, a.length) == "GB" ? 1000000 : 1));

        return parseInt( x * x_unit, 10 );
    },

    "file-size-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "file-size-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );
