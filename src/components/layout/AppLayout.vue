<template>
  <RouterView v-slot="{ Component: component, route }">
    <KeepAlive :include="[]">
      <SuspenseWrapper
        v-if="component"
        :key="route.fullPath"
      >
        <Component :is="component" />
      </SuspenseWrapper>
    </KeepAlive>
  </RouterView>
</template>
