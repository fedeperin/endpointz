<script lang="ts">
  import Trash from '$assets/trash.svg'
  import type { IProperty } from '$utils/types'

  export let property: IProperty
  export let deleteProperty: (number: number) => () => void
  export let trashDisabled = false
</script>

<li>
  <button
  type="button"
  on:click={ deleteProperty(property.id) }
  disabled={ trashDisabled }>
    <img src={ Trash } alt="Trash">
  </button>

  <input type="text"
  placeholder="Key"
  bind:value={property.name}
  pattern="[a-z]*"
  title="Only letters a-z are allowed"
  required>
  <select bind:value={ property.type }>
    <option value="string">String</option>
    <option value="number">Number</option>
    <option value="boolean">Boolean</option>
    <option value="date">Date</option>
  </select>

  <input type="text" placeholder="Prompt" class="prompt" bind:value={ property.prompt } required>
</li>

<style>
  li {
    display: grid;
    grid-template-columns: 45px 1fr 1fr;
    gap: 5px;
  }

  li button {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border: 1px solid #444;
    border-radius: 4px;
    background: #050505;
  }

  li button:disabled {
    opacity: .5;
  }

  .prompt {
    grid-column: span 3;
  }

  input {
    padding: 10px;
    background: #050505;
    color: #eee;
    border: 1px solid #444;
    font-size: 18px;
    border-radius: 4px;
  }
  
  select {
    padding: 10px;
    font-size: 18px;
    background: #050505;
    border: 1px solid #444;
    color: #eee;
    border-radius: 4px;
  }
</style>