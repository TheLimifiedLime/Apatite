<script lang="ts">
  import type { PageData } from "./$types";
  import ScheduleItem from "$lib/components/ScheduleItem.svelte";

  let { data }: { data: PageData } = $props();
  let { config, fallback } = data;
</script>

<svelte:head>
  <title>Apatite</title>
  <!-- TODO: seo/meta tags -->
</svelte:head>

{#if fallback}
  <main
    class="grid grid-cols-1 p-16 gap-y-16 medium:grid-cols-2 medium:gap-x-24 expanded:grid-cols-3"
  >
    <h1 class="text-display-large text-center py-16 col-span-full">
      {fallback.name}
    </h1>
    {#each fallback.items as item}
      <ScheduleItem {item} />
    {/each}
  </main>
{:else}
  <main
    class="grid grid-cols-1 grid-rows-[auto_1fr] box-border h-lvh p-16 gap-y-16"
  >
    <h1 class="text-display-large text-center py-16">Apatite</h1>
    <div class="flex flex-col gap-y-16 place-self-center">
      <p class="text-display-small text-center text-on-surface-variant">
        No fallback schedules available
      </p>
      <a
        class="text-headline-small text-center text-primary underline"
        href="/config"
      >
        Open the configurator
      </a>
    </div>
  </main>
{/if}
