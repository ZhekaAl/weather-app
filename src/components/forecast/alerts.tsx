import React, { ReactElement } from 'react';

import { Alert } from '../../store/types';
import { ReactComponent as AlertIcon } from '../../icons/alert.svg';
import { getShortDate, hasCyrillic } from '../../utils/utils';
import styles from './alerts.module.css';

const AlertItem = ({ alert }: { alert: Alert }): ReactElement => {
  const { description = '', end, event, start } = alert;

  const dateString = `${getShortDate(start)} - ${getShortDate(end)}`;
  const title = `${event}: ${dateString}`;

  return (
    <div className={styles.alert}>
      <div className={styles.firstLine}>
        <AlertIcon />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export function Alerts({
  alerts,
}: {
  alerts: Alert[];
}): React.ReactElement | null {
  if (!alerts) return null;

  const filteredAlerts = alerts.filter((alert) => hasCyrillic(alert.event));
  return (
    <>
      {filteredAlerts.map((alert) => (
        <AlertItem key={alert.event + alert.description} alert={alert} />
      ))}
    </>
  );
}
