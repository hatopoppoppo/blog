<template>
  <div>
    <h1>タイトル未定</h1>
    <p class="intro">日記とかを書いたりする場所</p>
    <ul>
      <li v-for="(content, index) in contents" :key="content.id" :style="{ animationDelay: 0.5 + index*0.3 + 's' }">
        <nuxt-link :to="`/${content.id}`">
          <div v-if="content.eyecatch">
            <div :style="{ backgroundImage: 'url(' + content.eyecatch.url + ')' , animationDelay: 0.5 + index*0.3 + 's' }"></div>
          </div>
          <div v-else>
            <div :style="{ backgroundImage: 'url(/image/noimage.png)' , animationDelay: 0.5 + index*0.3 + 's' }"></div>
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
  padding: 0;
}
@media screen and (max-width: 1200px) {
  ul{
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 562px) {
  ul{
    grid-template-columns: 1fr;
  }
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
  li div div{
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
  async asyncData({ params }) {
    const page = params.p || '1'
    const limit = 2
    const { data } = await axios.get(
      'https://hatopoppoblog.microcms.io/api/v1/blogs?limit=${limit}&offset=${(page - 1) * limit}',
      { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY } }
    )
    return data
  }
}
</script>