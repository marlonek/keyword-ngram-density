=== Keyword n-gram density ===
Contributors: marlonk
Tags: keyword density, seo, phrases, ngram, editor
Requires at least: 5.8
Tested up to: 7.1
Requires PHP: 7.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

See which 1–5 word phrases repeat in the post you are editing, so you can check keyword focus and trim repetition. Runs in your browser.

== Description ==

Keyword n-gram density adds a small panel to the WordPress editor that counts how
often 1-, 2-, 3-, 4- and 5-word phrases repeat in the post you are writing — so you
can spot over-used phrases, check your keyword focus, and tighten repetitive copy.

* Analyze the current post with one click.
* Choose which phrase lengths to count (1 to 5 words).
* Set a minimum repeat count and optionally ignore common stop-words (English + Polish).
* See the top phrases per length, with their count and share (%).

**Privacy:** the analysis runs entirely in your browser from the content you are
editing. The plugin makes no network requests, stores nothing, and sends no data
anywhere.

Works in both the block editor and the classic editor.

== Installation ==

1. Upload the `keyword-ngram-density` folder to `/wp-content/plugins/`, or install it from the Plugins screen.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Open any post or page. In the editor sidebar you will find the **Keyword n-gram density** panel. Click **Analyze**.

== Frequently Asked Questions ==

= Does it send my content anywhere? =

No. All counting happens in your browser, using the content currently in the editor.
There are no network requests and nothing is stored.

= Which editors are supported? =

Both the block editor (Gutenberg) and the classic editor.

= What counts as a phrase? =

A phrase is a sequence of consecutive words (an "n-gram"). The plugin counts 1- to
5-word sequences and shows how many times each one repeats.

== Screenshots ==

1. The Keyword n-gram density panel in the post editor, showing repeated phrases.

== Changelog ==

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
