<script setup lang="ts">
import { AppTableTr as AppTableTrComponent } from '@wouterlms/ui'
</script>

<template>
  <div class="even:bg-gray-primary">
    <AppContainer>
      <AppTableTrComponent>
        <slot />
      </AppTableTrComponent>
    </AppContainer>
  </div>
</template>
