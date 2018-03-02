<template>
  <div>
    <b-container class="mx-auto">
      <b-row>
        <b-col>
          <div class="retro-text">
            <span>{{category.title}}</span>
          </div>
        </b-col>
      </b-row>
      <participant-list :nominees="category.nominees" class="list" :key="index"></participant-list>
      <b-row class="navigators">
        <b-col cols="12">
          <button v-if="index > 0" size="lg" variant="primary" class="prev retro-btn" @click="prev">prev</button>
          <button v-if="index < categories.length-1" size="lg" variant="primary" class="next retro-btn" @click="next">next</button>
        </b-col>
      </b-row>
      <b-row>
        <button v-if="index === categories.length-1" class="mx-auto submit retro-btn" @click="submit">Submit</button>
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
