<script lang="ts">
  import type { PageData } from "./$types";
  import ScheduleItem from "$lib/components/ScheduleItem.svelte";

  let { data }: { data: PageData } = $props();
  let { config, fallback } = data;
</script>

{#if fallback}
  <main class="grid grid-cols-1 p-16 gap-y-16">
    <h2 class="text-display-large text-center py-16">
      {fallback.name}
    </h2>
    {#each fallback.items as item}
      <ScheduleItem {item} />
    {/each}
  </main>
{:else}
  <!-- TODO: No fallback UI -->
  <h1>No valid fallback schedules</h1>
{/if}
