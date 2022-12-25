<script setup lang="ts">
interface Props {
  grid: string
  columns: { label: string }[]
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <AppTable :grid="grid">
    <AppContainer>
      <AppTableTh>
        <AppTableTd
          v-for="{ label } of columns"
          :key="label"
        >
          {{ label }}
        </AppTableTd>
      </AppTableTh>
    </AppContainer>

    <slot />
  </AppTable>
</template>
