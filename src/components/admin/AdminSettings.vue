<template>
  <v-container height="85vh">
    <v-row justify="center" class="ma-0 fill-height">
      <v-col md="10">
        <div class="overflow-auto" style="height: 80vh; scrollbar-width: none">
          <!-- Color Module-->
          <v-card
            id="Colors"
            variant="outlined"
            class="rounded-xl pa-4 mb-4 d-flex flex-column"
          >
            <div class="text-h3">Colors</div>
            <v-divider />
            <v-row class="ma-0 my-2">
              <v-col md="7">
                <v-row>
                  <v-col cols="12">
                    <v-card
                      class="d-flex flex-row align-center rounded-xl"
                      :color="newColor.primary"
                      :style="{
                        border: `1px solid ${newColor.secondary}`,
                        height: '30vh',
                      }"
                    >
                      <v-card
                        class="rounded-xl h-75 w-33 ml-5"
                        :color="newColor.accent"
                        :style="{ border: `1px solid ${newColor.secondary}` }"
                      >
                        <v-card-title>Title</v-card-title>
                        <v-card-text
                          >Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit
                        </v-card-text>
                      </v-card>
                      <div
                        class="text-h4 ml-4"
                        :style="{ color: `${newColor.secondary}` }"
                      >
                        Preview
                      </div>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    v-for="(color, key) in filteredColors"
                    :key="key"
                  >
                    <v-text-field
                      v-model="newColor[key]"
                      :placeholder="color"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @click="selectField(key)"
                    >
                      <template #prepend>
                        <label style="width: 100px; text-align: right"
                          >{{ key }} :
                        </label>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="5" class="d-flex flex-column justify-center pa-0">
                <div class="my-4 d-flex justify-center align-center">
                  <v-color-picker
                    rounded="b-xl"
                    v-model="selectedColor"
                    @update:model-value="updateSelectedColor"
                    :disabled="!selectedField"
                  />
                </div>
                <v-spacer />
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="discardColorChanges">Discard</v-btn>
                  <v-btn :color="colors.info" @click="saveColorChanges"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>

          <!--Home Mofule -->
          <v-card
            id="Home"
            variant="outlined"
            class="rounded-xl pa-4 mb-4 d-flex flex-column"
          >
            <div class="text-h3">Home</div>
            <v-divider />
            <v-row class="ma-0 py-2">
              <v-col md="8">
                <div class="text-h5">Background Photo:</div>
                <v-card>
                  <v-img :src="newHome" cover height="40vh">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
              <v-col md="4" class="d-flex flex-column justify-space-around">
                <div class="my-3">Upload a photo:</div>
                <v-file-upload
                  density="comfortable"
                  icon="fa-solid fa-file-arrow-up"
                  title="Drag and Drop Here"
                  height="200"
                  disabled
                />
                <v-textarea
                  v-model="newHome"
                  label="Alternative URL photo"
                  :placeholder="newHome"
                  density="compact"
                  variant="outlined"
                  hide-details
                  rows="2"
                  max-rows="2"
                  no-resize
                  class="my-3"
                />
                <v-spacer />
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="discardHomeChanges">Discard</v-btn>
                  <v-btn :color="colors.info" @click="saveHomeChanges"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>

          <!--Service Module -->
          <v-card
            id="Service"
            variant="outlined"
            class="rounded-xl pa-4 mb-4 d-flex flex-column"
          >
            <div class="text-h3">Service</div>
            <v-divider />
            <v-row class="ma-0 py-2">
              <v-col md="4" class="d-flex flex-column justify-space-around">
                <div class="my-3">Upload a photo:</div>
                <v-file-upload
                  density="comfortable"
                  icon="fa-solid fa-file-arrow-up"
                  title="Drag and Drop Here"
                  height="200"
                  disabled
                />
                <v-textarea
                  v-model="newService"
                  label="Alternative URL photo"
                  :placeholder="newService"
                  density="compact"
                  variant="outlined"
                  hide-details
                  rows="2"
                  max-rows="2"
                  no-resize
                  class="my-3"
                />
                <v-spacer />
                <v-card-actions>
                  <v-btn :color="colors.info" @click="saveServiceChanges"
                    >Save</v-btn
                  >
                  <v-btn @click="discardServiceChanges">Discard</v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-col>
              <v-col md="8">
                <div class="text-h5">Background Photo:</div>
                <v-card>
                  <v-img :src="newService" cover height="40vh">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card>

          <!--Footer Module-->
          <v-card
            id="Footer"
            variant="outlined"
            class="rounded-xl pa-4 mb-4 d-flex flex-column"
          >
            <div class="text-h3">Footer</div>
            <v-divider />
            <v-row class="ma-0 py-2" align="center" justify="center">
              <v-col md="8">
                <v-row>
                  <v-col cols="12" v-for="(value, key) in footer" :key="key">
                    <v-text-field
                      v-model="newFooter[key]"
                      :placeholder="value"
                      density="compact"
                      variant="outlined"
                      hide-details
                    >
                      <template #prepend>
                        <label style="width: 100px; text-align: right"
                          >{{ key }} :
                        </label>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="discardFooterChanges">Discard</v-btn>
              <v-btn :color="colors.info" @click="saveFooterChanges"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-divider vertical />
      <v-col md="1">
        <div
          v-for="doc in sections"
          :key="doc"
          class="cursor-pointer my-3"
          @click="scrollTo(doc)"
        >
          {{ doc }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const sections = ["Colors", "Home", "Service", "Footer"];
const scrollTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};

/* For Color Module */
const colors = computed(() => store.getters["adminSettings/getColor"]);
const excludedFields = ["info", "success", "warning", "error"];
const filteredColors = computed(() => {
  return Object.entries(colors.value)
    .filter(([key]) => !excludedFields.includes(key))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
});

const newColor = reactive({ ...colors.value });
const selectedField = ref(null);
const selectedColor = ref(null);

const selectField = (key) => {
  selectedField.value = key;
  selectedColor.value = newColor[key];
};

const updateSelectedColor = (color) => {
  if (selectedField.value) {
    newColor[selectedField.value] = color;
  }
};

const discardColorChanges = () => {
  Object.assign(newColor, colors.value);
  selectedField.value = null;
  selectedColor.value = null;
};

const saveColorChanges = () => {
  store.dispatch("adminSettings/updateField", {
    module: "colors",
    updates: { ...newColor },
  });
  selectedField.value = null;
  selectedColor.value = null;
};

/* For Home Module */
const home = computed(() => store.getters["adminSettings/getHome"]);
const newHome = ref(home.value.mainPhoto);

const discardHomeChanges = () => {
  newHome.value = home.value.mainPhoto;
};

const saveHomeChanges = () => {
  store.dispatch("adminSettings/updateField", {
    module: "home",
    updates: {
      mainPhoto: newHome.value,
    },
  });
};

/* For Service Module */
const service = computed(() => store.getters["adminSettings/getService"]);
const newService = ref(service.value.mainPhoto);

const discardServiceChanges = () => {
  newService.value = service.value.mainPhoto;
};

const saveServiceChanges = () => {
  store.dispatch("adminSettings/updateField", {
    module: "service",
    updates: {
      mainPhoto: newService.value,
    },
  });
};

/* For Footer Module */
const footer = computed(() => store.getters["adminSettings/getFooter"]);
const newFooter = reactive({ ...footer.value });

const discardFooterChanges = () => {
  Object.assign(newFooter, footer.value);
};

const saveFooterChanges = async () => {
  await store.dispatch("adminSettings/updateField", {
    module: "footer",
    updates: { ...newFooter },
  });
};
</script>

<style scoped></style>
