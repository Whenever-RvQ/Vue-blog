<template>
  <li class="blog-comment--item">
    <div class="blog-comment--user blog-line blog-line--row ">
      <div class="blog-comment--avatar">
        <img :src="uid.avator"
             alt="!">
      </div>
      <span class="blog-comment--name">{{uid.nikname}}</span>
    </div>
    <p class="blog-comment-content">{{content}}</p>
    <p class="blog-comment-date">{{date}}</p>
  </li>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    uid: {
      type: Object
    },
    content: {
      type: String
    },
    date: {
      type: String
    }
  },
  data () {
    return {

    };
  },
  mounted () {
    console.log(this.uid);

  },
  methods: {

  },
};
</script>

<style lang="stylus" scoped>
.blog-comment--avatar>img
  width: 100%
  height: 100%
</style>