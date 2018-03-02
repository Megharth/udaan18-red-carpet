<template>
  <div>
    <b-row>
      <b-col cols="6" lg="3" v-for="nominee in nominees">
        <b-card :img-src="nominee.imgUrl"
                img-alt="nominee_image"
                img-top
                style="max-width: 450px"
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
  .highlight{
    box-shadow: 0 0 5px 5px #aaa;
  }
  .col-6{
    margin: 10px 0;
    padding-left: 5px;
    padding-right: 5px;
  }
  .fadeOut{
    opacity: 0.5
  }
</style>
