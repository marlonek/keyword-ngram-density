# Melioo Keyword Density

A WordPress plugin that shows repeated **1–5 word phrases** (n-grams) in the post you are
editing — so you can check keyword focus and trim repetition. The analysis runs entirely in
your browser; the plugin makes no network requests and stores nothing.

- One-click **Analyze** panel in the editor (block editor and classic editor).
- Choose phrase lengths (1–5), a minimum repeat count, and optionally ignore stop-words (EN + PL).
- Top phrases per length with count and share (%).

Companion to the [Keyword n-gram counter](https://github.com/marlonek/keyword-ngram-counter)
Google Sheets add-on — same phrase-counting engine, inside WordPress.

## Install (manual / testing)

1. Copy the `melioo-keyword-density` folder into `wp-content/plugins/` (or zip it and upload via
   **Plugins → Add New → Upload Plugin**).
2. Activate it under **Plugins**.
3. Open any post/page → the **Melioo Keyword Density** panel is in the editor sidebar → click **Analyze**.

## Files

```
melioo-keyword-density.php  — plugin bootstrap: meta box + asset enqueue
assets/editor.js            — n-gram engine + UI (runs in the browser)
assets/editor.css           — panel styling
readme.txt                  — WordPress.org readme
```

The WordPress plugin slug / text domain is `melioo-keyword-density`.

## Privacy

All counting happens in the browser from the content currently in the editor. No network
requests, no stored data, nothing sent anywhere.

## Author

Built by [Bartosz Koplin](https://bartoszkoplin.pl) · contact: kontakt@bartoszkoplin.pl

## License

GPLv2 or later — see [LICENSE](LICENSE).
