import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const MyContract = Loadable({
  loader: () => import('./Modules/MyContract'),
  loading: Loading,
});

const CreateContract = Loadable({
  loader: () => import('./Modules/CreateContract'),
  loading: Loading,
});

const CrowdSaleContract = Loadable({
  loader: () => import('./Modules/CrowdSaleContract'),
  loading: Loading,
});

const DeferredPaymentContract = Loadable({
  loader: () =>
    import('./Modules/DeferredPaymentContract'),
  loading: Loading,
});

const TestContract = Loadable({
  loader: () =>
    import('./Modules/TestContract'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/createContract', name: 'createContract', component: CreateContract },
  { path: '/crowdSaleContract', exact: true, name: 'crowdSaleContract', component: CrowdSaleContract },
  { path: '/myContract', exact: true, name: 'myContract', component: MyContract },
  { path: '/deferredPaymentContract', exact: true, name: 'deferredPaymentContract', component: DeferredPaymentContract },
  { path: '/testContract', exact: true, name: 'testContract', component: TestContract }
];

export default routes;