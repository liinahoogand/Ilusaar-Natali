<script setup lang="js">
defineProps({
  currentStep: Number,
  totalSteps: Number
});
</script>

<template>
  <div class="step-progress">
    <div class="progress-track">
      <div 
        class="progress-fill"
        :style="{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }"
      ></div>
      
      <div 
        v-for="index in totalSteps" 
        :key="index"
        class="step-marker"
        :class="{
          'completed': index < currentStep,
          'active': index === currentStep,
          'upcoming': index > currentStep
        }"
      >
        <span class="step-number">{{ index }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-progress {
  margin: 32px 0;
}

.progress-track {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4px;
  background-color: var(--color-neutral-200);
  border-radius: 2px;
}

.progress-fill {
  position: absolute;
  height: 4px;
  background-color: var(--color-primary-500);
  border-radius: 2px;
  transition: width 0.4s ease;
  z-index: 1;
}

.step-marker {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--color-neutral-300);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.step-number {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-neutral-500);
  transition: color 0.3s ease;
}

.step-marker.completed {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.step-marker.completed .step-number {
  color: white;
}

.step-marker.active {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 4px var(--color-primary-100);
}

.step-marker.active .step-number {
  color: var(--color-primary-500);
  font-weight: 700;
}

@media (prefers-color-scheme: dark) {
  .progress-track {
    background-color: var(--color-neutral-700);
  }
  
  .step-marker {
    background-color: var(--color-neutral-800);
    border-color: var(--color-neutral-600);
  }
  
  .step-marker.active {
    box-shadow: 0 0 0 4px var(--color-primary-900);
  }
}

@media (max-width: 480px) {
  .step-marker {
    width: 28px;
    height: 28px;
  }
  
  .step-number {
    font-size: 12px;
  }
}
</style>