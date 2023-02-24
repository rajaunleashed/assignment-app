<template>
  <div class="container">
    <ul class="nav">
      <li><a href="#/users">Users</a></li>
      <li><a href="#/transactions">Transactions</a></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import UsersListing from '../components/Users/Listing.vue'

export default {
  name: 'Dashboard',
  components: {
    UsersListing
  },
  data () {
    return {
      users: [],
      editAdd: false
    }
  },
  mounted () {
    axios.get(process.env.API_PATH + '/users')
      .then(result => {
        if (result.data.data.users) {
          this.users = result.data.data.users
        }
      })
  },
  methods: {
    edit: function (userId) {
      console.log('userId', userId)
      this.editAdd = true
    }
  }
}
</script>
