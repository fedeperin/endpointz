<script lang="ts">
  import X from '$assets/x.svg'

  export let showModal: boolean = false

  function handleClose() {
    showModal = false
  }
</script>

{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="backdrop" on:click={handleClose}></div>

  <dialog class="modal" open>
    <slot></slot>

    <button on:click={handleClose}>
      <img src={ X } alt="Close">
    </button>
  </dialog>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 30%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    background: #010101;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
  }

  button img {
    width: 30px;
  }

  :global(dialog.modal) {
    color: #fff;
  }
</style>
