<template>
  <div class="container">

    <h3><strong>English List</strong></h3>
    <hr/>

    <div class="text-center" v-show="loading">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"/>
    </div>

    <div v-show="!loading">
      <div class="row mb-2">
        <div class="col-md-3 offset-md-8">
          <b-input-group>
            <b-form-input type="search" v-model="query"/>
            <b-input-group-button slot="right">
              <b-button variant="secondary" @click="search">
                <i class="fa fa-search"/>
              </b-button>
            </b-input-group-button>
          </b-input-group>
        </div>
        <div class="col-md-1">
          <b-button class="float-right" variant="primary" @click="edit">
            <i class="fa fa-pencil-square-o"/> Write
          </b-button>
        </div>
      </div>

      <b-table hover
        :items="items"
        :fields="fields"
        :filter="filter"
        @row-clicked="view"
      />

      <div class="justify-content-center row my-1">
        <b-pagination size="md" :total-rows="tatalRows" :per-page="perPage" v-model="currentPage"/>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  data () {
    return {
      loading: false,
      query: '',
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
    search () {
      this.findPosts()
    },
    findPosts () {
      console.log('EngTable#findPosts()')
      this.items = []
      this.loading = true
      this.$http.get(`/posts?page=${this.currentPage}&query=${this.query}`)
        .then(res => {
          this.tatalRows = res.data.total
          this.items = res.data.items
        })
        .catch(err => {
          console.error(err)
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
