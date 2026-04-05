This directory should contain the app icons:
- icon.png (512x512 or 1024x1024 PNG for all platforms)
- icon.ico (Windows, multi-size .ico)
- icon.icns (macOS)

You can generate these from the SVG in public/icons/icon-512x512.svg using tools like:
- electron-icon-builder
- https://www.electron.build/icons
- ImageMagick: convert icon.png -resize 256x256 icon.ico
