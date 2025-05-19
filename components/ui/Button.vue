<script setup lang="ts">
import useButtonSize from './composables/useButtonSize';
import useButtonVariant from './composables/useButtonVariant';
import { UiButtonPropsDefault, type UiButtonProps } from './props';

const props = withDefaults(defineProps<UiButtonProps>(), {
  ...UiButtonPropsDefault,
});

const emit = defineEmits<{
  click: [];
}>();

const variant = toRef(props, 'variant');
const btnVariantClass = useButtonVariant(variant);

const isIconOnly = computed(() => {
  return !props.label != null && props.icon != null;
});
const size = toRef(props, 'size');
const sizeClass = useButtonSize(size, isIconOnly);
</script>

<template>
  <button
    class="rounded text-center font-bold uppercase tracking-wider transition-colors"
    :class="[btnVariantClass, sizeClass]"
    @click="emit('click')"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<style scoped></style>
