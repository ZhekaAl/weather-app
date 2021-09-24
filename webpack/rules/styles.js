
import { arrayFilterEmpty } from '../utils/helpers';
import {
    cssLoader,
    cssLoaderItems,
    cssModuleLoader,
    cssModulesSupportLoaderItems,
    lessLoader,
    miniCssExtractLoader,
    postCssLoader,
    resolveUrlLoader,
    sassLoaderItems,
} from './useLoaderRuleItems';

/** css **/
export const cssRule = {
    test: /\.css$/,
    use: [miniCssExtractLoader, cssLoader],
    exclude: /\.module\.css$/,
};


/** css-module**/
export const cssModuleRule = {
    test: /\.css$/,
    use: [miniCssExtractLoader, cssModuleLoader],
    include: /\.module\.css$/,
};


/** less **/
export const lessModulesRule = {
    test: /\.module.less$/,
    use: arrayFilterEmpty([
        ...cssModulesSupportLoaderItems,
        postCssLoader,
        resolveUrlLoader,
        lessLoader,
    ]),
};
export const lessRule = {
    test: /\.less$/,
    exclude: /\.module.less$/,
    use: arrayFilterEmpty([
        ...cssLoaderItems,
        postCssLoader,
        resolveUrlLoader,
        lessLoader,
    ]),
};

export const lessRules = [lessModulesRule, lessRule];

/** sass **/
export const sassModulesRule = {
    test: /\.module\.s([ca])ss$/,
    use: arrayFilterEmpty([
        ...cssModulesSupportLoaderItems,
        postCssLoader,
        resolveUrlLoader,
        ...sassLoaderItems,
    ]),
};

export const sassRule = {
    test: /\.s([ca])ss$/,
    exclude: /\.module.scss$/,
    use: arrayFilterEmpty([
        ...cssLoaderItems,
        postCssLoader,
        resolveUrlLoader,
        ...sassLoaderItems,
    ]),
};

export const sassRules = [sassModulesRule, sassRule];
