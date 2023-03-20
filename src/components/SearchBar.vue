<script>
export default {
  props: ['searchTerm'],
  data() {
    return {
      sample: ''
    }
  }
}
</script>

<template>
  <div class="searchBoxContainer">
    <div class="flex flex-column center-align">
      <label class="margin-bottom-small large-text white-text" for="searchBox">Search for Articles</label>
      <div class="flex flex-row justify-center">
        <input class="wide-width" name="searchBox" type="text" v-on:input="(event) => this.$emit('inputChange', event)">
        <button class="svg-holder hover">
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