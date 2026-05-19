<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />

    <Transition name="spinner">
      <div v-if="isLoading" class="page-spinner">
        <div class="page-spinner__ring"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { isLoading } = useLoadingIndicator()
</script>

<style scoped>
.page-spinner {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
}

.page-spinner__ring {
  width: 48px;
  height: 48px;
  border: 4px solid #f0f0f0;
  border-top-color: #E4634F;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.2s ease;
}
.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
}
</style>
