<template>
  <div class="container">
    <b-table hover
      :items="items"
      :fields="fields"
      :filter="filter">
    </b-table>

    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="tatalRows" :per-page="perPage" v-model="currentPage" />
    </div>

    <pre>
      {{items}}
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      tatalRows: 10,
      currentPage: 1,
      perPage: 10,
      filter: null,
      fields: {
        _id: {
          label: 'ID',
          sortable: true
        },
        title: {
          label: 'Title',
          sortable: true
        },
        date: {
          label: 'Date'
        }
      }
    }
  },
  methods: {
    details (item) {
      alert(JSON.stringify(item));
    },
    findPosts () {
      console.log('EngTable#findPosts()')
      this.$http.get(`/posts?page=${this.currentPage}`)
        .then(res => {
          this.tatalRows = res.data.total
          this.items = res.data.items
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
