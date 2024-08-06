<script lang="ts">
  import Plus from '$assets/Plus.svg'
</script>

<a href="../dashboard/new">
  <img src={ Plus } alt="Github"> New Endpoint
</a>

<style>
  a {
    background: var(--primary-color);
    padding: 12px;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    font-size: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    transition: scale .3s var(--bezier);
  }

  a img {
    margin-right: 10px;
  }

  a:hover {
    scale: 1.05;
  }
</style>