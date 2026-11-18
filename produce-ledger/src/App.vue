<script setup>
import AppHeader from './components/AppHeader.vue'
import WelcomeView from './components/WelcomeView.vue'
import { currentUser } from './store/ledger'
</script>

<template>
  <AppHeader v-if="currentUser" />
  <router-view v-if="currentUser" />
  <WelcomeView v-else />
</template>
