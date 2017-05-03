<template>
  <div class="container">

    <div>
      <b-table hover
        :items="items"
        :fields="fields"
        :filter="filter"
        @row-clicked="detail"
      />

      <div class="justify-content-center row my-1">
        <icon name="spinner" scale="3" spin v-show="loading"/>
        <b-pagination size="md" :total-rows="tatalRows" :per-page="perPage" v-model="currentPage" v-show="!loading"/>
      </div>
    </div>

    <!-- <pre>
      {{items}}
    </pre> -->
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  data () {
    return {
      loading: false,
      items: [],
      tatalRows: 10,
      currentPage: 1,
      perPage: 10,
      filter: null,
      fields: {
        _id: {
          label: 'ID'
        },
        title: {
          label: 'Title',
          sortable: true
        },
        date: {
          label: 'Date',
          sortable: true
        }
      }
    }
  },
  methods: {
    detail (item, index) {
      this.$emit('detail', item._id)
    },
    findPosts () {
      console.log('EngTable#findPosts()')
      this.items = []
      this.loading = true
      this.$http.get(`/posts?page=${this.currentPage}`)
        .then(res => {
          this.tatalRows = res.data.total
          this.items = res.data.items
        })
        .catch(err => {
          toastr.error(err)
        })
        .then(_ => {
          this.loading = false
        })
    }
  },
  watch: {
    currentPage (newPage) {
      this.findPosts()
    }
  },
  created () {
    this.findPosts()
  }
}
</script>
