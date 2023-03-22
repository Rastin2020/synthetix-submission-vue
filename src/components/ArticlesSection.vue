<script>
// This component renders the supplied array (via a prop) into the list of articles

export default {
  props: ['articles', 'articleArrayError'],
}
</script>

<template>
  <div class="articles-section">
    <div class="grid">

      <!-- If we don't have any articles, we render this div with the appropriate user message: -->
      <div class="article" v-if="articles.length === 0">
        <h2><u>{{ articleArrayError }}</u></h2>
      </div>
      
      <!-- Otherwise we render the following markup for the articles: -->
      <div class="article" v-else v-for="article in articles">
        <h2 class="article-title">{{ article.title }}</h2>
        <div class="break-word visible-background" v-html="article.summary"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.articles-section {
  margin: 30px;
}

.article {
  margin: 10px;
}

.grid {
  display: grid;
  grid-template-columns: 50% 50%;
}

.article-title {
  background: rgb(0 100 185);
  color: white;
  padding: 10px;
  margin-bottom: -10px;
}

.visible-background {
  background-color: #ebebeb;
}

@media screen and (max-width: 768px) {
  .grid {
    grid-template-columns: 100%;
  }
}

</style>