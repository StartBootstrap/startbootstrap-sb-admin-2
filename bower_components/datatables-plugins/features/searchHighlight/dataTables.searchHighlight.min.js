/*!
 SearchHighlight for DataTables v1.0.1
 2014 SpryMedia Ltd - datatables.net/license
*/
(function(f,c,b){b(c).on("init.dt.dth",function(c,d){var a=new b.fn.dataTable.Api(d),e=b(a.table().body());if(b(a.table().node()).hasClass("searchHighlight")||d.oInit.searchHighlight||b.fn.dataTable.defaults.searchHighlight)a.on("draw.dt.dth column-visibility.dt.dth",function(){e.unhighlight();a.rows({filter:"applied"}).data().length&&e.highlight(a.search().split(" "))}).on("destroy",function(){a.off("draw.dt.dth column-visibility.dt.dth")})})})(window,document,jQuery);
