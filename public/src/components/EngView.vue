<template>
  <div class="container">
    {{post}}

    <div class="text-right mb-2">
        <b-button size="sm" variant="primary" :disabled="disabled" @click="list">
          <i class="fa fa-list"/>
        </b-button>
        <b-button size="sm" variant="warning" :disabled="disabled" @click="edit">
          <i class="fa fa-edit"/>
        </b-button>
        <b-button size="sm" variant="danger" :disabled="disabled" @click="del">
          <i class="fa fa-trash"/>
        </b-button>
    </div>

    <b-card
      v-show="post"
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
      disabled: false,
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
    del () {
      console.log('EngDetail.vue#del()')
      if (window.confirm('Are you sure?')) {
        this.disabled = true
        this.$http.delete(`/posts/${this.id}`)
          .then(_ => toastr.success('Removed'))
          .catch(err => toastr.error(err))
          .then(_ => {
            this.disabled = false
            this.list()
          })
      }
    },
    fetch () {
      console.log('EngDetail.vue#fetch()')
      this.loading = true
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
