<script lang="ts">
  import { Toaster } from 'svelte-french-toast'
</script>

<Toaster />
<slot></slot>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

  :root {
    --side-padding: 15vw;
    --primary-color: #7d3781;
    --secondary-color: #27386d;
    --primary-font: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --bezier: cubic-bezier(0.19, -0.48, 0.01, 2.66);
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background: #121139;
    font-family: var(--primary-font)
  }

  @media(max-width: 1600px) {
    :root {
      --side-padding: 7vh
    }
  }
</style>