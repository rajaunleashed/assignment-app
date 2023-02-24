import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import UserListing from '@/components/Users/Listing'
import EditAdd from '@/components/Users/EditAdd'
import Transactions from '@/components/Transactions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/',
          redirect: '/users'
        },
        {
          path: '/users/:id',
          name: 'User',
          component: EditAdd
        },
        {
          path: '/users',
          name: 'UserListing',
          component: UserListing
        },
        {
          path: '/users/add',
          name: 'User',
          component: EditAdd
        },
        {
          path: '/transactions',
          name: 'Transactions',
          component: Transactions
        }
      ]
    }

  ]
})
