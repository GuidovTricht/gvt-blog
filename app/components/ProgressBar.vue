<template>
  <div
    class="w-full bg-gray-200 h-2 relative overflow-hidden"
    :class="[{ 'rounded-full': rounded }]"
  >
    <div
      class="h-full progressbar"
      :class="[`bg-${color}-500`, { 'rounded-full': rounded }]"
      role="progressbar"
      :style="{ width: `${percentage}%` }"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span class="flex items-center h-full">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProgressBar extends Vue {
  @Prop() private title!: string;

  @Prop({ default: false }) private rounded!: boolean;

  @Prop({ default: '0' }) private percentage!: string;

  @Prop({ default: 'orange' }) private color!: string;
}
</script>
