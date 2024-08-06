<svelte:head>
  <title>Endpointz - Dashboard</title>
</svelte:head>

<script lang="ts">
  import Nav from '$components/Nav.svelte'
  import YourEndpointz from '$components/YourEndpointz.svelte'

  export let data

  const { name, username } = data.user
  const { endpointz } = data
</script>

<Nav mode="dashboard" />

<main>
  <header>
    <h2>Welcome, { name } 👋</h2>
  </header>
  
  <YourEndpointz { endpointz } { username } />
</main>

<style>
  main {
    padding: 0 var(--side-padding);
    color: #eee;
  }

  header {
    margin-bottom: 15px;
  }
  
  header h2 {
    font-size: 29px;
  }
</style>