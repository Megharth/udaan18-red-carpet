<template>
  <div>
    <b-row>
      <b-col cols="6" lg="3" v-for="nominee in nominees">
        <b-card :img-src="nominee.imgUrl"
                img-alt="nominee_image"
                img-top
                :class="{'mx-auto': true, 'highlight' : selected.name === nominee.name, 'fadeOut' : selected !== nominee.name}"
                @click="selectNominee(nominee.name, nominee._id)">
          <span align="center">{{nominee.name}}</span>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    props: ['nominees'],
    computed: mapState({
      index: state => state.index,
      selected: function (state) {
        return state.votes[state.index].nominees;
      }
    }),
    methods: {
      selectNominee(name, id) {
        this.$store.commit('addFinalist', {
          name,
          id
        });
      }
    }
  }
</script>
<style scoped>
  @import '../css/participantList.css';
</style>
