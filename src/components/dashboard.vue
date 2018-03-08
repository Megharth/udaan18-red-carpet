<template>
  <div>
    <div class="loading-container" id="loader">
      <div class="loading"></div>
      <div id="loading-text">Loading</div>
    </div>
    <div id="list" class="hide">
      <transition name="slide"
                  @enter="enter"
                  @leave="leave">
        <b-container class="list" :key="index">
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
              <button v-if="index > 0" size="lg" class="prev retro-btn" @click="prev">prev</button>
              <button v-if="index < categories.length-1" size="lg" class="next retro-btn" @click="next">next</button>
              <button v-if="index === categories.length-1" class="submit retro-btn" @click="submit">Submit</button>
            </b-col>
          </b-row>
        </b-container>
      </transition>
    </div>
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
      votes: state => state.votes
    }),
    methods: {
      enter(el, done) {
        el.childNodes[0].childNodes[0].childNodes[0].classList.add("rollIn");
        el.childNodes[2].childNodes[0].childNodes[0].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[1].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[2].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[3].classList.add("slideIn");
        addEventListener(el, done);
      },
      leave(el, done){
        el.childNodes[0].childNodes[0].childNodes[0].classList.add("rollOut");
        el.childNodes[2].childNodes[0].childNodes[0].classList.add("slideOut");
        el.childNodes[2].childNodes[0].childNodes[1].classList.add("slideOut");
        el.childNodes[2].childNodes[0].childNodes[2].classList.add("slideOut");
        el.childNodes[2].childNodes[0].childNodes[3].classList.add("slideOut");
        addEventListener(el, done);
      },
      next() {
          this.$store.commit('incrementIndex');
      },
      prev() {
        this.$store.commit('decrementIndex');
      },
      submit() {
        this.$http.post("http://demo6673162.mockable.io/login", this.votes, {
          headers: {
            token: this.$store.state.user.token
          }
        })
      }
    },
    created() {
      window.onload = function() {
        document.getElementById("list").classList.remove("hide");
        document.getElementById("loader").classList.add("hide");
      }
    }
  }

</script>

<style scoped>
  @import '../css/dashboard.css';
  @import '../css/retro.css';
</style>
