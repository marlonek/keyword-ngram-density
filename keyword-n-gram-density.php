<?php
/**
 * Plugin Name:       Keyword n-gram density
 * Plugin URI:        https://github.com/marlonek/keyword-ngram-density
 * Description:       Shows repeated 1–5 word phrases (n-grams) in the post you are editing, so you can check keyword focus and trim repetition. Analysis runs in your browser — no data is sent anywhere.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Author:            Bartosz Koplin
 * Author URI:        https://bartoszkoplin.pl
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       keyword-n-gram-density
 *
 * @package KeywordNgramDensity
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KNGD_VERSION', '1.0.0' );

/**
 * Register the analysis meta box on editable public post types.
 */
function kngd_add_meta_box() {
	$screens = get_post_types( array( 'public' => true ), 'names' );
	foreach ( $screens as $screen ) {
		add_meta_box(
			'kngd_meta_box',
			__( 'Keyword n-gram density', 'keyword-n-gram-density' ),
			'kngd_render_meta_box',
			$screen,
			'side',
			'default'
		);
	}
}
add_action( 'add_meta_boxes', 'kngd_add_meta_box' );

/**
 * Render the meta box. All analysis happens client-side in assets/editor.js;
 * this only prints static, escaped markup.
 */
function kngd_render_meta_box() {
	?>
	<div class="kngd-box">
		<p class="kngd-sub"><?php esc_html_e( 'Find repeated 1–5 word phrases in this post.', 'keyword-n-gram-density' ); ?></p>

		<p class="kngd-sizes">
			<strong><?php esc_html_e( 'Phrase lengths:', 'keyword-n-gram-density' ); ?></strong><br />
			<label><input type="checkbox" class="kngd-size" value="1" checked /> 1</label>
			<label><input type="checkbox" class="kngd-size" value="2" checked /> 2</label>
			<label><input type="checkbox" class="kngd-size" value="3" checked /> 3</label>
			<label><input type="checkbox" class="kngd-size" value="4" /> 4</label>
			<label><input type="checkbox" class="kngd-size" value="5" /> 5</label>
		</p>

		<p>
			<label><?php esc_html_e( 'Min. count', 'keyword-n-gram-density' ); ?>
				<input type="number" id="kngd-min" value="2" min="1" step="1" />
			</label>
		</p>
		<p>
			<label><input type="checkbox" id="kngd-stop" /> <?php esc_html_e( 'Ignore stop-words', 'keyword-n-gram-density' ); ?></label>
		</p>

		<p>
			<button type="button" class="button button-primary" id="kngd-run"><?php esc_html_e( 'Analyze', 'keyword-n-gram-density' ); ?></button>
		</p>

		<div id="kngd-meta" class="kngd-muted"></div>
		<div id="kngd-tabs" class="kngd-tabs"></div>
		<div id="kngd-results"></div>
	</div>
	<?php
}

/**
 * Load the editor assets only on the post edit screens.
 *
 * @param string $hook Current admin page hook.
 */
function kngd_enqueue_assets( $hook ) {
	if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
		return;
	}
	wp_enqueue_style( 'kngd-editor', plugins_url( 'assets/editor.css', __FILE__ ), array(), KNGD_VERSION );
	wp_enqueue_script( 'kngd-editor', plugins_url( 'assets/editor.js', __FILE__ ), array(), KNGD_VERSION, true );
}
add_action( 'admin_enqueue_scripts', 'kngd_enqueue_assets' );
