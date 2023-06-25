<template>
  <main class="main">
    <ul>
      <li v-for="(content, index) in contents" :key="content.id" :style="{ animationDelay: 0.5 + index*0.3 + 's' }">
        <nuxt-link :to="`/${content.id}`">
          <div :style="{ backgroundImage: 'url(' + content.eyecatch.url + ')' , animationDelay: 0.5 + index*0.3 + 's' }">
          </div>
          <p>{{ content.title }}</p>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.head{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.eyecatch {
  width: 40vw;
  text-align: right;
}

.eyecatch img {
  width: 30vw;
  max-width: 500px;
  min-width: 200px;
  aspect-ratio: 1/1;
}

.category {
  font-size: 16px;
  margin: 10px 10px 10px 0;

  * {
    background-color: var(--accent-color);
    color: #FFF;
    text-decoration: none;
    padding: 2px 10px;
  }
}
.title{
  width: 40vw;
}
h1 {
  background-color: var(--accent-color);
  color: #FFF;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  padding: .3rem;
  display: inline;
  margin: 0;
}

.post {
  width: 90vw;
  max-width: 820px;
  margin: 0 auto;
  line-height: 2;

  ::v-deep p {
    line-height: 2.25;
    font-size: 18px;
  }

  ::v-deep img {
    width: 80%;
    margin: 0 auto;
    display: block;
  }
  ::v-deep blockquote{
    border-left: #000 3px solid;
    padding-left: var(--text-base);
    line-height: 1.5;
    margin: calc(var(--text-base));
  }
}
</style>
<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    console.log(params.slug)
    const { data } = await axios.get(
      `https://hatopoppoblog.microcms.io/api/v1/blogs?limit=${categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY }
      }
    )
    console.log("data")
    console.log(data)
    return data
  },
}
</script>