import React, { FC } from 'react';

const RemoteApp = React.lazy(() => import('app2/App'));

const GraphicsMF: FC = () => {
  return (
    <React.Suspense fallback="Загрузка страницы Графики">
      <RemoteApp />
    </React.Suspense>
  );
};

export default GraphicsMF;
