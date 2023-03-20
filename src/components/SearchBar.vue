<script>
import axios from 'axios';
const applicationKey = '7b829f3aeaf04561471b8e258739da3d';
const consumerKey = '9800bcc32393905388563bb784b84720';

export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    validateSearchTerm() {
      const searchTerm = (this.searchTerm).trim();
      if (searchTerm === '') {
        return false;
      } else {
        return true;
      }
    },
    initiateSearch() {
      const isValidSearch = this.validateSearchTerm();
      if (!isValidSearch) {
        console.log("empty search term");
      } else {
        this.callApi();
      }
    },
    searchArticles(authToken) {
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
        for (let i=0; i<resArray.length; i++) {
          labelsArray.push(resArray[i].label);
        }
        self.getArticles(labelsArray, authToken);
      })
      .catch( function (err) {
        console.log(err)
      });
    },
    async getArticles(labelsArray, authToken) {
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
          console.log(err);
        });
      }
      this.$emit('updateArray', finalArray);
    },
    callApi() {
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
        console.log(err)
      });
    }
  }
}
</script>

<template>
  <div class="searchBoxContainer">
    <div class="flex flex-column center-align">
      <label class="margin-bottom-small large-text white-text" for="searchBox">Search for Articles</label>
      <div class="flex flex-row justify-center">
        <input class="wide-width" name="searchBox" type="text" v-model="searchTerm">
        <button class="svg-holder hover" v-on:click="initiateSearch()">
          <img src="../assets/icons-search.svg">
        </button>
      </div>
    </div>
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