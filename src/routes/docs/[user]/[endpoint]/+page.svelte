<svelte:head>
  <title>{ data.display_name } Docs - Endpointz</title>
</svelte:head>

<script lang="ts">
  import Nav from '$components/Nav.svelte'
  export let data

  const url = `https://endpointz.vercel.app/api/${ data.user }/${ data.name }`

  const hasStructure = data?.array?.length > 0
  const keys = hasStructure ? Object.keys(data.array[0]): []

  const getStructure = () => {
    const finalObject: {
      [key: string]: string
    } = {}

    keys.forEach(key => {
      finalObject[key] = typeof data.array[0][key]
    })

    return JSON.stringify([finalObject], undefined, 2)
  }
</script>

<Nav mode="home" />

<main>
  <h1>{ data.display_name }</h1>
  <p>{ data.description }</p>
  <p>Base URL: { url }</p>
  {#if hasStructure}
    <h2>Structure of the API:</h2>
    <div class="struc">
      <code>{ getStructure() }</code>
    </div>
  {/if}

  <h2>Docs</h2>
  <details>
    <summary>GET /</summary>
    Get all the data stored in the endpoint
    {#if hasStructure}
      <table>
        <thead>
          <tr>
            <th>Query Param</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {#each keys as key}
            <tr>
              <td>
                <code>{ key }</code>
              </td>
              <td>
                <code>{ typeof data.array[0][key] }</code>
              </td>
              <td>
                Looks for items matching exactly the property
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </details>
  <details>
    <summary>GET /[index]</summary>
    Get only one item by index of the item in the list
  </details>
  <details>
    <summary>GET /random</summary>
    Picks randomly an item from the list
  </details>
</main>

<style>
  main {
    padding: 10px var(--side-padding);
    color: #eee;
  }

  h2 {
    margin-top: 20px;
  }

  details {
    margin-bottom: 10px;
  }

  .struc {
    white-space: pre-wrap;
    padding: 15px;
    background: #00000080;
    border-radius: 4px;
  }

  table {
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 18px;
    text-align: left;
  }

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #00000083;
  }

  tr:nth-child(even) {
    background-color: #00000028;
  }
</style>