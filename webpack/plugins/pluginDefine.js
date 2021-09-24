import {DefinePlugin} from 'webpack';

/**
 * 
 * @example
 * const config = {
 *     isProd: true
 * }
 */
import {isDev, isDevServer, isProd, mode} from '../utils/env';

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(mode),
        // PUBLIC_URL: JSON.stringify('http://127.0.0.1:3000'),
        PUBLIC_URL: JSON.stringify('./'),
    },
    IS_PROD: isProd,
    IS_DEV: isDev,
    IS_DEV_SERVER: isDevServer,
};

export const definePlugin = new DefinePlugin(config);
