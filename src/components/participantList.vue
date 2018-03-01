<template>
  <div>
    <b-row>
      <b-col cols="6" lg="3" v-for="(nominee, index) in nominees">
        <b-card :img-src="nominee.imgUrl"
                img-alt="nominee_image"
                img-top
                style="max-width: 450px"
                class="mx-auto"
                :id="index"
                ref="card"
                :class="{'highlight' : selected === nominee.name}"
                @click="selectNominee(nominee.name, gender, index)">
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
    props: ['nominees', 'gender'],
    computed: mapState({
      selected: function(state){
        const nominees = state.votes[state.index].nominees;
        if (typeof nominees === "object" && nominees !== null)
          return nominees[this.gender];
        else
          return nominees;
      }
    }),
    methods: {
      selectNominee(name, gender, index) {
        if(gender === "male"){
          this.$store.commit('addFinalist', {
            name,
            gender
          });
        }
        else if (gender === "female"){
          this.$store.commit('addFinalist', {
            name,
            gender
          });
        }
        else{
          this.$store.commit('addFinalist', {
            name
          })
        }
      }
    }
  }
</script>
<style scoped>
  .highlight{
    box-shadow: 0 0 5px 5px #aaa;
  }
  .col-6{
    margin: 10px 0px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .fadeOut{
    opacity: 0.5
  }
</style>
