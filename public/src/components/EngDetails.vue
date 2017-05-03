<template>
  <div class="container">
    <div class="text-right mb-2">
        <b-button size="sm" variant="primary" @click="list">
          <icon name="list"/>
        </b-button>
        <b-button size="sm" variant="warning" @click="edit">
          <icon name="edit"/>
        </b-button>
        <b-button size="sm" variant="danger">
          <icon name="trash"/>
        </b-button>
    </div>

    <div class="justify-content-center row my-1" v-show="loading">
      <icon name="spinner" scale="3" spin/>
    </div>

    <b-card
      v-show="!loading && post"
      :header="post.title"
      show-footer
    >
    <div slot="footer" class="text-muted text-right">
      <small>{{post.date}}</small>
    </div>
      {{post.memo}}
    </b-card>
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  props: ["id"],
  data () {
    return {
      loading: false,
      post: {}
    }
  },
  methods: {
    list () {
      this.$emit('list')
    },
    edit () {
      this.$emit('edit')
    },
    fetch () {
      console.log('EngDetail.vue#fetch()')
      this.loading = true
      console.log('url:', `/posts/${this.id}`)
      this.$http.get(`/posts/${this.id}`)
        .then(res => {
          this.post = res.data
        })
        .catch(err => {
          toastr.error(err)
        })
        .then(_ => {
          this.loading = false
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
