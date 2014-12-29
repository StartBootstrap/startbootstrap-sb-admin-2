/*!
 Page length control via links for DataTables
 2014 SpryMedia Ltd - datatables.net/license
*/
(function(i,j,a){a.fn.dataTable.LengthLinks=function(d){var c=new a.fn.dataTable.Api(d),f=c.settings()[0],e=a("<div></div>").addClass(f.oClasses.sLength),h=-1;this.container=function(){return e[0]};e.on("click.dtll","a",function(b){b.preventDefault();c.page.len(1*a(this).data("length")).draw(!1)});c.on("draw",function(){if(c.page.len()!==h){var b=f.aLengthMenu,d=2===b.length&&a.isArray(b[0])?b[1]:b,g=2===b.length&&a.isArray(b[0])?b[0]:b,b=a.map(g,function(b,a){return b==c.page.len()?'<a class="active" data-length="'+
g[a]+'">'+d[a]+"</a>":'<a data-length="'+g[a]+'">'+d[a]+"</a>"});e.html(f.oLanguage.sLengthMenu.replace("_MENU_",b.join(" | ")));h=c.page.len()}});c.on("destroy",function(){e.off("click.dtll","a")})};a.fn.dataTable.ext.feature.push({fnInit:function(d){return(new a.fn.dataTable.LengthLinks(d)).container()},cFeature:"L",sFeature:"LengthLinks"})})(window,document,jQuery);
