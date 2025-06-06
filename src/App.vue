<script setup lang="ts">
import SideNav from './components/SideNav.vue'
</script>

<template>
  <div class="app">
    <SideNav />
    <main class="main-content">
      <h1>AI Weather</h1>
    </main>
  </div>
</template>

<style lang="scss">
:root {
  font-family: 'Poppins', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: #242424;
  background-color: #ffffff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
}

.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
