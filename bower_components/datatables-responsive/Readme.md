# Responsive

Responsive will automatically optimise the table's layout for different screen sizes through the dynamic column visibility control, making your tables useful on desktop and mobile screens.


# Installation

To use Responsive the best way to obtain the software is to use the [DataTables downloader](//datatables.net/download). You can also include the individual files from the [DataTables CDN](//cdn.datatables.net). See the [documentation](http://datatables.net/extensions/responsive/) for full details.


# Basic usage

Responsive is initialised using the `responsive` option in the DataTables constructor - a simple boolean `true` will enable the feature. Further options can be specified using this option as an object - see the documentation for details.

Example:

```js
$(document).ready( function () {
    $('#myTable').DataTable( {
    	responsive: true
    } );
} );
```


# Documentation / support

* [Documentation](https://datatables.net/extensions/responsive/)
* [DataTables support forums](http://datatables.net/forums)


# GitHub

If you fancy getting involved with the development of Responsive and help make it better, please refer to its [GitHub repo](https://github.com/DataTables/Responsive).

