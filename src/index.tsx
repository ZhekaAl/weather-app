
// import '@styles/styles.less';
// import '@styles/styles.scss';

// import React from 'react';
// import ReactDom from 'react-dom';

// import  App  from './App';

// ReactDom.render(<App />, document.getElementById('root'));

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import App from './App';
import {CitiesProvider} from './store/cities/cities-provider';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CitiesProvider>
                <App />
            </CitiesProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
