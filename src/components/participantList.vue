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
                @click="selectNominee(nominee.name, gender, index)">
          <b-card-body>
            <h3 align="center">{{nominee.name}}</h3>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default{
    props: ['nominees', 'gender'],
    methods: {
      selectNominee(name, gender,index) {
        console.log(this.$refs.card[index].style);
        this.$refs.card[index].style = {
          borderBottomColor: "#333333"

        };
        if(gender === "male"){
          this.$store.commit('addFinalist', {
            name: name,
            gender: gender
          });
        }
        else if (gender === "female"){
          this.$store.commit('addFinalist', {
            name: name,
            gender: gender
          });
        }
        else{
          this.$store.commit('addFinalist', {
            name: name
          })
        }
      }
    }
  }
</script>
