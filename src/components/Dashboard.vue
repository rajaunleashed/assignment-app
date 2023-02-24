<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-left">Users</h1>
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
            <tr>
              <td>1</td>
              <td>Rameez</td>
              <td>Raja</td>
              <td>rajaunleashed@gmail.com</td>
              <td><button type="button" class="btn btn-primary">View Transactions</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {

    }
  }
}
</script>
