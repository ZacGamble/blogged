<template>
  <div class="content">
    <div
      v-for="b in blogs"
      :key="b.id"
      class="blog-card"
      style="background-image: url({{b.img}})"
    >
      <div class="d-flex">
        <div>
          <span class="fs-2">{{ b.title }}</span> <br />
          <span class="fs-5">{{ b.subtitle }}</span>
          <p>{{ b.body }}</p>
        </div>
        <img :src="b.img" alt="cat photo" class="img-clamp" />
      </div>
    </div>
    <button class="btn btn-success create-blog">+</button>
  </div>
</template>


<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { blogsService } from '../services/BlogsService.js'
import { AppState } from '../AppState.js'
export default {
  setup() {
    watchEffect(async () => {
      try {
        await blogsService.getBlogs()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      blogs: computed(() => AppState.blogs)
    }
  }
}
</script>


<style lang="scss" scoped>
.blog-card {
  padding: 1em;
  border: 2px solid black;
  margin: 1em 1em;
  box-shadow: 2px 2px 2px black;
}

.content {
  border: 1px solid black;
}

.create-blog {
  position: absolute;
  right: 2em;
  bottom: 2em;
}

.img-clamp {
  width: 50%;
  height: 50%;
}
</style>