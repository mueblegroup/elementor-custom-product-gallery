<?php
use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit;

class Elementor_Custom_Gallery extends Widget_Base {
    public function get_name() {
        return 'custom_gallery_widget';
    }

    public function get_title() {
        return 'Custom Product Gallery';
    }

    public function get_icon() {
        return 'eicon-gallery-grid';
    }

    public function get_categories() {
        return [ 'general' ];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'content_section',
            [ 'label' => 'Gallery Images' ]
        );

        $this->add_control(
            'gallery',
            [
                'label' => 'Add Images',
                'type' => Controls_Manager::GALLERY,
                'default' => [],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        if ( empty( $settings['gallery'] ) ) return;

        $images = $settings['gallery']; ?>
        <div class="custom-gallery">
            <div class="main-image">
                <a href="<?php echo esc_url( $images[0]['url'] ); ?>" data-fancybox="gallery">
                    <img id="gallery-main" src="<?php echo esc_url( $images[0]['url'] ); ?>" alt="">
                </a>
            </div>
            <div class="thumbnails swiper">
                <div class="swiper-wrapper">
                    <?php foreach ( $images as $img ) : ?>
                        <div class="swiper-slide">
                            <img onclick="changeGalleryImage('<?php echo esc_url( $img['url'] ); ?>')" 
                                 src="<?php echo esc_url( $img['url'] ); ?>" alt="">
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
        <?php
    }
}
