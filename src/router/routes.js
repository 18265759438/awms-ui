import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Manage from '@/views/manage'
import Add from '@/views/manage/add'
import Alarm from '@/views/alarm'
import Monit from '@/views/monit'
import VideoPlayer from '@/views/videoPlayer'

export default [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/videoPlayer',
    children: [
      {
        path: '/monit',
        name: 'monit',
        component: Monit,
        meta: {
          title: 'monit'
        }
      },
      {
        path: '/manage',
        name: 'manage',
        component: Manage,
        meta: {
          title: 'manage'
        }
      },
      {
        path: '/manage/add',
        name: 'add',
        component: Add,
        meta: {
          title: 'add'
        }
      },
      {
        path: '/alarm',
        name: 'alarm',
        component: Alarm,
        meta: {
          title: 'alarm'
        }
      },
      {
        path: '/videoPlayer',
        name: 'videoPlayer',
        component: VideoPlayer,
        meta: {
          title: 'videoPlayer'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]
