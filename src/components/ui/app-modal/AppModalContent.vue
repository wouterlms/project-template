<template>
  <div class="max-h-[60vh] md:max-h-[80vh] overflow-y-auto">
    <div class="w-full">
      <slot />
    </div>

    <div class="bg-primary bottom-0 flex flex-col gap-y-2 mt-8 sticky w-full">
      <slot name="actions" />
    </div>
  </div>
</template>
