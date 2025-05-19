<script setup lang="ts">
import type { ProductsLocationsProps } from './props';
import useLocationsMap from './composables/useLocationsMap';
import UiButton from '~/components/ui/Button.vue';

const props = defineProps<{
  locations: Array<ProductsLocationsProps>;
}>();

const locationsRef = toRef(() => props.locations);
const {
  locationsMap,
  isRenderingMap,
  showGeoLocationPrompt,
  enableGeoLocation,
  onCancelGeoLocation,
} = useLocationsMap(locationsRef);
</script>

<template>
  <div class="relative w-full">
    <div v-if="isRenderingMap" class="aspect-[3/2] w-full">
      <div class="flex h-full items-center justify-center">
        Loading locations...
      </div>
    </div>
    <transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity ease-in-out duration-300"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity ease-in-out duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-show="!isRenderingMap"
        ref="locationsMap"
        class="aspect-[3/2] w-full overflow-hidden"
      />
    </transition>

    <div
      v-if="showGeoLocationPrompt"
      class="absolute top-0 flex aspect-[3/2] h-full w-full items-center justify-center rounded-lg bg-black/20 backdrop-blur-md"
    >
      <div class="">
        <p>
          Do you want to see your current location? You need to enable
          geolocation in your browser.
        </p>

        <div class="mt-4 flex gap-4">
          <UiButton label="Yes" @click="enableGeoLocation" />
          <UiButton label="No" @click="onCancelGeoLocation" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
