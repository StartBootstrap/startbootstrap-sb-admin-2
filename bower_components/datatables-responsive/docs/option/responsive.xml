<?xml version="1.0" encoding="UTF-8" ?>
<dt-option group="responsive">
	<name>responsive</name>
	<summary>Enable and configure the Responsive extension for DataTables</summary>
	<since>Responsive 1.0.0</since>

	<type type="boolean">
		<description>
			As a boolean value this property will enable Responsive on the DataTable that is being created. `true` will enable Responsive, while `false` will not (even if the table has a class of `-string responsive` or `-string dt-responsive`.

			This is a short-cut option to enable Responsive with the default configuration options. Customisations can be made by giving this parameter as an object, see below.
		</description>
	</type>

	<type type="object">
		<description>
			If given as an object, Responsive will be enabled on the target DataTable, with the Responsive defaults (`$.fn.dataTable.Responsive.defaults`) extended, and potentially overwritten, by the options provided in this object. This is how Responsive can be configured on an individual table basis, or through the defaults.
		</description>
	</type>

	<default value="undefined">
		Responsive will not be initialised by default
	</default>

	<description>
		This option provides the ability to enable and configure Responsive for DataTables. In its simplest form as the boolean `true` it will enable Responsive with the default configuration options (as defined by `$.fn.dataTable.Responsive.defaults`). It can also be used as an object to provide custom configuration options as described below.

		Please note that as with all other configuration options for Responsive, this option is an extension to the [default set of DataTables options](/reference/option). This property should be set in the DataTables initialisation object.
	</description>

	<example title="Enable Responsive for a table"><![CDATA[

$('#example').DataTable( {
	responsive: true
} );

]]></example>

	<example title="Enable Responsive with configuration options"><![CDATA[

$('#example').DataTable( {
	responsive: {
		details: false
	}
} );

]]></example>

</dt-option>