<script>
import Sidebar from './shared/components/sidebar.component.vue'

export default {
  name: 'App',
  components: { Sidebar }
}
</script>

<template>
  <div class="flex">
    <Sidebar class="w-64 flex-shrink-0" />
    <main class="flex-1 w-full" >
    <router-view />
    </main>
  </div>
</template>

<style>

</style>