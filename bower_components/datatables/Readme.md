# DataTables plug-in for jQuery

DataTables is a table enhancing plug-in for the [jQuery](//jquery.com) Javascript library, adding sorting, paging and filtering abilities to plain HTML tables with minimal effort. The stated goal of DataTables is:

> To enhance the accessibility of data in HTML tables.

To meet this goal, DataTables is developed with two distinct groups of users in mind:

* You the developers using DataTables. For developers DataTables provides a wide array of options for how data should be obtained, displayed and acted upon, along with an extensive API for accessing and manipulating the table.

* End users. For those using the interface DataTables presents, actions to get the most from the information contained in tables, such as sorting and filtering, along with paging and scrolling of the data in table, are easy to use, intuitive and fast.


## Installing DataTables

To use DataTables, the primary way to obtain the software is to use the [DataTables downloader](//datatables.net/download). You can also include the individual files from the [DataTables CDN](//cdn.datatables.net). See the [documentation](//datatables.net/manual/installation) for full details.

### NPM and Bower

If you prefer to use a package manager such as NPM or Bower, distribution repositories are available with software built from this repository under the name `datatables.net`. Styling packages for Bootstrap, Foundation and other styling libraries are also available by adding a suffix to the package name.

Please see the DataTables [NPM](//datatables.net/download/npm) and [Bower](//datatables.net/download/bower) installation pages for further information. The [DataTables installation manual](//datatables.net/manual/installation) also has details on how to use package managers with DataTables.


## Usage

In its simplest case, DataTables can be initialised with a single line of Javascript:

```js
$('table').dataTable();
```

where the jQuery selector is used to obtain a reference to the table you want to enhance with DataTables. Optional configuration parameters can be passed in to DataTables to have it perform certain actions by using a configuration object as the parameter passed in to the DataTables constructor. For example:

```js
$('table').dataTable( {
  paginate: false,
  scrollY: 300
} );
```

will disable paging and enable scrolling.

A full list of the options available for DataTables are available in the [documentation](//datatables.net).


## Documentation

Full documentation of the DataTables options, API and plug-in interface are available on the [DataTables web-site](//datatables.net). The site also contains information on the wide variety of plug-ins that are available for DataTables, which can be used to enhance and customise your table even further.


## Support

Support for DataTables is available through the [DataTables forums](//datatables.net/forums) and [commercial support options](//datatables.net/support) are available.


## License

DataTables is release under the [MIT license](//datatables.net/license). You are free to use, modify and distribute this software, as long as the copyright header is left intact (specifically the comment block which starts with `/*!`.
