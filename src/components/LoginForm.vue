<template>
  <v-dialog v-model="isloginFormVisible" max-width="800px" persistent>
    <v-card :style="{ borderColor: color.secondary, borderWidth: '2px' }">
      <v-container
        class="pa-2"
        :style="{ borderColor: color.secondary, borderWidth: '2px' }"
      >
        <v-row :style="{ minHeight: '430px' }" no-gutters>
          <v-col
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
          <v-col cols="12" md="6" class="pl-2">
            <v-card class="pa-2" elevation="0">
              <!-- Title Section -->
              <v-card-title class="d-flex align-center mb-3">
                <span class="flex-grow-1 text-center">Login</span>
                <v-icon
                  class="cursor-pointer"
                  :style="{ color: color.secondary }"
                  @click="hideLoginForm"
                >
                  fa-solid fa-xmark fa-sm
                </v-icon>
              </v-card-title>

              <!-- Form Section -->
              <v-row>
                <!-- Email Input -->
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    :style="{ height: '50px' }"
                    :color="color.secondary"
                  />
                </v-col>

                <!-- Password Input -->
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    :style="{ height: '50px' }"
                    :color="color.secondary"
                  />
                </v-col>

                <!-- Forgot Password Link -->
                <v-col cols="12">
                  <a
                    class="text-decoration-underline"
                    :style="{ cursor: 'pointer', color: color.secondary }"
                  >
                    Forgot Password?
                  </a>
                </v-col>

                <!-- Login Button -->
                <v-col cols="12" class="py-0 mt-4">
                  <v-btn
                    block
                    :style="{ height: '40px' }"
                    :color="color.secondary"
                  >
                    Login
                  </v-btn>
                </v-col>

                <!-- Divider -->
                <v-col cols="12" class="py-0">
                  <v-divider>or</v-divider>
                </v-col>

                <!-- Google Login Button -->
                <v-col cols="12" class="py-0 text-center">
                  <v-btn :color="color.secondary">
                    <v-icon>fab fa-google</v-icon>
                  </v-btn>
                </v-col>

                <!-- Signup Section -->
                <v-col cols="12" class="text-center mt-3">
                  Don’t have an account?
                  <a
                    class="text-decoration-underline"
                    :style="{ cursor: 'pointer', color: color.secondary }"
                  >
                    Signup
                  </a>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);
const leftColumn = computed(() => store.getters["login/getLeftColumn"]);
const isloginFormVisible = computed(
  () => store.getters["login/isLoginFormVisible"]
);
const hideLoginForm = () => store.dispatch("login/hideLoginForm");
</script>
