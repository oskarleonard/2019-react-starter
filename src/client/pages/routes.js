import universal from 'react-universal-component';
import Loader from '@client/components/loader/Loader';
import ErrorLoadingRouteChunk from '@client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';

const options = {
  error: ErrorLoadingRouteChunk,
  loading: Loader,
};

export default [
  {
    path: '/',
    exact: true,
    componentPath: 'pages/homePage/HomePage',
    Component: universal(import('pages/homePage/HomePage'), options),
  },
  {
    path: '*',
    componentPath: 'pages/notFoundPage/NotFoundPage',
    Component: universal(import('pages/notFoundPage/NotFoundPage'), options),
    status: 404,
  },
];
