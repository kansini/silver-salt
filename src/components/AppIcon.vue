<script setup lang="ts">
defineProps<{ name: string }>()
const paths: Record<string, string> = {
 sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
 moon: 'M20.5 13.2A8.6 8.6 0 0 1 10.8 3.5 8.6 8.6 0 1 0 20.5 13.2Z',
 arrow: 'M5 19 19 5M5 5h14v14', down: 'M12 4v16m-6-6 6 6 6-6', up: 'M12 20V4m-6 6 6-6 6 6', play: 'm9 5 10 7-10 7Z', close: 'm6 6 12 12M6 18 18 6', menu: 'M4 7h16M4 12h16M4 17h16',
 apple: 'M17.3 12.8c0-2 1.7-3 1.8-3.1-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-2.9-.8C7.1 8 5 10 5 13c0 1.8.6 3.7 1.5 5 .7 1 1.5 2 2.6 2s1.5-.6 2.9-.6 1.7.6 2.9.6 1.9-1 2.6-2c.8-1.2 1.2-2.3 1.2-2.4-.1 0-1.4-.6-1.4-2.8ZM14.7 6.5c.6-.8 1.1-1.8 1-2.8-1 .1-2.1.7-2.8 1.5-.6.6-1.2 1.7-1 2.7 1 .1 2.1-.5 2.8-1.4Z',
}
</script>
<template><svg viewBox="0 0 24 24" aria-hidden="true" :fill="name === 'apple' ? 'currentColor' : 'none'" :stroke="name === 'apple' ? 'none' : 'currentColor'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path :d="paths[name]" /></svg></template>
