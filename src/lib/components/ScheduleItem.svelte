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
    <div class="min-h-[230px] grid gap-y-16 grid-rows-[auto_auto_1fr_auto]">
      <header class="text-headline-large">{name}</header>
      <p class="text-title-medium text-primary font-medium underline">
        {url}
      </p>
      <p class="text-body-large">
        {description}
      </p>
      <div>
        <Button
          type="tonal"
          on:click={() => {
            window.location.href = url;
          }}
          extraOptions={{ title: `Open ${url}` }}>Open</Button
        >
      </div>
    </div>
  </Card>
</div>
