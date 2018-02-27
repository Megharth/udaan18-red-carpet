<template>
  <div>
    <b-container class="mx-auto container">
      <b-row>
        <b-col>
          <h1>{{category.title}}</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="3" v-for="participant in category.participants">
          <b-card :img-src="participant.imgUrl"
                  img-alt="participant_image"
                  img-top
                  style="max-width: 450px"
                  class="mx-auto">
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
        <b-button v-if="submitbtn" size="lg" variant="primary" class="mx-auto submit">Submit</b-button>
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
        submitbtn: false
      }
    },
    methods: {
      next() {
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

      }
    }
  }
</script>

<style scoped>
  @import '../css/dashboard.css';
</style>
