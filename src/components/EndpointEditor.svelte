<script lang="ts">
  import toast from 'svelte-french-toast'
  import Edit from '$assets/edit.svg'
  import Check from '$assets/check.svg'
  import X from '$assets/x.svg'
  import Back from '$assets/back.svg'
	import { enhance } from '$app/forms'
	import JSONSyntaxHighlight from '$utils/JSONSyntaxHighlight'
  import isValidJSON from '$utils/isValidJSON'
  import { toastConfig } from '$utils/consts'
  import arraySharesSchema from '$utils/arraySharesSchema'

  import ApiKeyManager from '$components/ApiKeyManager.svelte'
  import Checkbox from '$components/input/Checkbox.svelte'

  export let goBack: (() => void) | string
  export let sendMessage: string = 'Publish'
  export let formAction: string = '?/publish'
  export let displayName: string = ''
  export let name: string = ''
  export let description: string = ''
  export let privateAPI: boolean = false
  export let array: any[] = []
  export let existingApiKeys: any[] = []
  export let editingMode: boolean = false

  let editing = false
  let edition = ''

  const handleToggleEdition = () => {
    if(!editing) {
      edition = JSON.stringify(array, undefined, 2)
      editing = true
    }else {
      // TODO: Handle validations with returns
      if(isValidJSON(edition)) {
        if(Array.isArray(JSON.parse(edition))) {
          if(array.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))) {
            if(arraySharesSchema(JSON.parse(edition))) {
              array = JSON.parse(edition)
              editing = false
            }else {
              toast.error('All objects must follow the same type and key schema', toastConfig)
            }
          }else {
            toast.error('The input is not a valid array of objects', toastConfig)
          }
        }else {
          toast.error('The input should be an array', toastConfig)
        }
      }else {
        toast.error('The input is not a valid array of objects', toastConfig)
      }
    }
  }

  const cancelEdition = () => {
    editing = false
  }
</script>

<section>
  {#if typeof goBack === 'string'}
    <a href={ goBack } class="go-back">
      <img src={ Back } alt="Back">
      Go back
    </a>  
  {:else}
    <button on:click={ goBack } class="go-back">
      <img src={ Back } alt="Back">
      Go back
    </button>  
  {/if}

  <form action={ formAction } method="post" on:reset|preventDefault use:enhance>
    <div class="inputs">
      <label>
        Display name
        <input type="text" name="display-name" required autocomplete="off" value={ displayName } maxlength="50">
      </label>
      {#if editingMode === false}
        <label>
          Name
          <input type="text" name="name" required autocomplete="off" value={ name } maxlength="50" pattern="[a-z]*" title="Only letters a-z are allowed">
        </label>
      {/if}
      <label>
        Description
        <textarea name="description" required value={ description } maxlength="100"></textarea>
      </label>

      <Checkbox label="Private" name="private" bind:checked={ privateAPI } />

      {#if privateAPI}
        <ApiKeyManager { existingApiKeys } />
      {/if}

      <input type="hidden" name="array" value={ JSON.stringify(array) }>

      <button type="submit">{ sendMessage }</button>
    </div>
    <div class="array">
      {#if editing}
        <textarea bind:value={ edition } />
      {:else}
        <code>{@html JSONSyntaxHighlight(array) }</code>
      {/if}

      <div class="icons">
        {#if !editing}
          <span>{ array.length } item{ (array.length === 1) ? '' : 's' }</span>
        {:else}
          <button type="button" on:click={ cancelEdition }>
            <img src={ X } alt="Cross">
          </button>
        {/if}

        <button type="button" on:click={ handleToggleEdition }>
          {#if editing}
            <img src={ Check } alt="Check">
          {:else}
            <img src={ Edit } alt="Edit">
          {/if}
        </button>
      </div>
    </div>
  </form>
</section>

<style>
  section {
    padding: 0 var(--side-padding);
    color: #eee;
  }

  .go-back {
    padding: 10px;
    border: none;
    background: transparent;
    color: #eee;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 17px;
    margin-bottom: 20px;
    text-decoration: none;
  }

  .go-back img {
    width: 20px;
  }
  
  form {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 30px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .inputs label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .inputs input {
    padding: 10px;
    background: #050505;
    color: #fefefe;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #444;
  }
  
  .inputs textarea {
    resize: vertical;
    height: 120px;
    min-height: 80px;
    max-height: 200px;
    padding: 10px;
    background: #050505;
    color: #fefefe;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #444;
    font-family: var(--primary-font);
  }

  .inputs button[type="submit"] {
    margin-top: 10px;
    padding: 15px;
    font-size: 20px;
    background: var(--primary-color);
    color: #eee;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: scale .3s var(--bezier);
  }

  .inputs	button[type="submit"]:hover {
    scale: 1.03;
  }

  .array {
    width: 100%;
    height: 100%;
    max-height: 60vh;
    min-height: 20vh;
    background: #0c0c27;
    border-radius: 10px;
    overflow-y: none;
    position: relative;
  }

  .array .icons {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .array .icons * {
    background: #0c0c27;
  }

  .array .icons span {
    border: 1px solid #222;
    font-size: 15px;
    border-radius: 20px;
    padding: 3px 10px;
  }
  
  .array .icons button {
    border: 1px solid #222;
    padding: 7px;
    border-radius: 7px;
  }

  code {
    white-space: pre-wrap;
    display: inline-block;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }

  .array textarea {
    background: transparent;
    resize: none;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    color: #eee;
    padding: 20px;
  }
</style>