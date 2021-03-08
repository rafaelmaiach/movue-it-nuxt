module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:nuxt/recommended',
	],
	plugins: [
	],
	// add your custom rules here
	rules: {
		'comma-dangle': ['error', 'always-multiline'],
		'import/first': 'off',
		'import/order': 'off',
		indent: 'off',
		'@typescript-eslint/indent': [
			'error',
			'tab',
		],
		'no-new': 'off',
		'no-tabs': 'off',
		semi: ['error', 'always'],
		'vue/html-indent': ['error', 'tab'],
		'vue/order-in-components': 'off',
	},
};
