<template>
  <div>
    {{id}}
    <EngList v-if="mode === 'L'"
      @view="view" @edit="edit"
    />
    <EngView
      v-if="mode === 'D'" :id="id"
      @list="list" @edit="edit"
    />
    <EngEdit
      v-if="mode === 'E'" :id="id"
      @list="list" @view="view"
    />
  </div>
</template>

<script>
import EngList from './EngList.vue'
import EngView from './EngView.vue'
import EngEdit from './EngEdit.vue'

import toastr from 'toastr'

export default {
  components: {EngList, EngView, EngEdit},
  data () {
    return {
      mode: 'L',
      id: null
    }
  },
  methods: {
    list() {
      console.log('Index.vue#list()')
      this.mode = 'L'
    },
    view (id) {
      console.log('Index.vue#view()', id)
      this.id = id
      this.mode = 'D'
    },
    edit (id) {
      console.log('Index.vue#edit()')
      this.id = id
      this.mode = 'E'
    }
  }
}
</script>

<style>
</style>
