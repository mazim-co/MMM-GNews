/* global Module */
Module.register("MMM-GNews", {
  defaults: {
    // Step-1: static image only – API mode comes later
    localImageUrl: null, // e.g., "modules/MMM-GNews/assets/example.jpg"
    title: "",
    source: "",
    publishedAt: null, // ISO date string

    // UI
    imageWidth: 380,
    imageHeight: 220,
    cropMode: "cover", // cover | contain
    rounded: true,
    showSource: true,
    showTime: true,
    showTitle: true
  },

  getStyles() {
    return [this.file("MMM-GNews.css")];
  },

  getDom() {
    const w = document.createElement("div");
    w.className = "mmm-gnews" + (this.config.rounded ? " rounded" : "");

    const container = document.createElement("div");
    container.className = "gnews-container";

    // FIGURE: image + meta underneath
    const figure = document.createElement("figure");
    figure.className = "gnews-figure";

    const img = document.createElement("img");
    img.className = "gnews-image";
    img.style.width = this.config.imageWidth + "px";
    img.style.height = this.config.imageHeight + "px";
    img.style.objectFit = this.config.cropMode;
    img.alt = this.config.title || "";
    img.loading = "lazy";
    img.decoding = "async";

    if (this.config.localImageUrl) {
      img.src = this.config.localImageUrl;
    } else {
      img.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='${this.config.imageWidth}' height='${this.config.imageHeight}'>
             <rect width='100%' height='100%' fill='black' fill-opacity='0.1'/>
             <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                   fill='white' fill-opacity='0.5' font-size='14'>No image set</text>
           </svg>`
        );
    }

    figure.appendChild(img);

    const meta = document.createElement("figcaption");
    meta.className = "gnews-meta";
    const bits = [];
    if (this.config.showSource && this.config.source) bits.push(this.config.source);
    if (this.config.showTime && this.config.publishedAt)
      bits.push(this.relativeTime(this.config.publishedAt));
    meta.textContent = bits.join(" · ");
    figure.appendChild(meta);

    // TEXT: headline beside image
    const text = document.createElement("div");
    text.className = "gnews-text";
    if (this.config.showTitle && this.config.title) {
      const t = document.createElement("div");
      t.className = "gnews-title bright";
      t.textContent = this.config.title;
      text.appendChild(t);
    }

    container.appendChild(figure);
    container.appendChild(text);
    w.appendChild(container);
    return w;
  },

  relativeTime(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.max(0, (now - d) / 1000);
    const m = 60,
      h = 3600,
      day = 86400;
    if (diff < m) return Math.floor(diff) + "s";
    if (diff < h) return Math.floor(diff / m) + "m";
    if (diff < day) return Math.floor(diff / h) + "h";
    const days = Math.floor(diff / day);
    if (days < 7) return days + "d";
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return weeks + "w";
    const months = Math.floor(days / 30);
    if (months < 12) return months + "mo";
    const years = Math.floor(days / 365);
    return years + "y";
  }
});