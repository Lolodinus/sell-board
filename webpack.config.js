const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const PATH = {
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: path.resolve(__dirname, "dist"),
	tamplate: path.resolve(__dirname, "public", "index.html"),
	css: path.join("css", "style.css"),
	image: "assets/image/[hash][ext]"
};

module.exports = {
	mode: "development",
	entry: PATH.entry,
	output: {
		path: PATH.output,
		filename: "index.js",
		clean: true,
		assetModuleFilename: PATH.image
	},
	target: "web",
	devServer: {
		port: "9500",
		open: true,
		hot: true,
		liveReload: false,
		historyApiFallback: true
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			// Loading style
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			// Loading image
			{
				test: /\.(png|jpe?g|gif)$/i,
				type: "asset/resource"
			},
			// {
			// 	test: /\.tsx?$/,
			// 	loader: "ts-loader",
			// 	exclude: /node_modules/
			// },
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATH.tamplate
		}),
		new MiniCssExtractPlugin({
			filename: PATH.css
		}),
		new Dotenv({
			systemvars: true
		})
	]
};
