

import {babelLoader} from './useLoaderRuleItems';

/**
 * Using @svgr/webpack for handling svg files in react components
 * @see https://react-svgr.com/docs/webpack/
 */
export const svgReactComponentRule = {
    test: /\.component\.svg$/,
    use: [
        babelLoader,
        {
            loader: '@svgr/webpack',
             options: {
                 babel: false,
                 svgoConfig: {
                    plugins: {
                      removeViewBox: false
                    }
                  }
             },
        },
    ],
};

/**
 * Using file-loader for handling svg files
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const svgRule = {
    test: /\.inline\.svg$/,
    type: 'asset/resource',
};


export const svgRules = [svgReactComponentRule, svgRule];
