import React, { FC } from 'react';

import { useCurrentWeather } from '../../src/hooks/use-current-weather';

const RemoteApp = React.lazy(() => import('app2/App'));

const GraphicsMF: FC = () => {
  const { city } = useCurrentWeather();
  return (
    <React.Suspense fallback="Загрузка страницы Графики">
      <RemoteApp city={city} />
    </React.Suspense>
  );
};

export default GraphicsMF;
