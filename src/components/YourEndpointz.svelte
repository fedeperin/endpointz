<script lang="ts">
  export let endpointz: any[]
  export let username: string
</script>

<section>
  <h2>Your Endpointz</h2>
  {#if endpointz.length === 0}
    You don't have endpointz yet, generate a new one.
  {:else}
    <ul class="endpointz">
      {#each endpointz as { display_name, name, description }}
        <li>
          <div>
            <h3>{ display_name }</h3>
            <span>{ description }</span>
          </div>

          <div class="buttons">
            <a href="./dashboard/{ name }" class="edit">Edit</a>
            <a href="./docs/{ username }/{ name }" class="docs">Docs</a>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  h2 {
    margin-bottom: 10px;
  }

  .endpointz {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    list-style: none;
  }

  .endpointz li {
    padding: 15px;
    border: 1px solid #fefefe1f;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 15px;
  }

  .buttons a {
    padding: 7px;
    text-decoration: none;
    border-radius: 4px;
  }

  .buttons .edit {
    background: var(--primary-color);
    color: #eee;
  }
  
  .buttons .docs {
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    font-weight: 500;
  }
</style>