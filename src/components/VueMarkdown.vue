<template>
  <!-- Render markdown to safe HTML (HTML disabled). Parent classes/attrs are forwarded. -->
  <div v-bind="$attrs" v-html="html || '(空)'" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{ content?: string }>()

// Disable raw HTML to avoid injection; enable linkify and typographer for nicer output
const md = new MarkdownIt({ html: false, linkify: true, typographer: true })

const html = computed(() => {
  const txt = props.content || ''
  return txt ? md.render(txt) : ''
})
</script>

<style scoped>
.prose pre {
  white-space: pre-wrap;
}
</style>
