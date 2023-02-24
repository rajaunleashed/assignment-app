<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-left">Users <a class="btn btn-xs btn-primary" v-bind:href="`#/users`">Add</a></h1>
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td><a v-bind:href="`#/users/${user.id}`" class="btn btn-warning">Edit</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import EditAdd from './EditAdd.vue'
import axios from 'axios'

export default {
  name: 'Listing',
  components: {
    EditAdd
  },
  data () {
    return {
      users: []
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
    }
  }
}
</script>
