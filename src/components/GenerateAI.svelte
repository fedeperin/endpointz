<script lang="ts">
  import { copy } from 'svelte-copy'
  import toast from 'svelte-french-toast'
  import Property from '$components/Property.svelte'
  import EndpointEditor from '$components/EndpointEditor.svelte'
  import Copy from '$assets/copy.svg'
  import Back from '$assets/back.svg'
  import type { IProperty } from '$utils/types'
	import JSONSyntaxHighlight from '$utils/JSONSyntaxHighlight'
  import { toastConfig } from '$utils/consts'
	import { enhance } from '$app/forms'

  export let form: any
  export let goBack: () => void

  let properties: IProperty[] = [{
    id: 0,
    name: '',
    type: 'string',
    prompt: ''
  }]
  let idCount = 1
  let singleProperty = true
  let finalArray: any[] = []
  let publishEndpoint = false
  let promptInput = ''
  let generateDisabled = false

  const addProperty = () => {
    if(properties.length >= 6) return
    properties = [...properties, { id: idCount, name: '', type: 'string', prompt: '' }]
    
    idCount++
  }
  
  const deleteProperty = (number: number) => () => {
    if(singleProperty) return
    properties = properties.filter(prop => prop.id !== number)
  }

  const openPublishEndpoint = () => {
    publishEndpoint = true
  }

  const closePublishEndpoint = () => {
    publishEndpoint = false
  }

  const normalizeName = (name: string) => name.toLowerCase().replace(/[^a-z-]/g, '')

  const handleSubmit = () => {
    toast('Generating array...', toastConfig)
    generateDisabled = true
  }
  
  $: singleProperty = properties.length === 1
  
  $: if(form?.success) {
    generateDisabled = false
    toast.success('Array generated successfuly', toastConfig)
    finalArray = form.generation?.object?.response
  }
  
  $: if(form?.success === false) {
    generateDisabled = false
    toast.error('Try generating other thing or checking the params, the AI model is not able to generate that', toastConfig)
  }
</script>

{#if !publishEndpoint}
  <section>
    <button on:click={ goBack } class="go-back">
      <img src={ Back } alt="Back">
      Go back
    </button>

    <h2>Generate Endpoint with AI</h2>

    <div class="container">
      <form method="POST" action="?/generate" use:enhance on:reset|preventDefault on:submit={ handleSubmit }>
        <div class="main-options">
          <label>
            Prompt
            <input
            type="text"
            name="prompt"
            required
            autocomplete="off"
            class="text"
            bind:value={ promptInput } >
          </label>
          <label>
            Limit
            <input type="number" value="5" min="1" max="15" name="limit" required class="number">
          </label>
        </div>

        <h3>Fields</h3>
        <ul class="property-selector">
          {#each properties as property}
            <Property bind:property={ property } { deleteProperty } bind:trashDisabled={ singleProperty } />
          {/each}
        </ul>

        <input type="hidden" name="properties" value={ JSON.stringify(properties) }>

        {#if properties.length < 6}
          <button on:click={ addProperty } type="button" class="add-field">
            Add field
          </button>
        {/if}

        <button type="submit" disabled={ generateDisabled }>Generate Array</button>
      </form>
      <div class="left-section">
        <div class="array">
          <div class="icons">
            <span>{ finalArray.length } item{ (finalArray.length === 1) ? '' : 's' }</span>
    
            <button
            use:copy={ JSON.stringify(finalArray, undefined, 2) }
            on:svelte-copy={ () => toast.success('Copied to clipboard!', toastConfig) }
            on:svelte-copy:error={ () => toast.error('Error copying to clipboard', toastConfig) }
            >
              <img src={ Copy } alt="Copy">
            </button>
          </div>
          <code>{@html JSONSyntaxHighlight(finalArray) }</code>
        </div>

        <button class="publish" disabled={ !finalArray[0] } on:click={ openPublishEndpoint }>
          Publish Endpoint
        </button>
      </div>
    </div>
  </section>
{:else}
  <EndpointEditor
  goBack={ closePublishEndpoint }
  array={ finalArray }
  displayName={ promptInput }
  name={ normalizeName(promptInput) }/>
{/if}

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
  }

  .go-back img {
    width: 20px;
  }

  h2 {
    margin-bottom: 10px;
  }

  .container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 30px;
  }

  form .main-options {
    display: grid;
    grid-template-columns: 5fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }

  form .main-options label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 19px;
  }

  h3 {
    margin-bottom: 6px;
    font-weight: normal;
    font-size: 22px;
  }

  form .property-selector {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }

  form .number,
  form .text {
    padding: 10px;
    background: #050505;
    color: #fefefe;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #444;
  }

  form .add-field {
    width: 100%;
    color: var(--secondary-color);
    background: transparent;
    border: 1px solid var(--secondary-color);
    padding: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    transition: scale .3s var(--bezier);
  }

  form .add-field:hover {
    scale: 1.03;
  }

  form button[type="submit"] {
    width: 100%;
    padding: 10px;
    background: var(--secondary-color);
    padding: 15px;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: scale .3s var(--bezier);
  }

  form button[type="submit"]:not(:disabled):hover {
    scale: 1.03;
  }

  form button[type="submit"]:disabled {
    opacity: .8;
  }

  .array {
    width: 100%;
    height: 100%;
    max-height: 60vh;
    background: #0c0c27;
    border-radius: 10px;
    padding: 20px;
    overflow-y: auto;
    position: relative;
    margin-bottom: 25px;
  }

  .array .icons {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .array .icons span {
    border: 1px solid #222;
    font-size: 15px;
    border-radius: 20px;
    padding: 3px 10px;
  }
  
  .array .icons button {
    border: 1px solid #222;
    background: transparent;
    padding: 7px;
    border-radius: 7px;
  }

  code {
    white-space: pre-wrap;
  }

  .publish {
    padding: 15px;
    width: 100%;
    background: var(--primary-color);
    color: #eee;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    transition: scale .3s var(--bezier);
  }

  .publish:not(:disabled):hover {
    scale: 1.04;
  }

  .publish:disabled {
    opacity: .5;
    cursor: auto;
  }
</style>