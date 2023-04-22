#!/usr/bin/env bash

TIMESTAMP=`date "+%Y%m%d-%H%M%S"`
FROM=~/Documents/code/bottlit
FIREBASE_ROOT=~/Documents/code/poordog.dev

mkdir -p $FIREBASE_ROOT/public/bottlit/dist
cp -pa $FROM/dist $FIREBASE_ROOT/public/bottlit/
cp -pa $FROM/index.html $FIREBASE_ROOT/public/bottlit/
cp -pa $FROM/bottlit.css $FIREBASE_ROOT/public/bottlit/

cd $FIREBASE_ROOT && firebase deploy
