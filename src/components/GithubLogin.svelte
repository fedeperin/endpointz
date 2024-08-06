<script lang="ts">
  import Github from '$assets/github.svg'
	import { PUBLIC_CLIENT_ID } from '$env/static/public'
</script>

<a href={ `https://github.com/login/oauth/authorize?client_id=${ PUBLIC_CLIENT_ID }&status=1234` }>
  <img src={ Github } alt="Github">Github Login
</a>

<style>
  a {
    background: #000;
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