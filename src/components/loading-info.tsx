import React, {ReactElement} from 'react';

import Loader from '../ui-components/icons/loader-oval.component.svg';
import styles from './loading-info.module.css';

export const LoadingInfo = ({text}: {text: string}): ReactElement => (
    <div className={styles.loaderBlock}>
        <Loader className={styles.loader} />
        <div className={styles.loaderDescription}>{text}</div>
    </div>
);
