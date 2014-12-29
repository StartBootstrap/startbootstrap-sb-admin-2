<?xml version="1.0" encoding="UTF-8" ?>
<dt-example table-type="html-details" table-class="display nowrap" order="2">

<css lib="datatables responsive" />
<js lib="jquery datatables responsive">
<![CDATA[

$(document).ready(function() {
	$('#example').DataTable( {
		responsive: {
			details: {
				type: 'column'
			}
		},
		columnDefs: [ {
			className: 'control',
			orderable: false,
			targets:   0
		} ],
		order: [ 1, 'asc' ]
	} );
} );

]]>
</js>

<title lib="Responsive">Column controlled child rows</title>

<info><![CDATA[

Responsive has two built in methods for displaying the controlling element of the child rows; `inline` which is the default option and shows the control in the first column, and `column` which set a _control column_ as the control. The control column is shown only when there is some other column hidden, and is dedicated only to the show / hide control for the rows.

This example shows the `r-init responsive.details.type` option set to `column` to activate the control column. Note that by default the first column is used as the control, so additionally in the initialisation the `dt-init order` and `dt-init columns.orderable` options are used to disable sorting on this column.

]]></info>

</dt-example>

