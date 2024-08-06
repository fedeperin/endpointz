<script lang="ts">
  import { copy } from 'svelte-copy'
  import toast from 'svelte-french-toast'
  import Trash from '$assets/trash.svg'
  import Plus from '$assets/plus.svg'
  import Copy from '$assets/copy.svg'
  import Modal from '$components/Modal.svelte'
  import { toastConfig } from '$utils/consts'

  export let existingApiKeys: any[] = []

  let apiKeys: {
    isNew: boolean,
    name: string,
    key: string
  }[] = [...existingApiKeys.map(({ name, key }) => { return { isNew: false, name, key } })]
  let apiKeyName: string = ''
  let showModal: boolean = false
  let actualApiKey: string = ''

  const addApiKey = () => {
    if(apiKeys.length >= 5) return
    if(apiKeyName.trim() === '') return

    
    openModal()
    actualApiKey = crypto.randomUUID()
    apiKeys = [...apiKeys, {
      isNew: true,
      name: apiKeyName.trim(),
      key: actualApiKey
    }]
    apiKeyName = ''
  }

  const deleteApiKey = (key: string, isNew: boolean) => () => {
    apiKeys = [...apiKeys.filter(itm => itm.key !== key)]
  }

  const handleInputSubmit = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    addApiKey()
  }

  const openModal = () => {
    showModal = true
  }
</script>

<Modal bind:showModal={ showModal }>
  <h2>New API Key</h2>

  <p>The following API key will be shown only once, you can always generate more keys if needed or delete this one.</p>

  <p class="actual-key">
    { actualApiKey }

    <button
    use:copy={ actualApiKey }
    on:svelte-copy={ () => toast.success('Copied to clipboard!', toastConfig) }
    on:svelte-copy:error={ () => toast.error('Error copying to clipboard', toastConfig) }
    type="button"
    >
      <img src={ Copy } alt="Copy">
    </button>
  </p>
</Modal>

<input
type="hidden"
name="api-keys"
value={ JSON.stringify(apiKeys) } >

<h3>API Keys</h3>

<div class="api-key-input">
  <input
  type="text"
  placeholder="API Key name..."
  bind:value={ apiKeyName }
  on:keypress={ handleInputSubmit }
  maxlength="30">

  <button
  type="button"
  on:click={ addApiKey }
  disabled={ apiKeys.length >= 5 || apiKeyName.trim() === '' }>
    <img src={ Plus } alt="Plus">
  </button>
</div>

{#if apiKeys.length === 0}
  <div>
    No existing API keys, generate a new one
  </div>
{:else}
  {#each apiKeys as { name, key, isNew }}
    <div class="api-key-container">
      <p>{ name }</p>
      <button type="button" on:click={ deleteApiKey(key, isNew) }>
        <img src={ Trash } alt="Trash">
      </button>
    </div>
  {/each}
{/if}

<style>
  input {
    padding: 10px;
    background: #050505;
    color: #fefefe;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #444;
  }

  .api-key-input {
    margin-bottom: 10px;
  }

  .api-key-input, .api-key-container {
    display: grid;
    grid-template-columns: 1fr 40px;
    gap: 10px;
  }

  .api-key-input button,
  .api-key-container button {
    background: var(--secondary-color);
    border: 1px solid #222;
    border-radius: 4px;
  }
  .api-key-input button:disabled,
  .api-key-container button:disabled {
    opacity: .6;
  }
  
  .api-key-container button {
    background: #8a1010;
    height: 40px;
  }

  .api-key-container p {
    font-size: 18px;
  }
  
  .actual-key {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #222;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actual-key button {
    border: none;
    background: none;
  }
</style>