<script lang="ts">
  export let checked: boolean = false
  export let label: string = ''
  export let name: string = 'check'
</script>

<label>
  { label }
  <input type="checkbox" { name } bind:checked={ checked }>
</label>

<style>
  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  label input {
    appearance: none;
    background-color: #dfe1e4;
    border-radius: 72px;
    border-style: none;
    flex-shrink: 0;
    height: 20px;
    margin: 0;
    position: relative;
    width: 30px;
  }

  label input::before {
    bottom: -6px;
    content: "";
    left: -6px;
    position: absolute;
    right: -6px;
    top: -6px;
  }

  label input,
  label input::after {
    transition: all 100ms ease-out;
  }

  label input::after {
    background-color: #fff;
    border-radius: 50%;
    content: "";
    height: 14px;
    left: 3px;
    position: absolute;
    top: 3px;
    width: 14px;
  }

  label input[type=checkbox] {
    cursor: default;
  }

  label input:hover {
    background-color: #c9cbcd;
    transition-duration: 0s;
  }

  label input:checked {
    background-color: var(--primary-color);
  }

  label input:checked::after {
    background-color: #fff;
    left: 13px;
  }

  label:focus:not(.focus-visible) {
    outline: 0;
  }

  label input:checked:hover {
    opacity: .9;
  }
</style>
