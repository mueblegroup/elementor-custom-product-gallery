<?php
/*
Plugin Name: Custom Product Gallery
Description: WooCommerce-style gallery with thumbnails slider & Elementor widget.
Version: 2.0
Author: Mueble Group
*/
if (! defined('ABSPATH')) exit;
class Custom_Product_Gallery
{
    public function __construct()
    {

        // Shortcode

        add_shortcode('custom_gallery', array($this, 'render_gallery'));



        // Assets

        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));



        // Elementor widget

        add_action('elementor/widgets/register', array($this, 'register_elementor_widget'));
    }



    public function enqueue_scripts()
    {

        // Styles

        wp_enqueue_style('custom-gallery-css', plugin_dir_url(__FILE__) . 'css/custom-gallery.css');

        wp_enqueue_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');

        wp_enqueue_style('fancybox-css', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css');



        // Scripts

        wp_enqueue_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', [], null, true);

        wp_enqueue_script('fancybox-js', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js', ['jquery'], null, true);

        wp_enqueue_script('custom-gallery-js', plugin_dir_url(__FILE__) . 'js/custom-gallery.js', ['jquery'], null, true);
    }



    public function render_gallery($atts)
    {

        $atts = shortcode_atts(['images' => ''], $atts);

        $images = array_map('trim', explode(',', $atts['images']));

        if (empty($images[0])) return '<p>No images provided.</p>';



        ob_start(); ?>

        <div class="custom-gallery">

            <div class="main-image">

                <a href="<?php echo esc_url($images[0]); ?>" data-fancybox="gallery">

                    <img id="gallery-main" src="<?php echo esc_url($images[0]); ?>" alt="Product Image">

                </a>

            </div>



            <div class="thumbnails swiper">

                <div class="swiper-wrapper">

                    <?php foreach ($images as $img) : ?>

                        <div class="swiper-slide">

                            <img onclick="changeGalleryImage('<?php echo esc_url($img); ?>')"

                                src="<?php echo esc_url($img); ?>" alt="Thumbnail">

                        </div>

                    <?php endforeach; ?>

                </div>

                <div class="swiper-button-next"></div>

                <div class="swiper-button-prev"></div>

            </div>

        </div>

<?php return ob_get_clean();
    }



    public function register_elementor_widget($widgets_manager)
    {

        require_once __DIR__ . '/elementor-widget.php';

        $widgets_manager->register(new \Elementor_Custom_Gallery());
    }
}



new Custom_Product_Gallery();
