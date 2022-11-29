import { createRouter, createWebHistory } from "vue-router";
import EventListView from "../views/EventList.vue";
// import About from "../views/AboutView.vue";
import EventDetails from "@/views/event/Details"
import EventLayout from "@/views/event/Layout"
import EventEdit from "@/views/event/Edit"
import EventRegister from "@/views/event/Register"
import NotFound from "@/views/NotFound"
import NetworkError from "@/views/NetworkError"
import NProgress from "nprogress";
import EventService from '@/services/EventService';
import GStore from '@/store'

const About = () => import(/* webpackChunkName: "about" */ '@/views/AboutView')

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventListView,
    props: route => ({
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: "/about-us",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    alias: '/about',
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(event => {
          GStore.event = event.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' }
            }
          } else {
            return {
              name: 'NetworkError'
            }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }
      },
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: `/events/${to.params.afterEvent}` }
    }
  },
  // {
  //   path: '/event/:id',
  //   redirect: () => {
  //     return { name: 'EventDetails' }
  //   },
  //   children: [
  //     {
  //       path: 'register', redirect() { return { name: 'EventRegister' } }
  //     },
  //     {
  //       path: 'edit', redirect() { return { name: 'EventEdit' } }
  //     },
  //   ]
  // },
  // {
  //   path: '/event/:id',
  //   redirect: to => {
  //     return { name: 'EventDetails', params: { id: to.params.id } }
  //   }
  // },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0
    }
  }
});

router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (notAuthorized && to.meta.requireAuth) {
    GStore.flashMessage = "Sorry, you are not authorized to view this page."

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
