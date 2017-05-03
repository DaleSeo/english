<template>
  <div class="container">

    <h3><strong>English List</strong></h3>
    <hr/>

    <div class="text-right mb-2">
        <b-button variant="primary" @click="edit">
          <i class="fa fa-pencil-square-o"/> Write
        </b-button>
    </div>

    <div>
      <b-table hover
        :items="items"
        :fields="fields"
        :filter="filter"
        @row-clicked="view"
      />

      <div class="justify-content-center row my-1">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-show="loading"/>
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
        createdDate: {
          label: 'Date',
          sortable: true
        }
      }
    }
  },
  methods: {
    view (item, index) {
      this.$emit('view', item._id)
    },
    edit () {
      this.$emit('edit')
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
