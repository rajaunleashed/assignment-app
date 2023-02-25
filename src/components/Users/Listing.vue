<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-left">Users <a class="btn btn-xs btn-primary" v-bind:href="`#/users/add`">Add</a></h1>
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
              <td>
                <a v-bind:href="`#/users/${user.id}`" class="btn btn-warning">Edit</a>
                <a @click="onDelete(user.id)" class="btn btn-danger">Delete</a>
              </td>
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
    this.fetchUsers()
  },
  methods: {
    edit: function (userId) {
      console.log('userId', userId)
    },
    fetchUsers: function () {
      axios.get(process.env.API_PATH + '/users')
        .then(result => {
          if (result.data.data.users) {
            this.users = result.data.data.users
          }
        })
    },
    onDelete: function (userId) {
      console.log('userId', userId)
      const retVal = confirm('Are you sure want to delete?')
      if (retVal) {
        axios.delete(process.env.API_PATH + '/users/' + userId)
          .then(result => {
            if (result.data.statusCode === 200) {
              this.$toast.open({
                message: result.data.data.message,
                type: 'success'
              })
              this.fetchUsers()
            }
          }).catch(error => {
            this.$toast.open({
              message: error.response.data.data.message,
              type: 'success'
            })
          })
      }
    }
  }
}
</script>
