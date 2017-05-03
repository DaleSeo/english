<template>
  <div class="container">
    <div class="form-group">
      <label class="form-control-label">Title</label>
      <b-form-input type="text"
        v-model="post.title"
        :state="post.title.length?'success':'warning'"
      />
    </div>
    <div class="form-group">
      <label class="form-control-label">Content</label>
      <b-form-input textarea
        v-model="post.memo"
        :rows="10"
      />
    </div>
    <div class="text-right">
      <b-button size="md" variant="primary" @click="save">
        <i class="fa fa-save"/> Save
      </b-button>
      <b-button size="md" variant="secondary" @click="cancel">
        <i class="fa fa-undo"/> Cancel
      </b-button>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  props: ["id"],
  data () {
    return {
      loading: false,
      post: {
        title: '',
        memo: ''
      }
    }
  },
  methods: {
    save () {
      if (this.id) {
        this.$http.put(`/posts/${this.id}`, this.post)
          .then(_ => {
            toastr.success('Modified.')
            this.$emit('view', this.id)
          })
          .catch(err => toastr.error(err))
      } else {
        this.$http.post(`/posts`, this.post)
          .then(res => {
            toastr.success('Created.')
            this.$emit('view', res.id)
          })
          .catch(err => toastr.error(err))
      }
    },
    cancel () {
      if (this.id) {
        this.$emit('view', this.id)
      } else {
        this.$emit('list')
      }
    },
    fetch () {
      console.log('EngEdit.vue#fetch()')
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
    if (this.id) {
      this.fetch()
    }
  }
}
</script>
