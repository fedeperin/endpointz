<svelte:head>
  <title>Endpointz - Edit Endpoint</title>
</svelte:head>

<script lang="ts">
  import Nav from '$components/Nav.svelte'
  import EndpointEditor from '$components/EndpointEditor.svelte'
  export let data

  const {
    name,
    description,
    display_name: displayName,
    array,
    private: privateAPI,
    api_key: existingApiKeys
  } = data
</script>

<Nav mode="dashboard" />

<EndpointEditor
goBack="../dashboard"
sendMessage="Save"
formAction="?/edit"
{ name }
{ displayName }
{ description }
{ array }
{ privateAPI }
{ existingApiKeys }
editingMode={ true }
/>