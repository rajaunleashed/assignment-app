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

<style>
.nav {
  padding:0;
  margin-bottom: 20px;
  width: 100%;
  background-color: #eee
}
.nav li {
  display: inline-block;
  padding: 10px;
  border-right: 1px solid rgb(220, 218, 218)
}
.nav li a {
  text-decoration: none;
  color: black
}
</style>
