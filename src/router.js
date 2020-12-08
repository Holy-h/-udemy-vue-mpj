import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import notFound from './pages/NotFound.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList,
      name: 'coachesList'
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      name: 'coachDetail',
      children: [
        {
          path: 'contact',
          component: ContactCoach,
          name: 'contactCoach'
        }
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      name: 'registerCoach'
    },
    {
      path: '/requests',
      component: RequestsReceived,
      name: 'requestsList'
    },
    {
      path: '/:notFound(.*)',
      component: notFound
    }
  ]
});

export default router;
