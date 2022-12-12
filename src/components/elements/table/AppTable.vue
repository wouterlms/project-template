<script setup lang="ts">
import {
  AppTable as AppTableComponent,
  AppTableTd,
  AppTableTh,
} from '@wouterlms/ui'

interface Props {
  grid: string
  columns: { label: string }[]
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <AppTableComponent :grid="grid">
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
  </AppTableComponent>
</template>
