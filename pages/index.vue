<template>
  <div>
    <h1>タイトル未定</h1>
    <p class="intro">目的もなくただそれなりの長文を書き留めるだけの場所</p>
    <ul>
      <li v-for="(content, index) in contents" :key="content.id" :style="{ animationDelay: 0.5 + index*0.3 + 's' }">
        <nuxt-link :to="`/${content.id}`">
          <div :style="{ backgroundImage: 'url(' + content.eyecatch.url + ')' , animationDelay: 0.5 + index*0.3 + 's' }">
          </div>
          <p>{{ content.title }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  color: var(--accent-color);
  text-align: center;
  margin: 10vh 0 0 0;
  font-size: calc(var(--text-base)*4);
}
.intro{
  text-align: center;
  font-size: var(--text-base);
  margin: 0 0 10vh 0;
}
ul{
  width: 80%;
  max-width: 1200px;
  min-width: 300px;
  display: grid;
  grid-template-columns: repeat(5,1fr);
  margin: 0 auto;
  gap: 30px;
}
li{
  list-style: none;
  animation-name: Appearance;
  animation-duration: .2s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
  transform-origin: top center;
  animation-timing-function: ease-out;
  opacity: 0;
}
@keyframes Appearance{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes Appearance-img{
  0%{
    transform: rotate(-30deg);
  }
  10%{
    transform: rotate(-30deg);
  }
  30%{
    transform: rotate(5deg);
  }
  40%{
    transform: rotate(-3deg);
  }
  50%{
    transform: rotate(2deg);
  }
  60%{
    transform: rotate(-1deg);
  }
  70%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
  li a{
    text-decoration: none;
    width: 100%;
  }
  li div{
    width: calc(100% - 6px);
    border: solid 3px #000;
    aspect-ratio: 1/1;
    background-size: cover;
    background-position: center;
    animation-name: Appearance-img;
    animation-duration: 2s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
  transform: rotate(-30deg);
  transform-origin: top center;
  }

  li h2{
    margin: 2.5% 0;
    height: 25%;
    overflow: hidden;
    color: #000;
    font-size: calc(var(--text-base) * 1.5);

  }
</style>
<script lang="js" scoped>
</script>
<script>
import axios from 'axios'
export default {
  async asyncData() {
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      'https://hatopoppoblog.microcms.io/api/v1/blogs',
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY }
      }
    )
    return data
  },
}
</script>