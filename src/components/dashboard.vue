<template>
  <div>
    <b-container class="mx-auto container">
      <b-row>
        <b-col>
          <h1>{{category.title}}</h1>
        </b-col>
      </b-row>
      <!--Male Participants-->
      <b-row>
        <b-col cols="12" lg="3" v-for="participant in category.participantsMale">
          <b-card :img-src="participant.imgUrl"
                  img-alt="participant_image"
                  img-top
                  style="max-width: 450px"
                  class="mx-auto"
                  @click="selectMaleParticipant(participant.name, category.title)">
            <b-card-body>
              <h3 align="center">{{participant.name}}</h3>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <!--Female Participants-->
      <b-row>
        <b-col cols="12" lg="3" v-for="participant in category.participantsFemale">
          <b-card :img-src="participant.imgUrl"
                  img-alt="participant_image"
                  img-top
                  style="max-width: 450px"
                  class="mx-auto"
                  @click="selectFemaleParticipant(participant.name)">
            <b-card-body>
              <h3 align="center">{{participant.name}}</h3>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="navigators">
        <b-col cols="12">
          <b-button v-if="prevbtn" size="lg" variant="primary" class="prev" @click="prev">prev</b-button>
          <b-button v-if="nextbtn" size="lg" variant="primary" class="next" @click="next">next</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-button v-if="submitbtn" size="lg" variant="primary" class="mx-auto submit" @click="submit">Submit</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import categories from '../data.json'
  export default {
    data() {
      return {
        i: 0,
        category: categories.categories[0],
        nextbtn: true,
        prevbtn: false,
        submitbtn: false,
        categoryName: null,
        maleParticipant: null,
        femaleParticipant: null,
        finalists: []
      }
    },
    methods: {
      next() {
        this.setFinalist();
        this.i++;
        if(this.i > 0)
          this.prevbtn=true;
        this.category = categories.categories[this.i];
        if(this.i === categories.categories.length-1){
          this.submitbtn=true;
          this.nextbtn=false;
        }
      },
      prev() {
        this.setFinalist();
        if(this.i != 0){
          this.i--;
          this.category = categories.categories[this.i];
        }
        if(this.i == 0)
          this.prevbtn=false;
        if(this.i < categories.categories.length-1){
          this.submitbtn=false;
          this.nextbtn=true;
        }
      },
      submit() {
        this.setFinalist();
      },
      selectMaleParticipant(participantName, category) {
        this.maleParticipant = participantName;
        this.categoryName = category;
        console.log(this.maleParticipant)
      },
      selectFemaleParticipant(participantName) {
        this.femaleParticipant = participantName;
        console.log(this.femaleParticipant);
      },
      setFinalist() {
        if(this.femaleParticipant!=null && this.maleParticipant!=null){
          if(this.$store.state.finalists[this.i] != null){
            this.$store.commit('changeFinalist', {
              i: this.i,
              category: this.categoryName,
              maleFinalist: this.maleParticipant,
              femaleFinalist: this.femaleParticipant
            });
          }
          else{
            this.$store.commit('addFinalist', {
              category: this.categoryName,
              maleFinalist: this.maleParticipant,
              femaleFinalist: this.femaleParticipant
            })
          }
        }
        this.femaleParticipant = null;
        this.maleParticipant = null;
        this.categoryName = null;
        console.log(this.$store.state.finalists);
      }
    },
    created() {
      if(categories.categories.length-1 === 0){
        this.nextbtn = false;
        this.submitbtn = true;
      }
    }
  }
</script>

<style scoped>
  @import '../css/dashboard.css';
</style>
