import antfu from '@antfu/eslint-config';

/* Using custom configuration of Antfu's code style: https://github.com/antfu/eslint-config */
export default await antfu(
	{
		typescript: true,
		stylistic: {
			quotes: 'single',
			indent: 'tab',
			semi: 'always',
		},
		ignores: [
			'**/dist',
			'.idea',
			// disable eslint for vendor utils
			'src/functions/apca.ts',
			'src/functions/parsley.js',
		],
		overrides: {
			typescript: {
				'ts/consistent-type-definitions': ['error', 'type'],
			},
		},
	},
	{
		rules: {
			'style/no-tabs': ['error', { allowIndentationTabs: true }],
			'style/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'style/array-bracket-newline': ['error', { multiline: true }],
			'style/array-element-newline': ['error', 'consistent'],
			'antfu/top-level-function': 'off',
		},
	},
	{
		files: ['tsconfig.json', 'tsconfig.node.json', 'package.json'],
		rules: {
			'jsonc/sort-keys': 'off',
		},
	},
);
