<template>
  <div class="live2d-wrap">
    <div class="live2d-menu">
      <span class="live2d-menu--item"><i class="el-icon-refresh" @click="changeModel"></i></span>
      <span class="live2d-menu--item"><i class="el-icon-goods" @click="changeTextures"></i></span>
    </div>
    <canvas id="live2d" width="200" height="200"></canvas>
  </div>
</template>

<script>
const MODEL_MAP = {
  1: 'live2d-widget-model-gf',
  2: 'live2d-widget-model-hijiki',
}

const TEXTURE_MAP = {
  1: { 0: 'Gantzert_Felixander.model.json' }, // 若有实际纹理文件，再替换为真实文件名
  2: { 0: 'hijiki.model.json' }
}

export default {
  name: 'Live2d',
  data() {
    return {
      modelId: 1,
      texturesId: 0,
      live2dInstance: null // 存储 Live2D 实例，用于销毁
    };
  },
  mounted() {
    this.loadLive2dScript().then(() => {
      this.initLive2D()
    }).catch(err => {
      console.error('Live2D脚本加载失败：', err)
    })
  },
  // 组件卸载时销毁模型，避免内存泄漏
  beforeUnmount() {
    this.destroyLive2D()
  },
  methods: {
    loadLive2dScript() {
      return new Promise((resolve, reject) => {
        if (window.loadlive2d || window.L2Dwidget) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = '/static/live2dw/lib/L2Dwidget.min.js'
        script.type = 'text/javascript'
        script.async = false
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
      })
    },

    destroyLive2D() {
      if (this.live2dInstance) {
        // 兼容不同版本的销毁方法
        if (this.live2dInstance.destroy) {
          this.live2dInstance.destroy()
        } else if (window.L2Dwidget && window.L2Dwidget.destroy) {
          window.L2Dwidget.destroy('live2d')
        }
        this.live2dInstance = null
      }
      // 清空画布，避免残留
      const canvas = document.getElementById('live2d')
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    },

    initLive2D() {
      // 先销毁旧模型，再初始化新模型（核心修复）
      this.destroyLive2D()

      const canvas = document.getElementById('live2d')
      if (!canvas) {
        console.error('未找到Live2D画布！')
        return
      }

      const modelFolder = MODEL_MAP[this.modelId]
      const textureFile = TEXTURE_MAP[this.modelId][this.texturesId]
      const modelConfigPath = `/public/static/live2dw/${modelFolder}/assets/${textureFile}`


      console.log(`当前加载模型：ID=${this.modelId}，路径=${modelConfigPath}`)

      try {
        if (window.loadlive2d) {

          this.live2dInstance = window.loadlive2d('live2d', modelConfigPath)
        } else if (window.L2Dwidget) {
          // 存储实例，用于后续销毁
          this.live2dInstance = window.L2Dwidget.init({
            canvasId: 'live2d',
            model: { url: modelConfigPath },
            display: {
              position: 'fixed',
              bottom: '10px',
              left: '100px',
              width: 200, 
              height: 200
            },
            log: false
          })
        } else {
          console.error('未找到Live2D核心API')
        }
      } catch (err) {
        console.error('Live2D初始化失败：', err)
        // 加载失败时重置到默认模型
        this.resetModel()
      }
    },

    changeModel() {
      const modelIds = Object.keys(MODEL_MAP).map(Number)
      const currentIndex = modelIds.indexOf(this.modelId)
      this.modelId = modelIds[(currentIndex + 1) % modelIds.length]
      this.texturesId = 0
      this.initLive2D() // 重新初始化（会先销毁旧模型）
    },

    changeTextures() {
      const textureIds = Object.keys(TEXTURE_MAP[this.modelId]).map(Number)
      const currentIndex = textureIds.indexOf(this.texturesId)
      this.texturesId = textureIds[(currentIndex + 1) % textureIds.length]
      this.initLive2D() // 重新初始化（会先销毁旧模型）
    },

    resetModel() {
      this.modelId = 1
      this.texturesId = 0
      this.initLive2D()
    }
  }
}
</script>

<style lang="stylus">
.live2d-wrap
  position fixed
  left 0
  bottom 10px
  width 100px
  z-index 999
  overflow hidden
.live2d-wrap:hover .live2d-menu
  display flex

.live2d-menu
  position absolute
  top 0px
  left 10px
  display none
  flex-direction column
  align-items center
  justify-content space-around
  width 40px
  height 80px
  padding 8px
  background-color #fff
  border-radius 20px
  box-shadow 0 2px 10px rgba(0,0,0,0.1)

.live2d-menu--item
  padding 4px
  cursor pointer
  color #666
  &:hover
    color #409eff
</style>