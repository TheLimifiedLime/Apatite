<script lang="ts">
  import type { ScheduleItem } from "$lib/schema/schedule";
  import { Button, Card } from "m3-svelte";
  const {
    item,
  }: {
    item: ScheduleItem;
  } = $props();
  const { name, url, description } = item;
</script>

<div class="w-full">
  <Card type="elevated">
    <!-- TODO: properly implement text breaking for more cases-->
    <div
      class="min-h-[230px] grid gap-y-16 grid-rows-[auto_auto_1fr_auto] break-words hyphens-auto"
    >
      <!-- TODO: Implement placeholder titles when items don't have names -->
      <header class="text-headline-large">{name}</header>
      <p class="text-title-medium text-primary font-medium">
        {url}
      </p>
      <p class="text-body-large">
        {description}
      </p>
      <div>
        <Button
          type="tonal"
          disabled={!item.enabled}
          on:click={() => {
            window.location.href = url;
          }}
          extraOptions={{ title: `Open ${url}` }}>Open</Button
        >
      </div>
    </div>
  </Card>
</div>
