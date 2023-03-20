<script>
export default {
  props: ['articles'],
}
</script>

<template>
  <div class="articles-section">
    <div class="grid two-column">
      <div class="article" v-if="articles.length === 0">
        <h2><u>No Articles Found.</u></h2>
      </div>
      <div class="article" v-else v-for="article in articles">
        <h2><u>{{ article.title }}</u></h2>
        <p>{{ article.summary }}</p>
        <a href="">View full article</a>
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
}

.two-column {
  grid-template-columns: auto auto;
}

</style>