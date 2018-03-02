<template>
  <div>
    <b-container class="mx-auto">
      <b-row>
        <b-col>
          <h1>{{category.title}}</h1>
        </b-col>
      </b-row>
      <participant-list :nominees="category.nominees"></participant-list>
      <b-row class="navigators">
        <b-col cols="12">
          <b-button v-if="index > 0" size="lg" variant="primary" class="prev" @click="prev">prev</b-button>
          <b-button v-if="index < categories.length-1" size="lg" variant="primary" class="next" @click="next">next</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-button v-if="index === categories.length-1" size="lg" variant="primary" class="mx-auto submit" @click="submit">Submit</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import participantList from './participantList.vue';
  import {mapState} from 'vuex';

  export default {
    components: {
      'participant-list' : participantList
    },
    computed : mapState({
      index: state => state.index,
      categories: state => state.categories,
      category: state => state.categories[state.index],
    }),
    methods: {
      next() {
          this.$store.commit('incrementIndex');
      },
      prev() {
        this.$store.commit('decrementIndex');
      },
      submit() {
        this.$http.post("http://demo6673162.mockable.io/login",{
          votes: this.$store.state.votes,
        }, {
          headers: {
            token: this.$store.state.user.token
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '../css/dashboard.css';
</style>
