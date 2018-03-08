<template>
    <div>
      <b-row>
        <b-col cols="6" lg="3" v-for="nominee in nominees">
          <b-card :img-src="nominee.imgUrl"
                  img-alt="nominee_image"
                  img-top
                  :class="{'mx-auto': true, 'highlight' : selected === nominee.name, 'fadeOut' : selected !== nominee.name}"
                  @click="selectNominee(nominee.name)">
            <b-card-body>
              <span align="center">{{nominee.name}}</span>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default{
    props: ['nominees'],
    computed: mapState({
      index: state => state.index,
      selected: function(state){
        const candidates = state.votes[state.index].nominees;
          return candidates;
      }
    }),
    methods: {
      selectNominee(name) {
          this.$store.commit('addFinalist', name);
      }
    }
  }
</script>
<style scoped>
  @import '../css/participantList.css';
</style>
