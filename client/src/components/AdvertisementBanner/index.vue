<template>
  <banner>
    <template #leftColumn>
      <p class="title is-4 has-light-text">
        The Art and Science of<br>Flower and Plan Essences
      </p>
      <commerce-button url="https://www.aveda.de/locator/get_the_facts.tmpl?SalonID=6480" />
    </template>
    <template #rightColumn>
      <message class="margin-auto" url="https://www.aveda.de/salon/3v-forhair" />
    </template>
  </banner>
</template>

<script>
import Banner from './Banner.vue'
import CommerceButton from './CommerceButton.vue'
import Message from './Message.vue'

export default {
  name: 'advertisement-banner',
  components: { Banner, CommerceButton, Message }
}
</script>
