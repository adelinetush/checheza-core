#!/bin/bash
folder="/home/andreas/checheza-core/www/addons/checheza.widget.bookshelf/books/english/"
for i in $(ls $folder); do
	for j in $(ls $folder$i/ | grep .ogg | grep -v "front"); do
		page="$folder$i/$j"
		new_page="$folder$i/new.$j"

		ffmpeg -threads 0 -i $page -acodec libopus -b:a 6k -vbr on -compression_level 10 -ac 1 $new_page

		rm $page
		mv $new_page $page
	done
done
