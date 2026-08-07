const path = require('path');

module.exports = (env, argv) => {
	const mode = argv.mode || 'production';
	const isDev = mode === 'development';

	return {
		mode,
		entry: {
			'shared-ui.min': [
				'./assets/js/library/clipboard.js',
				'./assets/js/library/a11y-dialog.js',
				'./assets/js/library/select2.full.js',
				'./assets/js/shared-ui.js',
			],
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'assets/js'),
		},
		devtool: isDev ? 'eval-source-map' : 'source-map',
		plugins: [],
		watchOptions: {
			poll: 500,
		},
		optimization: {
			minimize: !isDev,
		},
	};
};
