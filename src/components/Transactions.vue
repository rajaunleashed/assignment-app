<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-left">Transactions</h1>
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.id }}</td>
              <td>{{  transaction.location.user.first_name }} {{ transaction.location.user.last_name }}</td>
              <td>{{  transaction.location.name }}</td>
              <td>{{  transaction.amount }}</td>
              <td>{{  transaction.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Transactions',
  components: {
  },
  data () {
    return {
      transactions: []
    }
  },
  mounted () {
    axios.get(process.env.API_PATH + '/transactions')
      .then(result => {
        if (result.data.data.transactions) {
          this.transactions = result.data.data.transactions.data
        }
      })
  },
  methods: {

  }
}
</script>
