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
          <participant-list class="participant-row" :nominees="category.nominees"
                            :imgObject="imgObject"></participant-list>
        </b-container>
      </transition>
      <div class="navigators">
        <button v-if="index > 0" size="lg" class="prev retro-btn" @click="prev">prev</button>
        <button v-if="index < categories.length-1" size="lg"
                :class="{'next': true, 'retro-btn': true, 'disabled': !votes[index].nominees.name}" @click="next"
                :disabled="!votes[index].nominees.name">next
        </button>
        <button v-if="index === categories.length-1"
                :class="{'submit': true, 'retro-btn': true, 'disabled': !votes[index].nominees.name}" @click="submit"
                :disabled="!votes[index].nominees.name">Submit
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import participantList from './participantList.vue';
  import {mapState} from 'vuex';

  function addEventListener(el, done) {
    el.addEventListener('animationend', function () {
      el.style = "";
      done();
    })
  }

  export default {
    components: {
      'participant-list': participantList
    },
    computed: mapState({
      index: state => state.index,
      categories: state => state.categories,
      category: state => state.categories[state.index],
      votes: state => state.votes
    }),
    data() {
      return {
        imgObject: {}
      }
    },
    methods: {
      enter(el, done) {
        el.childNodes[0].childNodes[0].childNodes[0].classList.add("rollIn");
        el.childNodes[2].childNodes[0].childNodes[0].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[1].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[2].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[3].classList.add("slideIn");
        addEventListener(el, done);
      },
      leave(el, done) {
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
        const data = this.votes.map((vote) => {
          return {
            categoryId: vote._id,
            nomineeId: vote.nominees._id
          }
        });
        this.$http.post("https://udaan18-red-carpet.herokuapp.com/votes", data, {
          headers: {
            Authorization: this.$store.state.user.token
          }
        }).then(function () {
          this.$router.push("/feedback");
        })
      }
    },
    created() {

      function responseToBuffer(response) {
        return new Promise((resolve, reject) => {
          response.arrayBuffer()
            .then((buffer) => resolve({url: response.url, buffer}))
            .catch((error) => reject(error));
        })
      }

      function arrayBufferToBase64(buffer) {
        let base64Flag = 'data:image/jpeg;base64,';
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag + window.btoa(binary);
      }

      const imageUrls = this.categories.reduce((imgList, category) => {
        return imgList.concat(category.nominees.map(nominee => nominee.imgUrl));
      }, []);

      function imageArrayToObject(imgArray) {
        return imgArray.reduce((acc, img) => {
          acc[img.url] = img.image;
          return acc;
        }, {})
      }

      Promise.all(imageUrls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(responseToBuffer)))
        .then(bufferUrls => bufferUrls.map(bufferUrl => ({url: bufferUrl.url, image: arrayBufferToBase64(bufferUrl.buffer)})))
        .then(imageArrayToObject)
        .then(imgObject => {
          this.imgObject = imgObject;
          document.getElementById("list").classList.remove("hide");
          document.getElementById("loader").classList.add("hide");
        }).catch((error) => {
          document.getElementById("list").classList.remove("hide");
          document.getElementById("loader").classList.add("hide");
      });
    }
  }

</script>

<style scoped>
  @import '../css/retro.css';
  @import '../css/dashboard.css';
</style>
