<template>
  <div class="container">
    <b-table hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter">
      <template slot="name" scope="item">
        {{item.value.first}} {{item.value.last}}
      </template>
      <template slot="actions" scope="item">
        <b-btn size="sm" @click="details(item.item)">Details</b-btn>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      filter: null,
      fields: {
        name: {
          label: 'Person Full name',
          sortable: true
        },
        age: {
          label: 'Person age',
          sortable: true
        },
        isActive: {
          label: 'is Active'
        },
        actions: {
          label: 'Actions'
        }
      },
      items: [{
        isActive: true,
        age: 40,
        name: {
          first: 'Dickerson',
          last: 'Macdonald'
        }

      }, {
        isActive: false,
        age: 21,
        name: {
          first: 'Larsen',
          last: 'Shaw'
        }

      }, {
        isActive: false,
        age: 9,
        state: 'success',
        name: {
          first: 'Mitzi',
          last: 'Navarro'
        }

      }, {
        isActive: false,
        age: 89,
        name: {
          first: 'Geneva',
          last: 'Wilson'
        }

      }, {
        isActive: true,
        age: 38,
        name: {
          first: 'Jami',
          last: 'Carney'
        }

      }, {
        isActive: false,
        age: 27,
        name: {
          first: 'Essie',
          last: 'Dunlap'
        }

      }, {
        isActive: true,
        age: 40,
        name: {
          first: 'Dickerson',
          last: 'Macdonald'
        }

      }, {
        isActive: false,
        age: 21,
        name: {
          first: 'Larsen',
          last: 'Shaw'
        }

      }, {
        isActive: false,
        age: 26,
        name: {
          first: 'Mitzi',
          last: 'Navarro'
        }

      }, {
        isActive: false,
        age: 22,
        name: {
          first: 'Geneva',
          last: 'Wilson'
        }

      }, {
        isActive: true,
        age: 38,
        name: {
          first: 'Jami',
          last: 'Carney'
        }

      }, {
        isActive: false,
        age: 27,
        name: {
          first: 'Essie',
          last: 'Dunlap'
        }
      }]
    }
  },
  methods: {
    details(item) {
      alert(JSON.stringify(item));
    }
  }
}
</script>
