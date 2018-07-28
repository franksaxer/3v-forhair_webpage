<template>
  <div>
    <button class="button is-primary"
            @click="modalOpen=true">

      {{ labels.SUBPAGE_IMPRESSUM_BTN | translate }}
    </button>

    <div :class="['modal', {'is-active': modalOpen}]">
      <div class="modal-background"></div>

      <div class="modal-content content-box">
        <h2 v-if="data.header"
            @click="editText(data, 'header')" v-editable>
            {{ data.header }}
        </h2>
        <p v-if="data.content"
           @click="editText(data, 'content')" v-editable>{{ data.content }}</p>
      </div>

      <button class="modal-close is-large"
              aria-label="close"
              @click="modalOpen=false"></button>
    </div>
  </div>
</template>

<script>
import { DataStoreEntries, loadDataObject } from '../data/DataManager'

export default {
  data() {
    return {
      data: {}, // Placeholder to be replaced with real data loaded when created.
      modalOpen: false // Open the modal or close it. Closed by default.
    }
  },

  async created() {
    // Load the content data to display from with the DataManager.
    this.data = await loadDataObject(DataStoreEntries.dataProtect.key)
  }
}
</script>

<style lang="scss" scoped>
@import '../style/subpages';

button {
  margin: 20px;
}

.content-box {
  p {
    min-width: 100%;
    text-align: center;
  }
}
</style>
