import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	mode: 'production',
	devtool: 'source-map',
	entry: {
		main: './src/js/main.js',
	},
	output: {
		filename: '[name].js', 
		path: path.resolve(__dirname, 'dist/js/'),
	},
	optimization: {
		minimize: false,
	},
};