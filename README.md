# MMM-GNews (Step 1)

Minimal MagicMirror² module showing a **static image** with a title and metadata (source · relative time) under the image.  
Step 2 will add real API fetching.

## Installation
1. Place this folder in `~/MagicMirror/modules/MMM-GNews/`
2. Add to your `config.js`:

```js
{
  module: "MMM-GNews",
  position: "top_left",
  header: "🗞️ Aktuelle Schlagzeile",
  config: {
    localImageUrl: "modules/MMM-GNews/assets/example.jpg",
    title: "Eigene Überschrift",
    source: "Quelle X",
    publishedAt: "2025-11-10T12:00:00Z",
    imageWidth: 380,
    imageHeight: 220,
    cropMode: "cover",
    rounded: true,
    showSource: true,
    showTime: true,
    showTitle: true
  }
}