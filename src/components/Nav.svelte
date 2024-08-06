<script lang="ts">
  import Icon from '$assets/icon.png'
  import GithubLogin from '$components/GithubLogin.svelte'
  import NewEndpoint from '$components/NewEndpoint.svelte'

  export let mode: 'home' | 'dashboard' = 'home'
</script>

<nav>
  <a href="../" class="logo">
    <img src={ Icon } alt="Endpointz">
    <h2>Endpointz</h2>
  </a>

  <ul>
    <li>
      <a href="https://github.com/fedeperin/endpointz">Github</a>
    </li>
    {#if mode === 'dashboard'}
      <li>
        <a href="../dashboard">Dashboard</a>
      </li>
    {/if}
    <li class="button">
      {#if mode === 'home'}
        <GithubLogin />
      {:else if mode === 'dashboard'}
        <NewEndpoint />
      {/if}
      </li>
    </ul>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 40px var(--side-padding);
    z-index: 2;
    position: relative;
  }

  nav .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  nav .logo img {
    height: 55px;
    margin-right: 15px;
  }

  nav .logo h2 {
    color: #fff;
    font-size: 25px;
  }

  nav ul {
    display: flex;
    list-style: none;
    align-items: center;
    gap: 15px;
  }

  nav li a {
    color: #fff;
    text-decoration: none;
  }

  nav li.button {
    margin-left: 10px;
  }
</style>