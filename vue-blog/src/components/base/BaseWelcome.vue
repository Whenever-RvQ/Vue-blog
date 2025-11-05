<template>
    <!-- 背景装饰点 -->
    <el-container class="welcome-page">
        <div class="bg-dot bg-dot-1"></div>
        <div class="bg-dot bg-dot-2"></div>
        <div class="bg-dot bg-dot-3"></div>
        <div class="auth-buttons">
                <button class="auth-btn auth-btn-login" @click="refreshModal('login')">
                    <i class="fas fa-sign-in-alt"></i> 登录
                </button>
                <button class="auth-btn auth-btn-register" @click="refreshModal('register')">
                    <i class="fas fa-user-plus"></i> 注册
                </button>
            </div>
        <!-- 主内容 -->
        <div class="welcome-container">
            
            <!-- 个人标识（可替换为头像） -->
            <div class="personal-mark">
                <img src="@/assets/img/avatar.jpg">
            </div>

            <!-- 欢迎语 -->
            <h1 class="greeting">Hello, I'm <span>Whenever_RvQ</span></h1>
            <p class="intro">
                热爱生活、追求极致。这里是我的个人空间，分享我的作品、想法与成长历程。
            </p>

            <!-- 行动按钮 -->
            <div class="action-buttons">
                <a href="#about" class="btn btn-primary">
                    <i class="fas fa-user-circle"></i>关于我
                </a>
                <a href="#works" class="btn btn-secondary">
                    <i class="fas fa-briefcase"></i>我的作品
                </a>
            </div>

            <!-- 社交链接 -->
            <div class="social-links">
                <a href="https://github.com/Whenever-RvQ" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fab fa-qq"></i></a>
                <a href="#" aria-label="微博"><i class="fab fa-weixin"></i></a>
                <a href="#" aria-label="邮箱"><i class="fas fa-envelope"></i></a>
            </div>

            <!-- 版权信息 -->
            <div class="copyright">© 2025 Whevener_RvQ. All rights reserved.</div>
        </div>
    </el-container>
</template>

<script>

import MINXIN from '@/core/minxin'
export default {
    name: 'Welcome',
    mixins: [MINXIN],
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="stylus">

* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 全局变量 */
    :root {
      --primary: #2d7ff9;
      --accent: #6c5ce7;
      --neutral: #f8f9fa;
      --text-dark: #2d3436;
      --text-light: #636e72;
      --shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
      --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      --bg-gradient: linear-gradient(120deg, #fafafa 0%, #f5f6f7 100%);
    }

    /* 全局样式 */
    body {
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      background: var(--bg-gradient);
      min-height: 100vh;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
    }

    /* 背景动态装饰 */
    .bg-dot {
      position: absolute;
      border-radius: 50%;
      background: rgba(45, 127, 249, 0.05);
      z-index: -1;
      animation: float 12s infinite ease-in-out;
    }

    .bg-dot-1 {
      width: 400px;
      height: 400px;
      top: -150px;
      right: -150px;
      animation-delay: 0s;
    }

    .bg-dot-2 {
      width: 300px;
      height: 300px;
      bottom: -100px;
      left: -100px;
      animation-delay: 3s;
    }

    .bg-dot-3 {
      width: 200px;
      height: 200px;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
      animation-delay: 6s;
    }
    .welcome-page{
        display: flex
        justify-content: center
        }
    /* 主内容容器 */
    .welcome-container {
      text-align: center;
      max-width: 700px;
      width: 100%;
      padding: 60px 25px;
      position: relative;
    }

    /* 个人标识（可选头像/图标） */
    .personal-mark {
      width: 100px;
      height: 100px;
      margin: 0 auto 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2.5rem;
      box-shadow: 0 10px 25px rgba(45, 127, 249, 0.2);
      transition: var(--transition);
      overflow: hidden;
    }

    .personal-mark:hover {
      transform: scale(1.08) rotate(5deg);
      box-shadow: 0 15px 30px rgba(45, 127, 249, 0.3);
    }

    .personal-mark>img{
        width: 100%;
        height: 100%;
    }

    /* 文字样式 */
    .greeting {
      font-size: 3.2rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 15px;
      line-height: 1.2;
    }

    .greeting span {
      background: linear-gradient(90deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .intro {
      font-size: 1.2rem;
      color: var(--text-light);
      margin-bottom: 50px;
      line-height: 1.8;
      max-width: 550px;
      margin-left: auto;
      margin-right: auto;
    }

    /* 行动按钮 */
    .action-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      margin-bottom: 60px;
    }

    .btn {
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      transition: var(--transition);
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(90deg, var(--primary), var(--accent));
      color: white;
      box-shadow: 0 4px 15px rgba(45, 127, 249, 0.25);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(45, 127, 249, 0.35);
      background: linear-gradient(90deg, #2170f9, #5d4ce7);
    }

    .btn-secondary {
      background: white;
      color: var(--primary);
      border: 1px solid rgba(45, 127, 249, 0.2);
    }

    .btn-secondary:hover {
      background: var(--neutral);
      border-color: var(--primary);
      transform: translateY(-3px);
    }

    /* 社交链接 */
    .social-links {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .social-links a {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background: white;
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: var(--transition);
      box-shadow: var(--shadow);
    }

    .social-links a:hover {
      color: var(--primary);
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(45, 127, 249, 0.15);
    }

    /* 底部版权 */
    .copyright {
      display: block;
      position: absolute;
      margin: 0 auto
      bottom: 25px;
      left: 30%;
      color: var(--text-light);
      font-size: 0.9rem;
      opacity: 0.7;
    }

    /* 动画效果 */
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(15px, -15px) rotate(5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    /* 页面加载动画 */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .welcome-container > * {
      animation: fadeIn 0.8s ease forwards;
      opacity: 0;
    }

    .personal-mark { animation-delay: 0.2s; }
    .greeting { animation-delay: 0.4s; }
    .intro { animation-delay: 0.6s; }
    .action-buttons { animation-delay: 0.8s; }
    .social-links { animation-delay: 1s; }

    /* 响应式设计 */
    @media (max-width: 768px) {
      .greeting {
        font-size: 2.5rem;
      }

      .intro {
        font-size: 1.1rem;
      }

      .btn {
        padding: 12px 28px;
        font-size: 0.95rem;
      }

      .social-links {
        gap: 15px;
      }

      .social-links a {
        width: 42px;
        height: 42px;
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .welcome-container {
        padding: 40px 20px;
      }

      .greeting {
        font-size: 2rem;
      }

      .intro {
        font-size: 1rem;
        margin-bottom: 40px;
      }

      .action-buttons {
        flex-direction: column;
        gap: 12px;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      .bg-dot-1 {
        width: 300px;
        height: 300px;
        top: -100px;
        right: -100px;
      }

      .bg-dot-2 {
        width: 200px;
        height: 200px;
        bottom: -80px;
        left: -80px;
      }
      
    }

     /* 登录注册按钮容器（控制布局） */
    .auth-buttons {
      position: absolute;
      right: 0px;
      top: 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 18px;
      margin: 20px 0px;
      scale: 0.8
    }

    /* 核心按钮样式（与之前行动按钮风格一致，新增专属动画） */
    .auth-btn {
      height: auto;
      padding: 16px 36px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      transition: var(--transition);
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }

    /* 登录按钮（主色渐变，带发光动画） */
    .auth-btn-login {
      background: linear-gradient(90deg, var(--primary), var(--accent));
      color: white;
      box-shadow: 0 6px 20px rgba(45, 127, 249, 0.25);
    }

    .auth-btn-login:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(45, 127, 249, 0.35);
      background: linear-gradient(90deg, #2170f9, #5d4ce7);
    }

    /* 登录按钮发光动画（hover时触发） */
    .auth-btn-login::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 140%;
      height: 140%;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.6s ease;
    }

    .auth-btn-login:hover::after {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }

    /* 注册按钮（白底描边，带填充动画） */
    .auth-btn-register {
      background: white;
      color: var(--primary);
      border: 2px solid rgba(45, 127, 249, 0.3);
      box-shadow: var(--shadow);
    }

    .auth-btn-register:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
      box-shadow: 0 10px 25px rgba(45, 127, 249, 0.15);
    }

    /* 注册按钮填充动画（hover时背景渐变填充） */
    .auth-btn-register::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, rgba(45, 127, 249, 0.05), rgba(108, 92, 231, 0.05));
      transition: width 0.5s ease;
      z-index: -1;
    }

    .auth-btn-register:hover::before {
      width: 100%;
    }

    /* 图标样式（确保与文字对齐） */
    .auth-btn i {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .auth-btn:hover i {
      transform: translateX(3px);
    }

    /* 响应式适配（与之前页面保持一致） */
    @media (max-width: 768px) {
      .auth-btn {
        padding: 14px 30px;
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .auth-buttons {
        flex-direction: column;
        gap: 15px;
        width: 100%;
      }

      .auth-btn {
        width: 100%;
        justify-content: center;
        padding: 14px 20px;
      }
    }
</style>
