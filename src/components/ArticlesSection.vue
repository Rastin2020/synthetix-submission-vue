<script>
export default {
  props: ['articles', 'articleArrayError'],
}
</script>

<template>
  <div class="articles-section">
    <div class="grid">
      <div class="article" v-if="articles.length === 0">
        <h2><u>{{ articleArrayError }}</u></h2>
      </div>
      <div class="article" v-else v-for="article in articles">
        <h2><u>{{ article.title }}</u></h2>
        <p class="break-word">{{ article.summary }}</p>
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
  grid-template-columns: 50% 50%;
}

@media screen and (max-width: 768px) {
  .grid {
    grid-template-columns: 100%;
  }
}

</style>