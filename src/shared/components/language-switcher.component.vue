<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n()

    const toggle = () => {
      const next = locale.value === 'en' ? 'es' : 'en'
      locale.value = next
      localStorage.setItem('lang', next)
    }

    return { toggle }
  }
}
</script>
<template>
  <button
      @click="toggle"
      class= " text-center align-items-center w-3 h-10 bg-green-700 hover:bg-green-800 rounded-full flex items-center justify-center text-white"
      :aria-label="$t('language.switch')"
  >
    <i class="pi pi-globe text-base text-center" />
  </button>
</template>

<style scoped>

</style>