<template>
  <div class="container">
    <h3>
      <strong v-if="id">Modify English</strong>
      <strong v-else>Create English</strong>
    </h3>
    <hr/>

    <div class="text-center"  v-show="loading">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"/>
    </div>

    <div v-show="!loading && post">
      <b-form-fieldset
        label="Title"
        :state="post.title.length?'success':'warning'"
      >
        <b-form-input type="text"
          v-model="post.title"
          :state="post.title.length?'success':'warning'"
        />
      </b-form-fieldset>
      <b-form-fieldset
        label="Content"
      >
        <b-form-input textarea
          v-model="post.memo"
          :rows="10"
        />
      </b-form-fieldset>
      <div class="text-right">
        <b-button size="md" variant="primary" :disabled="disabled" @click="save">
          <i class="fa fa-save"/> Save
        </b-button>
        <b-button size="md" variant="secondary" :disabled="disabled" @click="cancel">
          <i class="fa fa-undo"/> Cancel
        </b-button>
      </div>
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
      disabled: false,
      post: {
        title: '',
        memo: ''
      }
    }
  },
  methods: {
    save () {
      this.disabled = true
      if (this.id) {
        this.$http.put(`/posts/${this.id}`, this.post)
          .then(_ => {
            toastr.success('Modified.')
            this.$emit('view', this.id)
          })
          .catch(err => toastr.error(err))
          .then(_ => this.disabled = false)
      } else {
        this.$http.post(`/posts`, this.post)
          .then(res => {
            toastr.success('Created.')
            this.$emit('view', res.data.id)
          })
          .catch(err => toastr.error(err))
          .then(_ => this.disabled = false)
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
