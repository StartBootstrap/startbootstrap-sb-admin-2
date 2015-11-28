#!/bin/sh

OUT_DIR=$1
DEBUG=$2

# Change into script's own dir
cd $(dirname $0)

DT_SRC=$(dirname $(dirname $(pwd)))
DT_BUILT="${DT_SRC}/built/DataTables"
. $DT_SRC/build/include.sh

# Copy CSS
rsync -r css $OUT_DIR
css_frameworks responsive $OUT_DIR/css

# Copy images
#rsync -r images $OUT_DIR

# Copy JS
rsync -r js $OUT_DIR
js_compress $OUT_DIR/js/dataTables.responsive.js
js_frameworks responsive $OUT_DIR/js

# Copy and build examples
rsync -r examples $OUT_DIR
examples_process $OUT_DIR/examples

# Readme and license
cp Readme.md $OUT_DIR
cp License.txt $OUT_DIR

