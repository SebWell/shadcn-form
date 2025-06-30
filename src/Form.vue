<template>
  <form 
    :class="cn(
      'space-y-6',
      content.customClass
    )"
    @submit="onSubmit"
    @reset="onReset"
    novalidate
  >
    <!-- Form header -->
    <div v-if="content.showHeader" class="space-y-2">
      <h2 
        v-if="content.title"
        :class="cn(
          'text-2xl font-semibold tracking-tight',
          content.titleClass
        )"
      >
        {{ content.title }}
      </h2>
      <p 
        v-if="content.description"
        :class="cn(
          'text-sm text-muted-foreground',
          content.descriptionClass
        )"
      >
        {{ content.description }}
      </p>
    </div>
    
    <!-- Form fields -->
    <div 
      :class="cn(
        'space-y-4',
        content.fieldsLayout === 'grid' && 'grid gap-4',
        content.fieldsLayout === 'grid' && content.gridCols === 2 && 'grid-cols-2',
        content.fieldsLayout === 'grid' && content.gridCols === 3 && 'grid-cols-3',
        content.fieldsLayout === 'inline' && 'flex flex-wrap gap-4',
        content.fieldsClass
      )"
    >
      <slot />
    </div>
    
    <!-- Global form errors -->
    <div 
      v-if="formErrors.length > 0" 
      class="rounded-md border border-destructive/50 bg-destructive/10 p-4"
    >
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-destructive">
            {{ $t('form.errorsTitle') }}
          </h3>
          <div class="mt-2 text-sm text-destructive">
            <ul class="list-disc space-y-1 pl-5">
              <li v-for="error in formErrors" :key="error">
                {{ error }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success message -->
    <div 
      v-if="showSuccess && content.successMessage"
      class="rounded-md border border-green-500/50 bg-green-50 p-4 dark:bg-green-900/20"
    >
      <div class="flex">
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800 dark:text-green-200">
            {{ content.successMessage }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Form actions -->
    <div 
      v-if="content.showActions"
      :class="cn(
        'flex gap-3',
        content.actionsAlignment === 'center' && 'justify-center',
        content.actionsAlignment === 'right' && 'justify-end',
        content.actionsAlignment === 'between' && 'justify-between',
        content.actionsClass
      )"
    >
      <!-- Cancel button -->
      <button
        v-if="content.showCancel"
        type="button"
        :disabled="isSubmitting"
        :class="cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
          content.cancelButtonClass
        )"
        @click="onCancel"
      >
        {{ content.cancelText || $t('form.cancel') }}
      </button>
      
      <!-- Reset button -->
      <button
        v-if="content.showReset"
        type="reset"
        :disabled="isSubmitting"
        :class="cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
          content.resetButtonClass
        )"
      >
        {{ content.resetText || $t('form.reset') }}
      </button>
      
      <!-- Submit button -->
      <button
        type="submit"
        :disabled="isSubmitting || !isValid"
        :class="cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
          content.submitButtonClass
        )"
      >
        <span 
          v-if="isSubmitting" 
          class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"
        />
        {{ isSubmitting ? (content.submittingText || $t('form.submitting')) : (content.submitText || $t('form.submit')) }}
      </button>
    </div>
    
    <!-- Form footer -->
    <div 
      v-if="content.footerText"
      :class="cn(
        'text-center text-sm text-muted-foreground',
        content.footerClass
      )"
    >
      {{ content.footerText }}
    </div>
  </form>
</template>

<script setup>
import { ref, computed, provide, onMounted } from 'vue'
import { cn } from './cn.js'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'reset', 'cancel', 'change', 'valid', 'invalid'])

// Reactive data
const formFields = ref(new Map())
const isSubmitting = ref(false)
const showSuccess = ref(false)
const formErrors = ref([])

// Computed properties
const isValid = computed(() => {
  if (formFields.value.size === 0) return true
  
  for (const [, field] of formFields.value) {
    if (field.required && !field.value) return false
    if (field.errors && field.errors.length > 0) return false
  }
  return true
})

const formData = computed(() => {
  const data = {}
  for (const [name, field] of formFields.value) {
    data[name] = field.value
  }
  return data
})

// Form field registration
const registerField = (name, fieldData) => {
  formFields.value.set(name, fieldData)
}

const unregisterField = (name) => {
  formFields.value.delete(name)
}

const updateField = (name, updates) => {
  const field = formFields.value.get(name)
  if (field) {
    formFields.value.set(name, { ...field, ...updates })
    emit('change', { field: name, value: updates.value, formData: formData.value })
  }
}

// Validation
const validateField = (name) => {
  const field = formFields.value.get(name)
  if (!field) return true
  
  const errors = []
  
  // Required validation
  if (field.required && !field.value) {
    errors.push($t('form.validation.required'))
  }
  
  // Custom validations
  if (field.validations && field.value) {
    field.validations.forEach(validation => {
      if (!validation.test(field.value)) {
        errors.push(validation.message)
      }
    })
  }
  
  updateField(name, { errors })
  return errors.length === 0
}

const validateForm = () => {
  let isFormValid = true
  const globalErrors = []
  
  for (const [name] of formFields.value) {
    if (!validateField(name)) {
      isFormValid = false
    }
  }
  
  // Custom form-level validations
  if (content.value?.validations) {
    content.value.validations.forEach(validation => {
      if (!validation.test(formData.value)) {
        globalErrors.push(validation.message)
        isFormValid = false
      }
    })
  }
  
  formErrors.value = globalErrors
  
  if (isFormValid) {
    emit('valid', formData.value)
  } else {
    emit('invalid', { formData: formData.value, errors: globalErrors })
  }
  
  return isFormValid
}

// Event handlers
const onSubmit = async (event) => {
  event.preventDefault()
  
  if (isSubmitting.value) return
  
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  showSuccess.value = false
  
  try {
    await emit('submit', {
      data: formData.value,
      formElement: event.target
    })
    
    if (content.value?.showSuccessMessage) {
      showSuccess.value = true
      setTimeout(() => {
        showSuccess.value = false
      }, content.value?.successDuration || 3000)
    }
    
    if (content.value?.resetOnSuccess) {
      onReset()
    }
  } catch (error) {
    console.error('Form submission error:', error)
    formErrors.value = [error.message || $t('form.submission.error')]
  } finally {
    isSubmitting.value = false
  }
}

const onReset = () => {
  for (const [name] of formFields.value) {
    updateField(name, { value: '', errors: [] })
  }
  formErrors.value = []
  showSuccess.value = false
  emit('reset')
}

const onCancel = () => {
  emit('cancel')
}

// Public methods
const setFieldValue = (name, value) => {
  updateField(name, { value })
}

const setFieldError = (name, errors) => {
  updateField(name, { errors: Array.isArray(errors) ? errors : [errors] })
}

const clearErrors = () => {
  for (const [name] of formFields.value) {
    updateField(name, { errors: [] })
  }
  formErrors.value = []
}

const submit = () => {
  const form = event.target.closest('form')
  if (form) {
    form.requestSubmit()
  }
}

// Provide form context to child components
provide('form', {
  registerField,
  unregisterField,
  updateField,
  validateField,
  setFieldValue,
  setFieldError
})

// Lifecycle
onMounted(() => {
  if (content.value?.autoFocus) {
    const firstInput = document.querySelector('form input, form select, form textarea')
    if (firstInput) {
      firstInput.focus()
    }
  }
})

// Expose methods
defineExpose({
  validateForm,
  setFieldValue,
  setFieldError,
  clearErrors,
  submit,
  formData,
  isValid
})
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 