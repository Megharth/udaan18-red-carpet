<template>
  <div>
    <transition name="fade"
                @enter="enter"
                @leave="leave">
    <b-container class="glist" :key="index">
      <b-row>
        <b-col>
          <div class="retro-text">
            <span>{{category.title}}</span>
          </div>
        </b-col>
      </b-row>
      <participant-list :nominees="category.nominees"></participant-list>
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
    </transition>
  </div>
</template>

<script>
  import participantList from './participantList.vue';
  import {mapState} from 'vuex';

  function addEventListener(el, done) {
    el.addEventListener('animationend', function() {
      el.style="";
      done();
    })
  }
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
      enter(el, done) {
        console.log("enter");
        el.style.animationName = "fade";
        el.style.animationDuration = "1s";
        addEventListener(el, done);
      },
      leave(el, done){
        console.log("done");
        el.style.animationName = "fade";
        el.style.animationDuration = "1s";
        el.style.animationDirection = "reverse";
        addEventListener(el, done);
      },
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
