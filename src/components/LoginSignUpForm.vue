<template>
  <v-dialog v-model="isLoginSignUp_FormVisible" max-width="750px" persistent>
    <v-card
      :style="{ borderColor: color.secondary, borderWidth: '2px' }"
      class="pa-2"
    >
      <v-row :style="{ minHeight: '430px' }" no-gutters>
        <!-- Left Picture Section -->
        <v-col
          v-if="isLogin && !smAndDown"
          class="d-flex align-center justify-center"
          :style="{
            backgroundImage: `url(${leftColumn.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
          cols="12"
          md="6"
        >
          <v-card
            variant="tonal"
            class="pa-4 ma-5 text-center"
            style="border-radius: 10px"
            width="75%"
          >
            <v-card-title>
              {{ leftColumn.title }}
            </v-card-title>
            <v-card-text>
              {{ leftColumn.description }}
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Form Section-->
        <v-col cols="12" md="6">
          <v-card
            :class="['pa-2', smAndDown ? 'ma-0' : isLogin ? 'ml-2' : 'mr-2']"
            variant="flat"
          >
            <v-card-title class="d-flex align-center mb-3">
              <span class="flex-grow-1 text-center">{{
                isLogin ? "Login" : "Sign Up"
              }}</span>
              <v-icon
                class="cursor-pointer"
                :style="{ color: color.secondary }"
                @click="hideLoginSignUpForm"
              >
                fa-solid fa-xmark fa-sm
              </v-icon>
            </v-card-title>

            <!-- Login Form -->
            <v-row v-if="isLogin">
              <v-col cols="12">
                <v-text-field
                  v-model="loginEmail"
                  variant="outlined"
                  label="Email Address"
                  type="email"
                  hide-details
                  :density="smAndDown ? 'compact' : 'default'"
                  :color="color.secondary"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="loginPassword"
                  variant="outlined"
                  label="Password"
                  :append-inner-icon="
                    loginShowPassword
                      ? 'fa-regular fa-eye'
                      : 'fa-regular fa-eye-slash'
                  "
                  :type="loginShowPassword ? 'text' : 'password'"
                  hide-details
                  :density="smAndDown ? 'compact' : 'default'"
                  :color="color.secondary"
                  @click:append-inner="loginShowPassword = !loginShowPassword"
                />
              </v-col>
              <v-col cols="12">
                <a
                  class="text-decoration-underline"
                  :style="{ cursor: 'pointer', color: color.secondary }"
                  @click="handleForgotPassword"
                >
                  Forgot Password?
                </a>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  :style="{ height: '40px' }"
                  :color="color.secondary"
                  @click="handleLogin"
                >
                  Login
                </v-btn>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-divider>or</v-divider>
              </v-col>
              <v-col cols="12" class="py-0 text-center">
                <v-btn :color="color.secondary" @click="handleLoginWithGoogle">
                  <v-icon>fab fa-google</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                Don’t have an account?
                <a
                  class="text-decoration-underline"
                  :style="{ cursor: 'pointer', color: color.secondary }"
                  @click="isLogin = false"
                >
                  Signup
                </a>
              </v-col>
            </v-row>

            <!-- Signup Form -->
            <v-form v-else ref="form" v-model="isFormValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="email"
                    label="Email"
                    :rules="[rules.required, rules.email]"
                    :density="smAndDown ? 'compact' : 'default'"
                    :hide-details="smAndDown ? 'auto' : false"
                    :color="color.secondary"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="password"
                    label="Password"
                    :append-inner-icon="
                      showPassword
                        ? 'fa-regular fa-eye'
                        : 'fa-regular fa-eye-slash'
                    "
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[rules.required, rules.min(6)]"
                    :density="smAndDown ? 'compact' : 'default'"
                    :hide-details="smAndDown ? 'auto' : false"
                    :color="color.secondary"
                    @click:append-inner="showPassword = !showPassword"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="confirmPassword"
                    label="Confirm Password"
                    :append-inner-icon="
                      showPassword
                        ? 'fa-regular fa-eye'
                        : 'fa-regular fa-eye-slash'
                    "
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[rules.required, rules.match]"
                    :density="smAndDown ? 'compact' : 'default'"
                    :hide-details="smAndDown ? 'auto' : false"
                    :color="color.secondary"
                    @click:append-inner="showPassword = !showPassword"
                  />
                </v-col>
                <v-col cols="12" class="py-0 mt-4">
                  <v-btn
                    block
                    :disabled="!isFormValid"
                    :style="{ height: '40px' }"
                    :color="color.secondary"
                    @click="handleSignUp"
                  >
                    Sign Up
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center mt-3">
                  Already have an account?
                  <a
                    class="text-decoration-underline"
                    :style="{ cursor: 'pointer', color: color.secondary }"
                    @click="isLogin = true"
                  >
                    Login
                  </a>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <!--Right Picture Section-->
        <v-col
          v-if="!isLogin && !smAndDown"
          class="d-flex align-center justify-center"
          :style="{
            backgroundImage: `url(${rightColumn.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
          cols="12"
          md="6"
        >
          <v-card
            variant="tonal"
            class="pa-4 ma-5 text-center"
            style="border-radius: 10px"
            width="75%"
          >
            <v-card-title>
              {{ rightColumn.title }}
            </v-card-title>
            <v-card-text>
              {{ rightColumn.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const { smAndDown } = useDisplay();

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const isLogin = ref(true);

const isLoginSignUp_FormVisible = computed(
  () => store.getters["loginAndSignUp/isLoginSignUp_FormVisible"]
);
const hideLoginSignUpForm = () =>
  store.dispatch("loginAndSignUp/hideLoginSignUpForm");

// Login Form Data
const loginEmail = ref("");
const loginPassword = ref("");
const loginShowPassword = ref(false);

const leftColumn = computed(
  () => store.getters["loginAndSignUp/getLeftColumn"]
);

// SignUp Form Data
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

const isFormValid = ref(false);
const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
  min: (minLength) => (value) =>
    value?.length >= minLength || `Min ${minLength} characters.`,
  match: () =>
    password.value === confirmPassword.value || "Passwords do not match",
};

const rightColumn = computed(
  () => store.getters["loginAndSignUp/getRightColumn"]
);

// Funtions for authentication
const handleLogin = () =>
  store.dispatch("authentication/login", {
    email: loginEmail.value,
    password: loginPassword.value,
  });

const handleSignUp = () =>
  store.dispatch("authentication/signUp", {
    email: email.value,
    password: password.value,
  });

const handleLoginWithGoogle = () =>
  store.dispatch("authentication/loginWithGoogle");

const handleForgotPassword = () =>
  store.dispatch("authentication/forgotPassword", {
    email: loginEmail.value,
  });
</script>

<style scoped></style>
