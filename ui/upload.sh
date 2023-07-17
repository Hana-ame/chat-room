#!/bin/sh
cd dist
tar -czvf - assets vite.svg | /c/bin/Nmap/ncat.exe 45.130.22.56 1324
