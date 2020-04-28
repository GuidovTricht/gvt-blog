<template>
  <section class="blog">
    <div class="py-8 md:py-16 text-center">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl">About Me</h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      <div class="pr-2">
        <div class="flex justify-center pb-2">
          <img
            src="@/static/images/photo.jpeg"
            alt="Guido van Tricht"
            class="rounded-full w-2/5 justify-center"
          />
        </div>
        <p class="text-gray-700 text-base">
          My name is Guido van Tricht. I am a (web) developer from The Netherlands.<br />
          Currently I work for Valtech as Sitecore developer/architect, but the contents and
          opinions of this blog/website are always my own.<br />
          <br />
          You can also find me on:
        </p>
        <ul class="list-disc list-inside">
          <li><a href="https://twitter.com/GuidovTricht" target="_blank">Twitter</a></li>
          <li><a href="https://github.com/GuidovTricht" target="_blank">GitHub</a></li>
          <li>
            <a href="https://www.linkedin.com/in/guido-van-tricht-00154431/" target="_blank"
              >LinkedIn</a
            >
          </li>
        </ul>
      </div>
      <div class="rounded overflow-hidden shadow-lg pr-4 py-1 self-center">
        <progress-bar :percentage="90" :rounded="true" class="mx-2 mb-2 h-5" title="Sitecore">
          <span class="text-xs text-white w-full flex justify-end pr-2">90%</span>
        </progress-bar>
        <progress-bar :percentage="85" :rounded="true" class="mx-2 mb-2 h-5" title="C#">
          <span class="text-xs text-white w-full flex justify-end pr-2">85%</span>
        </progress-bar>
        <progress-bar :percentage="90" :rounded="true" class="mx-2 mb-2 h-5" title="ASP.Net MVC">
          <span class="text-xs text-white w-full flex justify-end pr-2">90%</span>
        </progress-bar>
        <progress-bar :percentage="70" :rounded="true" class="mx-2 mb-2 h-5" title="ASP.Net Core">
          <span class="text-xs text-white w-full flex justify-end pr-2">70%</span>
        </progress-bar>
        <progress-bar
          :percentage="100"
          :rounded="true"
          class="mx-2 mb-2 h-5"
          title="Useless Graphics"
        >
          <span class="text-xs text-white w-full flex justify-end pr-2">9001%</span>
        </progress-bar>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import ProgressBar from '@/components/ProgressBar.vue';

@Component({
  components: {
    ProgressBar,
  },
  head(): MetaInfo {
    return {
      title: 'About Me',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About Me',
        },
      ],
    };
  },
  // Called to know which transition to apply
  transition() {
    return 'slide-left';
  },
})
export default class Home extends Vue {
  get posts(): Post[] {
    return this.$store.state.posts;
  }
}
</script>

<style lang="scss">
ul li > a {
  color: $bluise;
}
</style>
