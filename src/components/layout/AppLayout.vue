<template>
  <RouterView v-slot="{ Component: component, route }">
    <SuspenseWrapper
      v-if="component"
      :key="route.fullPath"
    >
      <Component :is="component" />
    </SuspenseWrapper>
  </RouterView>
</template>
