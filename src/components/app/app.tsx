
import React, {Suspense, lazy} from 'react';

import styles from './app.module.css';
import {stylesContainer} from './app.module.less';
import {stylesHeader, stylesImage} from './app.module.scss';

const LazyStrawberryIcon = lazy(() => import('./strawberry'));
export const App = (): React.ReactElement => (
    <div className={stylesContainer}>
        <div className={stylesHeader}>It works</div>
        <div className={styles.header}>It works</div>
        {/* <div className="header">It works</div> */}
        <Suspense fallback={'loading...'}>
            <LazyStrawberryIcon className={stylesImage} />
        </Suspense>
    </div>
);
