<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Module
 *
 * Abstract class for modules
 *
 * @var array $fields
 * @var array $settings
 * @since 1.0
 */

abstract class Powerform_Template {

	/*
	 * Template fields
	 *
	 * @var array
	 */
	protected $template_fields = array();

	/*
	 * Template options
	 *
	 * @var array
	 */
	public $options = array();

	/*
	 * Fields property
	 *
	 * @var array
	 */
	protected $fields = array();

	/*
	 * Settings property
	 *
	 * @var array
	 */
	protected $settings = array();

	public function __construct() {
		$this->fields   = $this->fields();
		$this->settings = $this->settings();
		$this->options  = $this->defaults();
	}

	/**
	 * @since 1.0
	 * @return array
	 */
	public function fields() {
		return array();
	}

	/**
	 * @since 1.0
	 * @return array
	 */
	public function settings() {
		return array();
	}

	/**
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array();
	}

	/**
	 * Get specific option from module options
	 *
	 * @since 1.0
	 * @param $option
	 * @param string $default
	 *
	 * @return mixed|string
	 */
	public function get_option( $option, $default = '' ) {
		if ( isset( $this->options[ $option ] ) ) {
			return $this->options[ $option ];
		}
		return $default;
	}
}
