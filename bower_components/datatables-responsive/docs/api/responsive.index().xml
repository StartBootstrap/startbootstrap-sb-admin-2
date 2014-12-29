<?xml version="1.0" encoding="UTF-8" ?>
<dt-api group="responsive">
	<name>responsive.index()</name>
	<summary>Obtain the cell index from a `-tag li` details element</summary>
	<since>1.0.3</since>

	<type type="function">
		<signature>responsive.index( li )</signature>
		<description>Calculate the cell index from a `-tag li` details element</description>
		<parameter type="node|jQuery" name="li">
			The `-tag li` node (or a jQuery collection containing the node) to get the cell index for.
		</parameter>
		<returns type="object">Cell object that contains the properties `row` and `column`. This object can be used as a DataTables `dt-type cell-selector`.</returns>
	</type>

	<description>
		When working with Responsive's details rows it can often be useful to obtain a reference to the cell, row or column that the data shown in the details row comes from. This method provides that ability, returning an object that can be used as a `dt-type cell-selector` with the `dt-api cell()` method.

		Note that this method requires the default renderer to be used for `r-init responsive.details.renderer`. If a custom method is used it will not be able to obtain the information required to calculate the indexes.
	</description>

	<example title="Add a class name to the host cell for data when clicked on"><![CDATA[

var table = $('#example').DataTable();

$('#example').on( 'click', 'li', function () {
	var cellIndx = table.responsive.index( this );

	$( table.cell( cellIndex ).node() )
		.addClass( 'highlight' );
} );

]]></example>
</dt-api>