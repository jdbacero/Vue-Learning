import { createRouter, createWebHistory } from "vue-router";
import EventListView from "../views/EventList.vue";
import About from "../views/AboutView.vue";
import EventDetails from "@/views/event/Details"
import EventLayout from "@/views/event/Layout"
import EventEdit from "@/views/event/Edit"
import EventRegister from "@/views/event/Register"
import NotFound from "@/views/NotFound"
import NetworkError from "@/views/NetworkError"

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
        component: EventEdit
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
});

export default router;
