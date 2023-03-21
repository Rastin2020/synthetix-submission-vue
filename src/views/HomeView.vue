<script>
/* Our HomeVue.vue component is our page. It pulls in the other components it needs for the page through 
imports */
import SearchBar from '../components/SearchBar.vue';
import ArticlesSection from '../components/ArticlesSection.vue';

// We're using the Options Api for this project (already familiar with it in Vue2)

export default {
  components: {
    SearchBar,
    ArticlesSection
  },
  data() {
    return {
      articles: [],
      articleArrayError: 'Use the search bar above to search for an article.',
    }
  }, 
  methods: {
    updateArticleArray(array) {
      this.articles = array;
    },
    setArticleError(message) {
      this.articleArrayError = message;
    }
  }
}
</script>

<template>
  <SearchBar v-on:updateArticleArrayError="setArticleError" v-on:updateArray="updateArticleArray"></SearchBar>
  <ArticlesSection :articleArrayError="articleArrayError" :articles="articles"></ArticlesSection>
</template>