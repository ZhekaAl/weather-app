import React, {useRef} from 'react';
import {useSwipeable} from 'react-swipeable';

import styles from './index.module.css';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Drawer = (props: DrawerProps): React.ReactElement => {
    const {show, onClose, children} = props;
    const dialogRef = useRef<HTMLDivElement>(null);

    const clickOutsideCheck = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (
            dialogRef.current &&
            !dialogRef.current?.contains(e.target as Node)
        ) {
            onClose();
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: onClose,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div
            id="modalCallback"
            className={`
    ${styles.modal}
    ${show ? styles.in : ''}
      `}
            onClick={clickOutsideCheck}
            {...handlers}
        >
            <div
                className={`
        ${styles.modalDialog}
        ${styles.middle}
      `}
                ref={dialogRef}
            >
                {children}
            </div>
        </div>
    );
};
