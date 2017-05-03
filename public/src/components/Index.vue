<template>
  <div>
    <EngTable
      v-if="mode === 'L'"
      @detail="detail"
    />
    <EngDetails
      v-if="mode === 'D'"
      :id="id"
      @list="list"
      @edit="edit"
    />
  </div>
</template>

<script>
import EngTable from './EngTable.vue'
import EngDetails from './EngDetails.vue'

export default {
  components: {EngTable, EngDetails},
  data () {
    return {
      mode: 'D',
      id: '5907309a652be80cc8b64fb6'
    }
  },
  methods: {
    list() {
      console.log('Index.vue#list()')
      this.mode = 'L'
    },
    detail (id) {
      console.log('Index.vue#detail()', id)
      this.mode = 'D'
      this.id = id
    },
    edit () {
      console.log('Index.vue#edit()')
      this.mode = 'E'
    }
  }
}
</script>

<style>
</style>
