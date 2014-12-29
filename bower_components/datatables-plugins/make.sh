#!/bin/sh

OUT_DIR=$1
DEBUG=$2

# Change into script's own dir
cd $(dirname $0)

DT_SRC=$(dirname $(dirname $(pwd)))
DT_BUILT="${DT_SRC}/built/DataTables"
. $DT_SRC/build/include.sh

scss_compile $DT_SRC/extensions/Plugins/integration/jqueryui/dataTables.jqueryui.scss

js_compress $DT_SRC/extensions/Plugins/features/searchHighlight/dataTables.searchHighlight.js
js_compress $DT_SRC/extensions/Plugins/features/alphabetSearch/dataTables.alphabetSearch.js
js_compress $DT_SRC/extensions/Plugins/features/lengthLinks/dataTables.lengthLinks.js

js_compress $DT_SRC/extensions/Plugins/integration/bootstrap/2/dataTables.bootstrap.js
js_compress $DT_SRC/extensions/Plugins/integration/bootstrap/3/dataTables.bootstrap.js
js_compress $DT_SRC/extensions/Plugins/integration/foundation/dataTables.foundation.js
js_compress $DT_SRC/extensions/Plugins/integration/jqueryui/dataTables.jqueryui.js

# Only copying the integration files
rsync -r integration     $OUT_DIR

