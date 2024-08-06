<script lang="ts">
  import GithubLogin from '$components/GithubLogin.svelte'
  import HeroIMG from '$assets/hero.jpg'
</script>

<header>
  <div class="content">
    <h1>
      <span>AI-Powered</span><br>
      Mock APIs in Seconds
    </h1>
    <p>Instantly generate and deploy mock APIs with ease using our AI-powered JSON generator. Streamline your development process and enhance your workflow.</p>
    <GithubLogin />
  </div>

  <img src={ HeroIMG } alt="Hero">
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    position: absolute;
    padding: 0 var(--side-padding);
    color: #fefefe;
  }

  h1 {
    line-height: 50px;
  }
  
  h1 span {
    background: linear-gradient(#9130F4, #4646F9);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 50px;
  }

  .content {
    width: 40%;
  }

  .content p {
    margin-bottom: 20px;
  }
  
  img {
    width: 50%;
    border-radius: 10px;
    aspect-ratio: 5/4;
    object-fit: cover;
  }
</style>