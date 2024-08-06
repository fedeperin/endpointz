<svelte:head>
  <title>Endpointz - New Endpoint</title>
</svelte:head>

<script lang="ts">
  import Nav from '$components/Nav.svelte'
  import GenerateAI from '$components/GenerateAI.svelte'
  import EndpointEditor from '$components/EndpointEditor.svelte'

  let optionSelected: 'ai' | 'scratch' | undefined

  export let form

  const select = (option: 'ai' | 'scratch') => () => {
    optionSelected = option
  }

  const goBack = () => {
    optionSelected = undefined
  }
</script>

<Nav mode="dashboard" />

{#if !optionSelected}
  <section class="options">
    <h2>How do you want to start your API?</h2>
    <div>
      <button on:click={ select('ai') } class="ai">Generate with AI</button>
      <button on:click={ select('scratch') } class="scratch">Start from scratch</button>
    </div>
  </section>
{:else if optionSelected === 'ai'}
  <GenerateAI { form } { goBack } />
{:else if optionSelected === 'scratch'}
  <EndpointEditor { goBack } />
{/if}

<style>
  :global(body) {
    padding-bottom: 50px;
  }

  .options {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    top: 0;
    position: absolute;
  }

  .options h2 {
    color: #eee;
    font-size: 30px;
  }

  .options div {
    display: flex;
    gap: 10px;
  }

  .options button {
    padding: 15px;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 3px;
    transition: scale .3s var(--bezier);
  }
  
  .options button:hover {
    scale: 1.05;
  }
  
  .options .ai {
    background: var(--secondary-color);
  }
  
  .options .scratch {
    font-weight: bold;
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
    background-color: transparent;
  }
</style>