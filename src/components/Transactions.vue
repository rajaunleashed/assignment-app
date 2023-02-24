<template>
  <div class="container">
    <form @submit="filterTransactions">
      <div class="row">
        <div class="col-3">
          <label for="fromDate">From Date</label>
          <select class="form-control" v-model="queryParams.locationId">
            <option value="">Select Location</option>
            <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
          </select>
        </div>
        <div class="col-3">
          <label for="fromDate">From Date</label>
          <b-form-datepicker id="from-datepicker" v-model="queryParams.fromDate" class="mb-2"></b-form-datepicker>
        </div>
        <div class="col-3">
          <label for="fromDate">To Date</label>
          <b-form-datepicker id="to-datepicker" v-model="queryParams.toDate" class="mb-2"></b-form-datepicker>
        </div>
        <div class="col-3">
          <button type="submit" class="btn btn-secondary" style="margin-top:22px">Filter</button>
        </div>
      </div>
    </form>
    <div class="row mt-30">
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
              <td>{{ transaction.location.user.first_name }} {{ transaction.location.user.last_name }}</td>
              <td>{{ transaction.location.name }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.date }}</td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="col-md-6">
            <b-pagination v-model="currentPage" :total-rows="total" :per-page="perPage" aria-controls="my-table"
              @change="fetchTransactions"></b-pagination>
          </div>
          <div class="col-md-6" style="text-align: right">
            <span>{{ currentPage }} of {{ total }} Entries</span>
          </div>
        </div>

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
      queryParams: {
        locationId: null,
        fromDate: null,
        toDate: null
      },
      locations: [],
      transactions: [],
      perPage: 15,
      currentPage: 1,
      total: 0
    }
  },
  mounted () {
    this.fetchTransactions()
    this.fetchLocations()
  },
  methods: {
    fetchLocations: function () {
      axios.get(process.env.API_PATH + '/locations?')
        .then(result => {
          this.locations = result.data.data.locations
        })
    },
    filterTransactions: function () {
      this.fetchTransactions()
    },
    fetchTransactions: function (page = 1) {
      let query = {
        page
      }
      Object.keys(this.queryParams).forEach(key => {
        if (this.queryParams[key]) {
          query[key] = this.queryParams[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      axios.get(process.env.API_PATH + '/transactions?' + queryString)
        .then(result => {
          if (result.data.data.transactions) {
            const { data, per_page: perPage, current_page: currentPage, total } = result.data.data.transactions
            this.transactions = data
            this.perPage = perPage
            this.currentPage = currentPage
            this.total = total
          }
        })
    }
  }
}
</script>
