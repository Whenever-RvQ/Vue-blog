<template>
    <div class="container">
        <!-- 页面标题 -->
        <div class="page-title">
            <h1>个人信息设置</h1>
            <p>更新您的个人资料和账户信息</p>
        </div>

        <!-- 信息卡片 -->
        <div class="card">
            <!-- 头像上传区域 -->
            <div class="avatar-section">
                <div class="avatar-container" @click="triggerFileInput">
                    <img :src="userInfo.avator" alt="用户头像" class="avatar-preview">
                    <div class="avatar-upload-overlay">
                        <i class="fa fa-camera avatar-upload-icon"></i>
                    </div>
                    <input type="file" ref="fileInput" class="hidden avatar-choose" accept="image/*"
                        @change="handleFileSelect">
                </div>

                <div class="avatar-info">
                    <h3>头像设置</h3>
                    <p>上传清晰的个人照片有助于他人更好地识别您的身份。</p>
                    <ul class="avatar-rules">
                        <li><i class="fa fa-check-circle"></i> 支持 JPG、PNG 格式</li>
                        <li><i class="fa fa-check-circle"></i> 图片大小不超过 5MB</li>
                        <li><i class="fa fa-check-circle"></i> 建议尺寸 200×200 像素</li>
                    </ul>
                </div>
            </div>

            <!-- 表单区域 -->
            <form class="profile-form">
                <!-- 姓名 -->
                <div class="form-group">
                    <label for="fullname" class="form-label">昵称</label>
                    <div class="form-input-wrapper">
                        <i class="fa fa-user input-icon"></i>
                        <input type="text" id="fullname" class="form-input icon-left" :value="userInfo.nikname"
                            placeholder="请输入您的姓名" ref="niknameInput">
                    </div>
                    <p class="error-message">请输入有效的姓名</p>
                </div>

                <!-- 性别 -->
                <div class="form-group">
                    <label class="form-label">性别</label>
                    <div class="gender-options">
                        <label class="gender-option">
                            <input type="radio" name="gender" value="male" checked class="gender-input">
                            <span class="gender-label">男</span>
                        </label>
                        <label class="gender-option">
                            <input type="radio" name="gender" value="female" class="gender-input">
                            <span class="gender-label">女</span>
                        </label>
                        <label class="gender-option">
                            <input type="radio" name="gender" value="other" class="gender-input">
                            <span class="gender-label">保密</span>
                        </label>
                    </div>
                </div>

                <!-- 手机号码 -->
                <div class="form-group">
                    <label for="phone" class="form-label">手机号码</label>
                    <div class="form-input-wrapper">
                        <i class="fa fa-phone input-icon"></i>
                        <input type="tel" id="phone" class="form-input icon-left" value="138****1234"
                            placeholder="请输入您的手机号码">
                    </div>
                    <p class="error-message">请输入有效的手机号码</p>
                </div>

                <!-- 电子邮箱 -->
                <div class="form-group">
                    <label for="email" class="form-label">电子邮箱</label>
                    <div class="form-input-wrapper">
                        <i class="fa fa-envelope input-icon"></i>
                        <input type="email" id="email" class="form-input icon-left" :value="userInfo.email"
                            placeholder="请输入您的电子邮箱" ref="emailInput">
                    </div>
                    <p class="error-message">请输入有效的电子邮箱</p>
                </div>

                <!-- 出生日期 -->
                <div class="form-group">
                    <label for="birthday" class="form-label">出生日期</label>
                    <div class="form-input-wrapper">
                        <i class="fa fa-calendar input-icon"></i>
                        <input type="date" id="birthday" class="form-input icon-left" value="1990-01-01">
                    </div>
                </div>

                <!-- 个人简介 -->
                <div class="form-group">
                    <label for="bio" class="form-label">个性签名</label>
                    <div class="form-input-wrapper" style="position: relative;">
                        <textarea id="bio" class="form-textarea" placeholder="请输入您的个性签名（可选）"
                            v-model="userInfo.signature" ref="signatureInput"></textarea>
                        <span class="char-count">20/150</span>
                    </div>
                </div>

                <!-- 提交按钮区域 -->
                <div class="button-group">
                    <button type="button" class="btn btn-cancel">取消</button>
                    <button type="submit" class="btn btn-save" @click="changeUserInfo()">
                        <i class="fa fa-save"></i> 保存修改
                    </button>
                </div>
            </form>
        </div>



    </div>
</template>

<script>
export default {
    name: 'BaseUser',
    data() {
        return {
            userInfo: this.$store.state.userInfo,
            form: {
                avator: '',
                nikname: '',
                email: '',
                signature: '',
            },
            file: null,
        };
        // // 头像预览
        // avatarPreview: '',
        //     // 原始用户信息
        //     originalUserInfo: null
    },
    components: {

    },
    mounted() {

    },
    methods: {
        // 添加触发文件选择的方法
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        // 处理文件选择
        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                // 验证文件类型和大小
                if (!this.validateFile(file)) {
                    alert('请选择有效的图片文件（JPG/PNG，大小不超过5MB）');
                    return;
                }

                // 创建文件预览
                const reader = new FileReader();
                reader.onload = (e) => {
                    // 更新头像预览
                    this.$el.querySelector('.avatar-preview').src = e.target.result;
                };
                reader.readAsDataURL(file);
                console.log(file)
                this.file = file
            }
        },

        // 验证文件
        validateFile(file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            return validTypes.includes(file.type) && file.size <= maxSize;
        },

        async changeUserInfo() {
            await this.getInputValue()
            const res = await this.$api({
                type: 'putUserInfo',  // 使用已有的API配置
                data:   this.form,
                params: {
                    id: this.userInfo._id  // 传递用户ID
                }
            });
            if (res) {
                // 更新成功后，更新 Vuex 中的用户信息
                const updatedUserInfo = {
                    ...this.userInfo,
                    ...this.form
                };

                this.$store.commit('SET_USERINFO', updatedUserInfo);

                // 显示成功提示
                this.$notify.success({
                    title: '成功',
                    message: '用户信息更新成功'
                });

                console.log('用户信息更新成功:', res);
            }
        
    },

    async getInputValue() {
        this.form.nikname = this.$refs.niknameInput.value
        this.form.email = this.$refs.emailInput.value
        this.form.signature = this.$refs.signatureInput.value
        await this.getAvatarUrl()
    },

    async getAvatarUrl() {
        if (this.file) {
            try {
                const formData = new FormData();
                formData.append('file', this.file);  // 添加文件
                formData.append('uid', this.userInfo._id);
                let res = await this.$api({
                    type: 'uploadAvatar',
                    data: formData,
                })
                this.form.avator = res.fileURL
            } catch (err) {
                console.log(err)
            }
        }
        else {
            this.form.avator = this.userInfo.avator
        }

    }
}

}
</script>


<style scoped="stylus">
.card {
    padding: 0 20px;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 0;
}

/* 页面标题样式 */
.page-title {
    text-align: center;
    margin-bottom: 10px;
}

.page-title h1 {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    color: #1f2937;
    margin-bottom: 8px;
    font-weight: 600;
}

.page-title p {
    color: #6b7280;
    font-size: 1rem;
}

/* 卡片容器样式 */
.card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 30px;
    margin-bottom: 24px;
}

/* 头像上传区域 */
.avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
}

.avatar-container {
    position: relative;
    margin-bottom: 16px;
    margin-left: 5vw;
    margin-right: 5vw;
    cursor: pointer;
}

.avatar-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.avatar-choose {
    position: absolute;
    display: block;
}

.avatar-upload-overlay {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.avatar-upload-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.avatar-upload-btn:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.avatar-upload-btn:active {
    transform: translateY(0);
}

.avatar-container:hover .avatar-upload-overlay {
    opacity: 1;
}

.avatar-upload-icon {
    color: #ffffff;
    font-size: 24px;
}

.avatar-hint {
    color: #6b7280;
    font-size: 0.9rem;
    text-align: center;
}

.avatar-info {
    width: 100%;
    max-width: 400px;
    margin-top: 16px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.avatar-info h3 {
    font-size: 1.1rem;
    color: #1f2937;
    margin-bottom: 8px;
    font-weight: 600;
    left: 0;
}

.avatar-info p {
    display: block;
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 12px;
}

.avatar-rules {
    display: block;
    left: 50%;
    list-style: none;
    font-size: 0.85rem;
    color: #6b7280;
}

.avatar-rules li {
    margin-bottom: 6px;
    display: flex;
    align-items: center;
}

.avatar-rules i {
    color: #3b82f6;
    margin-right: 8px;
    font-size: 0.9rem;
}

/* 表单样式 */
.profile-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-group {
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.form-group:focus-within {
    transform: translateY(-2px);
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #1f2937;
    font-size: 0.95rem;
}

.form-input-wrapper {
    width: 100%;
    position: relative;
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #1f2937;
    transition: all 0.3s ease;
}

.form-input.icon-left {
    padding-left: 44px;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 1rem;
}

.form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #1f2937;
    resize: none;
    min-height: 100px;
    transition: all 0.3s ease;
}

.form-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.gender-options {
    display: flex;
    gap: 24px;
    margin-top: 8px;
}

.gender-option {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.gender-input {
    margin-right: 8px;
    accent-color: #3b82f6;
}

.gender-label {
    color: #1f2937;
    font-size: 0.95rem;
}

.char-count {
    position: absolute;
    right: 16px;
    bottom: 12px;
    font-size: 0.8rem;
    color: #6b7280;
}

.error-message {
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: 6px;
    display: none;
}

/* 按钮区域样式 */
.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.hidden {
    display: none;
    position: absolute;
}

.btn i {
    margin-right: 8px;
}

.btn-cancel {
    background-color: #ffffff;
    color: #374151;
    border: 1px solid #d1d5db;
}

.btn-cancel:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
}

.btn-save {
    background-color: #3b82f6;
    color: #ffffff;
}

.btn-save:hover {
    background-color: #2563eb;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
}

/* 安全提示卡片 */
.safety-tip {
    background-color: #f1f5f9;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
}

.safety-tip-content {
    display: flex;
    align-items: flex-start;
}

.safety-tip-icon {
    color: #3b82f6;
    font-size: 1.5rem;
    margin-right: 16px;
    margin-top: 2px;
}

.safety-tip-text h3 {
    font-size: 0.95rem;
    color: #1f2937;
    margin-bottom: 6px;
    font-weight: 600;
}

.safety-tip-text p {
    font-size: 0.9rem;
    color: #4b5563;
}

.safety-tip-link {
    color: #3b82f6;
    text-decoration: none;
}

.safety-tip-link:hover {
    text-decoration: underline;
}

/* 页脚样式 */
.footer {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
    text-align: center;
}

.copyright {
    color: #6b7280;
    font-size: 0.85rem;
    margin-bottom: 16px;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
}

.footer-link {
    color: #6b7280;
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-link:hover {
    color: #3b82f6;
}

/* 响应式适配 */
@media (min-width: 768px) {
    .avatar-section {
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
    }

    .avatar-info {
        margin-top: 0;
    }

    .button-group {
        flex-wrap: nowrap;
    }
}

@media (max-width: 767px) {
    .card {
        padding: 20px;
    }

    .gender-options {
        flex-direction: column;
        gap: 12px;
    }

    .btn {
        flex: 1;
        min-width: 100%;
    }

    .footer-links {
        gap: 16px;
    }
}
</style>