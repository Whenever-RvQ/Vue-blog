<template>
  <div class="blog-article--info">
    <span class="blog-info--item">
      作者: {{info.nikname}}
    </span>
    <span class="blog-info--item">
      <i class="el-icon-time"></i> {{info.date}}
    </span>
    <div class="hidden-xs-only">
      <span class="blog-info--item">
        <i class="el-icon-star-on"></i> {{info.like_num}}
      </span>
      <span class="blog-info--item">
        <i class="el-icon-view"></i> {{info.hit_num}}
      </span>
      <span class="blog-info--item">
        <i class="el-icon-edit-outline"></i> {{info.comment_num}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleBarInfo',
  props: {
    info: {
      type: Object
    }
  },
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
</style>