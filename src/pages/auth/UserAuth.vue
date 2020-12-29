<template>
  <div>
    <base-dialog :show="!!error" title="에러 발생" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="인증 중입니다." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <h2>{{ submitButtonCaption }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">이메일</label>
          <input
            v-model.trim="email.value"
            @blur="clearValidity('email')"
            type="email"
            name="email"
            id="email"
            ref="email-input"
          />
          <p class="error-message" v-if="!email.isValid">
            {{ email.errorMessage }}
          </p>
        </div>
        <div class="form-control">
          <label for="password">비밀번호</label>
          <input
            v-model.trim="password.value"
            @blur="clearValidity('password')"
            type="password"
            name="password"
            id="password"
          />
          <p class="error-message" v-if="!password.isValid">
            {{ password.errorMessage }}
          </p>
        </div>

        <!-- confirm Password -->
        <div v-if="mode === 'signup'" class="form-control">
          <label for="confirm-password">비밀번호 확인</label>
          <input
            v-model.trim="confirmPassword.value"
            @blur="clearValidity('confirmPassword')"
            type="password"
            name="confirm-password"
            id="confirm-password"
          />
          <p class="error-message" v-if="!confirmPassword.isValid">
            {{ confirmPassword.errorMessage }}
          </p>
        </div>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button mode="flat" @click.prevent="switchAuthMode">
          {{ switchAuthModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
        errorMessage: '이메일을 확인하세요.',
      },
      password: {
        value: '',
        isValid: true,
        errorMessage: '비밀번호를 확인하세요.',
      },
      confirmPassword: {
        value: '',
        isValid: true,
        errorMessage: '동일한 비밀번호를 입력하세요.',
      },
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? '로그인' : '회원가입';
    },
    switchAuthModeButtonCaption() {
      return this.mode === 'login' ? '회원가입' : '로그인';
    },
    redirectUrl() {
      return this.$route.query.redirect || 'coachesList';
    },
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.email.value === '') {
        this.email.isValid = false;
      }
      if (this.password.value.length < 6) {
        this.password.isValid = false;
      }

      if (this.mode === 'signup') {
        if (this.password.value !== this.confirmPassword.value) {
          this.confirmPassword.isValid = false;
        }
        this.formIsValid =
          this.email.isValid &&
          this.password.isValid &&
          this.confirmPassword.isValid;
        return;
      }

      this.formIsValid = this.email.isValid && this.password.isValid;
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      const actionPayload = {
        email: this.email.value,
        password: this.password.value,
      };

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else if (this.mode === 'signup') {
          await this.$store.dispatch('signup', actionPayload);
        }
        this.$router.replace({ name: this.redirectUrl });
      } catch (error) {
        this.error = error;
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode == 'login' ? 'signup' : 'login';
    },
    handleError() {
      this.error = null;
    },
  },
  watch: {
    mode() {
      this.$refs['email-input'].focus();
    },
  },
  // created() {
  //   this.mode = this.$route.query.redirect === 'register' ? 'signup' : 'login';
  // },
};
</script>

<style scoped>
h2 {
  margin: 1rem;
}

form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 1.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.form-control .error-message {
  color: red;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 8px 0px;
}
</style>
