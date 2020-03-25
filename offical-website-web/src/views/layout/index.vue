<template>
  <div class="layout">
    <div class="container">
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
