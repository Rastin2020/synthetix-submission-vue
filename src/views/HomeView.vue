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
    }
  }, 
  methods: {
    updateArticleArray(array) {
      this.articles = array;
    }
  }
}
</script>

<template>
  <SearchBar v-on:updateArray="updateArticleArray"></SearchBar>
  <ArticlesSection :articles="articles"></ArticlesSection>
</template>