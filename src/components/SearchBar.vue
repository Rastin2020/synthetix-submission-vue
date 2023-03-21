<script>
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';
import Loader from './Loader.vue';

// [HIDE these when app is complete]:
const applicationKey = '7b829f3aeaf04561471b8e258739da3d';
const consumerKey = '9800bcc32393905388563bb784b84720';

export default {
  components: {
    ErrorMessage,
    Loader,
  },
  data() {
    return {
      searchTerm: '',
      errorMessage: "",
      showError: false,
      loader: false,
    }
  },
  methods: {
    configErrorMessage(on, message) {
      // This function controls the logic for configuring and toggling the loader on/off
      if (on) {
        this.showError = true;
      } else {
        this.showError = false;
      }
      this.errorMessage = message;
    },
    validateSearchTerm() {
      // This function simply validates the search term the user types in
      const searchTerm = (this.searchTerm).trim();
      if (searchTerm === '') {
        return false;
      } else {
        return true;
      }
    },
    initiateSearch() {
      /* This function checks the search term validation and if passed, starts the series of api calls
      needed to get the articles */
      window.scroll(0,0);
      this.loader = true;
      this.configErrorMessage(false, '');
      const isValidSearch = this.validateSearchTerm();
      if (!isValidSearch) {
        this.loader = false;
        this.configErrorMessage(true, 'Please enter a search term.');
      } else {
        this.callApi();
      }
    },
    searchArticles(authToken) {
      /* This function uses the search term to build out the array of article labels needed for our next
      call in getArticles() */
      const self = this;
      axios.post('https://apisandbox.synthetix.com/2.0/external/search', 
        { userid: '123456', query: this.searchTerm, channel: '14' },
        { headers: { 
            'APPLICATIONKEY': applicationKey, 
            'CONSUMERKEY': consumerKey, 
            'Authorization': ' Bearer ' + authToken,
          }
        }
      ).then( function (res) {
        const resArray = res.data.results;
        const labelsArray = [];
        if (resArray !== undefined) {
          for (let i=0; i<resArray.length; i++) {
            labelsArray.push(resArray[i].label);
          }
        }
        self.getArticles(labelsArray, authToken);
      })
      .catch( function (err) {
        self.loader = true;
        self.configErrorMessage(true, 'Internal error. Please try again in a few seconds.');
        console.log(err)
      });
    },
    async getArticles(labelsArray, authToken) {
      // This function retrieves the articles from the api using the supplied labelsArray and authToken, 
      // and emits this array to the parent component where it's shared to the ArticleSection.vue component
      // (passed as a prop)
      if (labelsArray.length === 0) {
        this.loader = false;
        this.$emit('updateArticleArrayError', 'No articles found.');
        this.$emit('updateArray', []);
      } else {
        const finalArray = [];
        for (let i=0; i<labelsArray.length; i++) {
          await axios.post('https://apisandbox.synthetix.com/2.0/external/article', 
            { userid: '123456', label: labelsArray[i], channel: '14' },
            { headers: { 
                'APPLICATIONKEY': applicationKey, 
                'CONSUMERKEY': consumerKey, 
                'Authorization': ' Bearer ' + authToken,
              }
            }
          ).then( function (res) {
            const title = res.data.question;
            const summary = res.data.answer;
            finalArray.push({ title, summary });
          })
          .catch( function (err) {
            self.configErrorMessage(true, 'Internal error. Please try again in a few seconds.');
            console.log(err);
          });
        }
        this.$emit('updateArray', finalArray);
        this.loader = false;
      }
    },
    callApi() {
      /* This function calls the api to retireve the Auth Token and initiates the other calls via 
      searchArticles() */
      const self = this;
      axios.post('https://apisandbox.synthetix.com/2.0/external/session', 
        { firstname: "Rastin" },
        { headers: { 
            'APPLICATIONKEY': applicationKey, 
            'CONSUMERKEY': consumerKey, 
          }
        }
      ).then( function (res) {
        const authToken = res.data.token;
        self.searchArticles(authToken);
      })
      .catch( function (err) {
        self.loader = false;
        self.configErrorMessage(true, 'Internal error. Please try again in a few seconds.');
        console.log(err)
      });
    }
  }
}
</script>

<template>

  <!-- Search bar and button markup: -->
  <div class="searchBoxContainer">
    <div class="flex flex-column center-align">
      <label class="margin-bottom-small large-text white-text" for="searchBox">Search for Articles</label>
      <div class="flex flex-row justify-center">
        <input class="wide-width" name="searchBox" type="text" v-model="searchTerm" v-on:keyup.enter="initiateSearch()">
        <button class="svg-holder hover" v-on:click="initiateSearch()">
          <img src="../assets/icons-search.svg">
        </button>
      </div>
    </div>
  </div>

  <div>
    <!-- This is the error message container which is toggled on/off: -->
    <ErrorMessage :showError="showError" :errorMessage="errorMessage"></ErrorMessage>
    <!-- This is the loader which is toggled on/off: -->
    <Loader :loader="loader"></Loader>
  </div>
</template>

<style scoped>

.hover:hover {
  cursor: pointer;
}

.white-text {
  color: white;
}

.large-text {
  font-size: 30px;
}

@media screen and (max-width: 375px) {
  .large-text {
    font-size: 2em;
  }
}

.margin-bottom-small {
  margin-bottom: 10px;
}

.margin-auto {
  margin: auto
}

.center-align {
  text-align: center;
}

.flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.wide-width {
  width: 70%;
}

.searchBoxContainer {
  text-align: center;
  padding: 50px 0;
  width: 100%;
  background-color: rgb(0 100 185);
}

</style>