<?php
/**
 * Twentytwenty-darkmode Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package twentytwenty-darkmode
 */

require_once __DIR__ . '/vendor/autoload.php';

$enqueue = new \WPackio\Enqueue( 'appName', 'outputPath', '1.0.0', 'plugin', __FILE__ );

// Do stuff through this plugin
class MyThemeInit {
	/**
	 * @var \WPackio\Enqueue
	 */
	public $enqueue;

	public function __construct() {
		// It is important that we init the Enqueue class right at the plugin/theme load time
		$this->enqueue = new \WPackio\Enqueue(
			// Name of the project, same as `appName` in wpackio.project.js
			'twentytwentyDarkmode',
			// Output directory, same as `outputPath` in wpackio.project.js
			'dist',
			// Theme Version
			'1.0.0',
			// Type of your project, same as `type` in wpackio.project.js
			'theme',
			// Plugin location, pass false in case of theme.
			false,
			// Type of Theme (regular or child)
			'child'
		);

		// $assets = $this->enqueue->getAssets( 'app', 'main', []);
		// echo '<pre>';
		// var_dump($assets); die();

		// Enqueue a few of our entry points
		add_action( 'wp_enqueue_scripts', [ $this, 'frontend_enqueue' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'backend_enqueue' ] );
	}

	public function frontend_enqueue() {
		wp_enqueue_style( 'twentytwenty-style', get_template_directory_uri() . '/style.css' );

		// Enqueue files[0] (name = app) - entryPoint main
		$this->enqueue->enqueue( 'app', 'main', [] );
	}

	public function backend_enqueue() {

		// Enqueue files[0] (name = app) - entryPoint main
		$this->enqueue->enqueue( 'app', 'editor', [] );
	}
}


// Init
new MyThemeInit();
