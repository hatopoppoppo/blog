<template>
  <main class="main">
    <div class="head">
      <div v-if="eyecatch">
        <div class="eyecatch">
          <img :src="eyecatch.url" alt="">
        </div>
      </div>
      <div v-else>
        <div class="eyecatch">
          <img src="/image/noimage.png" alt="">
        </div>
      </div>
      <div class="title">
        <div v-if="category">
          <div class="category">category : <nuxt-link class="link" :to="`/category/${category.id}`">{{ category.name }}</nuxt-link></div>
        </div>
        <div v-else>
          <div class="category">category : <span>無し</span></div>
        </div>
        <h1 class="title">{{ title }}</h1>
        <p class="publishedAt">{{ publishedAt }}</p>
      </div>
    </div>
    <div class="post" v-html="content">
    </div>
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

  ::v-deep p {
    line-height: 2.25;
    font-size: 16px;
  }
  ::v-deep li {
    line-height: 2.25;
    font-size: 16px;
    margin: 2rem 0;
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
    const { data } = await axios.get(
      `https://hatopoppoblog.microcms.io/api/v1/blogs/${params.slug}`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY }
      }
    )
    const makeTwitterLink = (str) => {
      console.log("aaa")
      const regexp_twitter = /https:\/\/twitter.com\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3001-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g;
      var twitter_embed = function (url) {
        console.log("embed")
        return '<iframe border=0 frameborder=0 height=250 width=550 src="https://twitframe.com/show?url=' + url + '"></iframe>'
      }
      if (str.match(regexp_twitter) != null) {
        const urlAllMatches = str.match(regexp_twitter);
        if (urlAllMatches) {
          const urlMatches = new Set(urlAllMatches);
          urlMatches.forEach(url => {
            str = str.replaceAll(url, twitter_embed(url));
          });
        }
      }
      return str;
    }
    console.log(data)
    data.content = await makeTwitterLink(data.content)
    console.log("bbb")
    return data
  }
}
</script>