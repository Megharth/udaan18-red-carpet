<template>
  <div>
    <b-container>
      <div class="login">
        <b-input-group class="spacer" @keyup="storeName">
          <b-form-input ref="nameInput" placeholder="username"></b-form-input>
        </b-input-group>
        <b-input-group class="spacer" @keyup="storePass">
          <b-form-input ref="passInput" type="password" placeholder="password"></b-form-input>
        </b-input-group>
        <b-button class="spacer retro-btn" @click="login">Login</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

export default{
  methods: {
    storeName() {
      this.$store.commit('storeName', this.$refs.nameInput.localValue);
    },
    storePass() {
      this.$store.commit('storePass', this.$refs.passInput.localValue);
    },
    login(){
      this.$http.post("http://demo6673162.mockable.io/login", {
        name: this.name,
        password: this.password
      }).then(function(response){
        console.log(response.body.token);
        if(response.status === 200){
          this.$store.commit('storeToken', response.body.token);
          this.$router.push('/dashboard');
        }
      });
    }
  },
  computed: mapState({
    name: state => state.user.name,
    password: state => state.user.password
  })
}
</script>
<style>
  @import '../css/login.css';
</style>
