#!/bin/bash
folder="/home/andreas/checheza-core/www/addons/checheza.widget.bookshelf/books/english/"
for i in $(ls $folder); do
	for j in $(ls $folder$i/ | grep .png | grep -v "front"); do
		page="$folder$i/$j"
		convert $page -resize 500 -depth 5 -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=0 $page
	done
done
