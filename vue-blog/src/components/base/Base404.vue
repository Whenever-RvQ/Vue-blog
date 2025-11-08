<template>
    <div class="err-container">

        <!-- 主内容（完全保留原有文字和按钮） -->
        <div class="container">
            <div class="error-code">404</div>
            <h1 class="error-title">哎呀，页面迷失啦～</h1>
            <p class="error-desc">
                你访问的页面好像不见了，可能是地址错误或页面已迁移。<br>
                不如回到主页，重新开启你的探索之旅吧！
            </p>
            <router-link to="/index" class="btn-back">
                <i class="fas fa-arrow-left"></i> 返回主页
            </router-link>
        </div>

        <!-- 底部小提示 -->
        <div class="footer-note">
            请检查URL是否正确，或联系管理员获取帮助
        </div>
    </div>
</template>

<script>
export default {
    name: 'Base404',
}
</script>

<style>

.err-container {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    /* 简化为纯色渐变背景 */
    max-height: 100vh;
    /* overflow: hidden; */
    position: relative;
    color: var(--text-light);
}

.bg-dot {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: -1;
    animation: float 15s infinite ease-in-out;
}

.bg-dot-1 {
    width: 120px;
    height: 120px;
    top: 20%;
    right: 15%;
}

.bg-dot-2 {
    width: 80px;
    height: 80px;
    bottom: 30%;
    left: 10%;
    animation-delay: 5s;
}

/* 主内容容器（保留原有居中布局） */
.container {
    width: 100%;
    max-width: 800px;
    max-height: 200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    position: relative;
    transform: translateY(-50%);
    z-index: 2;
}

/* 404数字创意样式（完全保留） */
.error-code {
    font-size: 8rem;
    font-weight: 900;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--text-light));
    -webkit-background-clip: text;
    background-clip: text;
    color:black;
    margin-top: 100px;
    line-height: 1.2;
    position: relative;
}

.error-code::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--secondary), transparent);
    border-radius: 2px;
}

/* 文字内容（完全保留原有样式） */
.error-title {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--text-light);
}

.error-desc {
    font-size: 1.1rem;
    color: var(--text-gray);
    margin-bottom: 40px;
    line-height: 1.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* 按钮样式（完全保留） */
.btn-back {
    padding: 14px 36px;
    background: linear-gradient(135deg, #1e40af, #7e22ce);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);;
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
}

.btn-back:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 10px 25px rgba(30, 64, 175, 0.4);
    background: linear-gradient(135deg, #1e3a8a, #6b21a8);
}

.btn-back i {
    transition: var(--transition);
}

.btn-back:hover i {
    transform: translateX(-3px);
}

/* 底部小提示（完全保留） */
.footer-note {
    position: absolute;
    left: 50%;
    top: 60vh;
    transform: translateX(-50%);
    color: var(--text-gray);
    font-size: 0.9rem;
    opacity: 0.7;
    z-index: 2;
}

/* 简化动画（保留核心漂浮效果） */
@keyframes float {
    0% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(15px, -15px);
    }

    100% {
        transform: translate(0, 0);
    }
}

/* 响应式适配（完全保留） */
@media (max-width: 768px) {
    .error-code {
        font-size: 6rem;
    }

    .error-title {
        font-size: 1.7rem;
    }

    .error-desc {
        font-size: 1rem;
    }

    .btn-back {
        padding: 12px 30px;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .error-code {
        font-size: 4.5rem;
    }

    .error-title {
        font-size: 1.5rem;
    }

    .error-desc {
        font-size: 0.95rem;
    }

    .btn-back {
        width: 100%;
        justify-content: center;
    }

    .footer-note {
        font-size: 0.8rem;
        text-align: center;
        width: 90%;
    }
}
</style>