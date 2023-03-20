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
      searchTerm: ""
    }
  }, 
  methods: {
    updateSearchTerm(event) {
      this.searchTerm = event.target.value;
    }
  }
}
</script>

<template>
  <SearchBar v-on:inputChange="updateSearchTerm"></SearchBar>
  <ArticlesSection :articles="articles"></ArticlesSection>
</template>