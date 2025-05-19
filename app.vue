<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'bg-[#4a4a4a] text-white',
  },
});
const locations = [
  {
    name: 'Rio de Janeiro',
    coordinates: {
      long: -43.2,
      lat: -22.9,
    },
  },
  {
    name: 'New York',
    coordinates: {
      long: -74.006,
      lat: 40.7128,
    },
    align: 'top',
  },
  {
    name: 'Tokyo',
    coordinates: {
      long: 139.6917,
      lat: 35.6895,
    },
    image: '/products-tokyo.jpg',
  },
  {
    name: 'Sydney',
    coordinates: {
      long: 151.2093,
      lat: -33.8688,
    },
  },
  {
    name: 'Cape Town',
    coordinates: {
      long: 18.4241,
      lat: -33.9249,
    },
  },
  {
    name: 'London',
    coordinates: {
      long: -0.1276,
      lat: 51.5074,
    },
    align: 'top',
  },
  {
    name: 'Frankfurt',
    coordinates: {
      long: 8.6821,
      lat: 50.1109,
    },
  },
  {
    name: 'Shanghai',
    coordinates: {
      long: 121.4737,
      lat: 31.2304,
    },
  },
  {
    name: 'Singapore',
    coordinates: {
      long: 103.8198,
      lat: 1.3521,
    },
    align: 'right',
  },
  {
    name: 'Washington D.C.',
    coordinates: {
      long: -77.0369,
      lat: 38.9072,
    },
    align: 'bottom',
  },
  {
    name: 'Los Angeles',
    coordinates: {
      long: -118.2437,
      lat: 34.0522,
    },
  },
  {
    name: 'Stockholm',
    coordinates: {
      long: 18.0686,
      lat: 59.3293,
    },
  },
];
</script>
<template>
  <div>
    <!-- in a real world scenario, LocationsMap SHOULD be LAZY and Delayed or Lazy hydrated, since D3 Script is VERY heavy for the initial load -->
    <LocationsMap :locations="locations" />
  </div>
</template>
