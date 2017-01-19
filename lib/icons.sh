#!/bin/bash
set -e # stop on error

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..

type convert >/dev/null 2>&1 || { 
  echo >&2 "This script depends on imagemagick, seems like you don't have it installed"
  echo >&2 "To install now (ubuntu):"
  echo >&2 "$ sudo apt-get install update"
  echo >&2 "$ sudo apt-get install imagemagick php5-imagick"
  echo >&2 "Run the script again after installing imagemagick"
  exit 1
}

convert android/app/src/main/res/mipmap-mdpi/icon.png -shave 6x6 -bordercolor '#EF4142' -border 6 android/app/src/main/res/mipmap-mdpi/icon_dev.png
convert android/app/src/main/res/mipmap-hdpi/icon.png -shave 8x8 -bordercolor '#EF4142' -border 8 android/app/src/main/res/mipmap-hdpi/icon_dev.png
convert android/app/src/main/res/mipmap-xhdpi/icon.png -shave 10x10 -bordercolor '#EF4142' -border 10 android/app/src/main/res/mipmap-xhdpi/icon_dev.png
convert android/app/src/main/res/mipmap-xxhdpi/icon.png -shave 12x12 -bordercolor '#EF4142' -border 12 android/app/src/main/res/mipmap-xxhdpi/icon_dev.png

echo "All done! created icon_dev.png files in the following directories:"
echo "android/app/src/main/res/mipmap-mdpi/icon_dev.png"
echo "android/app/src/main/res/mipmap-hdpi/icon_dev.png"
echo "android/app/src/main/res/mipmap-xhdpi/icon_dev.png"
echo "android/app/src/main/res/mipmap-xxhdpi/icon_dev.png"