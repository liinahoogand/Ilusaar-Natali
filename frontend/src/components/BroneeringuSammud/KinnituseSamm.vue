<script setup lang="js">

// defineProps stringide massiivina
const props = defineProps(['bookingData', 'formattedDate']);

// defineEmits stringide massiivina
const emit = defineEmits(['submit', 'prev']);
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Kinnita broneering</h2>
    <p class="step-description">Palun kontrolli broneeringu andmed</p>

    <div class="confirmation-box">
      <div class="confirmation-item">
        <span class="confirmation-label">Asukoht:</span>
        <span class="confirmation-value">{{ props.bookingData.location }}</span>
      </div>

      <div class="confirmation-item">
        <span class="confirmation-label">Teenus:</span>
        <span class="confirmation-value">{{ props.bookingData.service }}</span>
      </div>

      <div class="confirmation-item">
        <span class="confirmation-label">Kuupäev:</span>
        <span class="confirmation-value">{{ props.formattedDate }}</span>
      </div>

      <div class="confirmation-item">
        <span class="confirmation-label">Kellaaeg:</span>
        <span class="confirmation-value">{{ props.bookingData.time }}</span>
      </div>

      <div class="confirmation-item">
        <span class="confirmation-label">Nimi:</span>
        <span class="confirmation-value">{{ props.bookingData.name }}</span>
      </div>
    </div>

    <div class="terms">
      <p>Broneeringu kinnitamisel nõustud meie 
        <a href="#" class="link">teenuste tingimustega</a>.
      </p>
    </div>

    <div class="button-group">
      <button class="secondary" @click="emit('prev')">
        <span class="button-icon">←</span>
        Tagasi
      </button>

      <button class="submit-button" @click="emit('submit')">
        <span class="submit-icon">✓</span>
        Kinnita broneering
      </button>
    </div>
  </div>
</template>


<style scoped>
.step-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step-title {
  font-size: 1.5rem;
  color: var(--color-neutral-900);
  margin-bottom: 0;
}

.step-description {
  color: var(--color-neutral-500);
  margin-top: -16px;
}

.confirmation-box {
  background-color: var(--color-neutral-50);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid var(--color-neutral-200);
}

.confirmation-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-neutral-200);
}

.confirmation-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.confirmation-label {
  font-weight: 500;
  color: var(--color-neutral-600);
}

.confirmation-value {
  font-weight: 600;
  color: var(--color-neutral-900);
}

.terms {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  text-align: center;
}

.link {
  color: var(--color-primary-600);
  text-decoration: underline;
  transition: color 0.2s ease;
}

.link:hover {
  color: var(--color-primary-800);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.submit-button {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
  justify-content: center;
  background-color: var(--color-success-500);
}

.submit-button:hover {
  background-color: var(--color-success-500);
  filter: brightness(0.9);
}

.submit-icon {
  font-size: 1.125rem;
}

.button-icon {
  transition: transform 0.2s ease;
}

button.secondary:hover .button-icon {
  transform: translateX(-4px);
}

@media (prefers-color-scheme: dark) {
  .step-title {
    color: var(--color-neutral-100);
  }
  
  .confirmation-box {
    background-color: var(--color-neutral-700);
    border-color: var(--color-neutral-600);
  }
  
  .confirmation-item {
    border-bottom-color: var(--color-neutral-600);
  }
  
  .confirmation-label {
    color: var(--color-neutral-400);
  }
  
  .confirmation-value {
    color: var(--color-neutral-100);
  }
  
  .link {
    color: var(--color-primary-400);
  }
  
  .link:hover {
    color: var(--color-primary-300);
  }
}
</style>