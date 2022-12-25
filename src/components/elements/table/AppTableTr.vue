<script setup lang="ts">
import { AppTableTr as AppTableTrComponent } from '@wouterlms/ui'
</script>

<template>
  <div class="even:bg-neutral-50">
    <AppContainer>
      <AppTableTrComponent>
        <slot />
      </AppTableTrComponent>
    </AppContainer>
  </div>
</template>
