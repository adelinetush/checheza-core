#!/bin/bash
I=0
for file in *.ogg
do
  	(( I++ ))
	echo "$file => page$I.ogg"
	mv "$file" "page$I.ogg"
done
