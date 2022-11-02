<template>
  <RouterView v-slot="{ Component: component }">
    <KeepAlive :include="[]">
      <Component :is="component" />
    </KeepAlive>
  </RouterView>
</template>
