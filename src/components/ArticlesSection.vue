<script>
export default {
  props: ['articles'],
}
</script>

<template>
  <div class="articles-section">
    <div class="grid two-column">
      <div class="article">
        <h2><u>title</u></h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum nam aspernatur eum, id nihil veniam quae minima nesciunt tenetur dolorum ut voluptates optio voluptatem ratione aliquam recusandae veritatis soluta necessitatibus.</p>
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