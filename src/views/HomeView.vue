<script>
import SearchBar from '../components/SearchBar.vue';
import ArticlesSection from '../components/ArticlesSection.vue';

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