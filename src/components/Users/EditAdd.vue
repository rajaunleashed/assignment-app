<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ user.id ? 'Edit' : 'Add' }} User</h1>
        <form @submit="submit">
          <div class="row mt-20">
            <div class="col-12">
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input type="text" @keypress="onValidate(user.first_name, 'first_name')" id="first_name"
                  class="form-control" v-model="user.first_name" placeholder="Enter first name" />
                <p class="error" v-if="errors.first_name">{{ errors.first_name }}</p>
              </div>
            </div>
          </div>

          <div class="row mt-20">
            <div class="col-12">
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input type="text" id="last_name" @keypress="onValidate(user.last_name, 'last_name')" class="form-control"
                  v-model="user.last_name" placeholder="Enter last name" />
                <p class="error" v-if="errors.last_name">{{ errors.last_name }}</p>
              </div>
            </div>
          </div>
          <div class="row mt-20">
            <div class="col-12">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" @keypress="onValidate(user.email, 'email')" v-model="user.email"
                  placeholder="Enter email" id="email" />
                <p class="error" v-if="errors.email">{{ errors.email }}</p>
              </div>
            </div>
          </div>

          <div class="row mt-20">
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Save</button>
              <a :href="'#/'" class="btn btn-danger">Cancel</a>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditAdd',
  data () {
    return {
      errors: [],
      user: {},
      first_name: null,
      last_name: null,
      email: null,
      id: null
    }
  },
  mounted () {
    axios.get(process.env.API_PATH + '/users/' + this.$route.params.id)
      .then(result => {
        if (result.data.data.user) {
          this.user = result.data.data.user
        }
      })
  },
  methods: {
    submit: function (e) {
      this.errors = {}

      if (!this.user.first_name) {
        this.errors['first_name'] = 'This field is required'
      }
      if (!this.user.last_name) {
        this.errors['last_name'] = 'This field is required'
      }
      if (!this.user.email) {
        this.errors['email'] = 'This field is required'
      }
      if (Object.keys(this.errors).length) {
        e.preventDefault()
      }

      let path = process.env.API_PATH + '/users'
      let method = 'post'
      if (this.user.id) {
        path += `/${this.user.id}`
        method = 'put'
      }
      axios[method](path, this.user)
        .then(result => {
          if (result.data.statusCode === 201 || result.data.statusCode === 200) {
            this.$router.push('/')
            this.$toast.open({
              message: result.data.data.message,
              type: 'success'
            })
          }
        }).catch(error => {
          this.errors = error.response.data.data.errors
        })
    },
    onValidate: function (value, key) {
      if (value) {
        this.errors[key] = ''
      }
    }
  }
}
</script>
