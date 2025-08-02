<template>
  <form 
    :class="[
      'form',
      customClass
    ]"
    @submit="onSubmit"
    @reset="onReset"
    novalidate
  >
    <!-- Form header -->
    <div v-if="showHeader" class="form-header">
      <h2 
        v-if="title"
        :class="[
          'form-title',
          titleClass
        ]"
      >
        {{ title }}
      </h2>
      <p 
        v-if="description"
        :class="[
          'form-description',
          descriptionClass
        ]"
      >
        {{ description }}
      </p>
    </div>
    
    <!-- Form fields -->
    <div 
      :class="[
        'form-fields',
        {
          'form-fields-grid': fieldsLayout === 'grid',
          'form-fields-grid-2': fieldsLayout === 'grid' && gridCols === 2,
          'form-fields-grid-3': fieldsLayout === 'grid' && gridCols === 3,
          'form-fields-inline': fieldsLayout === 'inline'
        },
        fieldsClass
      ]"
    >
      <slot />
    </div>
    
    <!-- Global form errors -->
    <div 
      v-if="formErrors.length > 0" 
      class="form-errors"
    >
      <div class="flex">
        <div class="form-errors-content">
          <h3 class="form-errors-title">
            {{ $t('form.errorsTitle') }}
          </h3>
          <div class="form-errors-list">
            <ul class="form-errors-items">
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
      v-if="showSuccess && successMessage"
      class="form-success"
    >
      <div class="flex">
        <div class="form-success-content">
          <p class="form-success-message">
            {{ successMessage }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Form actions -->
    <div 
      v-if="showActions"
      :class="[
        'form-actions',
        {
          'form-actions-center': actionsAlignment === 'center',
          'form-actions-right': actionsAlignment === 'right',
          'form-actions-between': actionsAlignment === 'between'
        },
        actionsClass
      ]"
    >
      <!-- Cancel button -->
      <button
        v-if="showCancel"
        type="button"
        :disabled="isSubmitting"
        :class="[
          'form-button form-button-cancel',
          cancelButtonClass
        ]"
        @click="onCancel"
      >
        {{ cancelText || $t('form.cancel') }}
      </button>
      
      <!-- Reset button -->
      <button
        v-if="showReset"
        type="reset"
        :disabled="isSubmitting"
        :class="[
          'form-button form-button-reset',
          resetButtonClass
        ]"
      >
        {{ resetText || $t('form.reset') }}
      </button>
      
      <!-- Submit button -->
      <button
        type="submit"
        :disabled="isSubmitting || !isValid"
        :class="[
          'form-button form-button-submit',
          submitButtonClass
        ]"
      >
        <span 
          v-if="isSubmitting" 
          class="form-loading-spinner"
        />
        {{ isSubmitting ? (submittingText || $t('form.submitting')) : (submitText || $t('form.submit')) }}
      </button>
    </div>
    
    <!-- Form footer -->
    <div 
      v-if="footerText"
      :class="[
        'form-footer',
        footerClass
      ]"
    >
      {{ footerText }}
    </div>
  </form>
</template>

<script>
export default {
  name: 'ShadcnForm',
  props: {
    content: { type: Object, required: true },
    wwElementState: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['update:content:effect', 'update:content', 'element-event'],
  data() {
    return {
      formFields: new Map(),
      isSubmitting: false,
      showSuccess: false,
      formErrors: []
    }
  },
  computed: {
    isValid() {
      if (this.formFields.size === 0) return true
      
      for (const [, field] of this.formFields) {
        if (field.required && !field.value) return false
        if (field.errors && field.errors.length > 0) return false
      }
      return true
    },

    formData() {
      const data = {}
      for (const [name, field] of this.formFields) {
        data[name] = field.value
      }
      return data
    },

    customClass() {
      return this.content.customClass || ''
    },

    showHeader() {
      return this.content.showHeader !== false
    },

    title() {
      return this.content.title
    },

    titleClass() {
      return this.content.titleClass || ''
    },

    description() {
      return this.content.description
    },

    descriptionClass() {
      return this.content.descriptionClass || ''
    },

    fieldsLayout() {
      return this.content.fieldsLayout || 'default'
    },

    gridCols() {
      return this.content.gridCols || 2
    },

    fieldsClass() {
      return this.content.fieldsClass || ''
    },

    successMessage() {
      return this.content.successMessage
    },

    showActions() {
      return this.content.showActions !== false
    },

    actionsAlignment() {
      return this.content.actionsAlignment || 'left'
    },

    actionsClass() {
      return this.content.actionsClass || ''
    },

    showCancel() {
      return this.content.showCancel
    },

    cancelText() {
      return this.content.cancelText
    },

    cancelButtonClass() {
      return this.content.cancelButtonClass || ''
    },

    showReset() {
      return this.content.showReset
    },

    resetText() {
      return this.content.resetText
    },

    resetButtonClass() {
      return this.content.resetButtonClass || ''
    },

    submitText() {
      return this.content.submitText
    },

    submittingText() {
      return this.content.submittingText
    },

    submitButtonClass() {
      return this.content.submitButtonClass || ''
    },

    footerText() {
      return this.content.footerText
    },

    footerClass() {
      return this.content.footerClass || ''
    },

    showSuccessMessage() {
      return this.content.showSuccessMessage
    },

    successDuration() {
      return this.content.successDuration || 3000
    },

    resetOnSuccess() {
      return this.content.resetOnSuccess
    },

    autoFocus() {
      return this.content.autoFocus
    },

    validations() {
      return this.content.validations
    }
  },
  provide() {
    return {
      form: {
        registerField: this.registerField,
        unregisterField: this.unregisterField,
        updateField: this.updateField,
        validateField: this.validateField,
        setFieldValue: this.setFieldValue,
        setFieldError: this.setFieldError
      }
    }
  },
  methods: {
    // Import utility function
    cn(...inputs) {
      return inputs.filter(Boolean).join(' ')
    },

    // Form field registration
    registerField(name, fieldData) {
      this.formFields.set(name, fieldData)
    },

    unregisterField(name) {
      this.formFields.delete(name)
    },

    updateField(name, updates) {
      const field = this.formFields.get(name)
      if (field) {
        this.formFields.set(name, { ...field, ...updates })
        this.$emit('element-event', {
          type: 'change',
          value: { field: name, value: updates.value, formData: this.formData }
        })
      }
    },

    // Validation
    validateField(name) {
      const field = this.formFields.get(name)
      if (!field) return true
      
      const errors = []
      
      // Required validation
      if (field.required && !field.value) {
        errors.push(this.$t ? this.$t('form.validation.required') : 'This field is required')
      }
      
      // Custom validations
      if (field.validations && field.value) {
        field.validations.forEach(validation => {
          if (!validation.test(field.value)) {
            errors.push(validation.message)
          }
        })
      }
      
      this.updateField(name, { errors })
      return errors.length === 0
    },

    validateForm() {
      let isFormValid = true
      const globalErrors = []
      
      for (const [name] of this.formFields) {
        if (!this.validateField(name)) {
          isFormValid = false
        }
      }
      
      // Custom form-level validations
      if (this.validations) {
        this.validations.forEach(validation => {
          if (!validation.test(this.formData)) {
            globalErrors.push(validation.message)
            isFormValid = false
          }
        })
      }
      
      this.formErrors = globalErrors
      
      if (isFormValid) {
        this.$emit('element-event', {
          type: 'valid',
          value: this.formData
        })
      } else {
        this.$emit('element-event', {
          type: 'invalid',
          value: { formData: this.formData, errors: globalErrors }
        })
      }
      
      return isFormValid
    },

    // Event handlers
    async onSubmit(event) {
      event.preventDefault()
      
      if (this.isSubmitting) return
      
      if (!this.validateForm()) {
        return
      }
      
      this.isSubmitting = true
      this.showSuccess = false
      
      try {
        this.$emit('element-event', {
          type: 'submit',
          domEvent: event,
          value: {
            data: this.formData,
            formElement: event.target
          }
        })
        
        if (this.showSuccessMessage) {
          this.showSuccess = true
          setTimeout(() => {
            this.showSuccess = false
          }, this.successDuration)
        }
        
        if (this.resetOnSuccess) {
          this.onReset()
        }
      } catch (error) {
        console.error('Form submission error:', error)
        this.formErrors = [error.message || (this.$t ? this.$t('form.submission.error') : 'Submission error')]
      } finally {
        this.isSubmitting = false
      }
    },

    onReset() {
      for (const [name] of this.formFields) {
        this.updateField(name, { value: '', errors: [] })
      }
      this.formErrors = []
      this.showSuccess = false
      this.$emit('element-event', {
        type: 'reset',
        value: this.formData
      })
    },

    onCancel() {
      this.$emit('element-event', {
        type: 'cancel',
        value: this.formData
      })
    },

    // Public methods
    setFieldValue(name, value) {
      this.updateField(name, { value })
    },

    setFieldError(name, errors) {
      this.updateField(name, { errors: Array.isArray(errors) ? errors : [errors] })
    },

    clearErrors() {
      for (const [name] of this.formFields) {
        this.updateField(name, { errors: [] })
      }
      this.formErrors = []
    },

    submit() {
      const form = this.$el
      if (form && form.requestSubmit) {
        form.requestSubmit()
      }
    }
  },
  mounted() {
    if (this.autoFocus) {
      const firstInput = document.querySelector('form input, form select, form textarea')
      if (firstInput) {
        firstInput.focus()
      }
    }
  }
}
</script>

<style>
/* SHADCN UI FORM - WeWeb Compatible */

/* Form base styles with direct colors */
form.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

form.form .form-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

form.form .form-title {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.025em;
  color: #0f172a !important;
  line-height: 1;
  margin: 0;
}

form.form .form-description {
  font-size: 0.875rem !important;
  color: #64748b !important;
  margin: 0;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-fields-grid {
  display: grid;
  gap: 1rem;
}

.form-fields-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-fields-grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.form-fields-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-errors {
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--destructive) / 0.5);
  background-color: hsl(var(--destructive) / 0.1);
  padding: 1rem;
}

.form-errors .flex {
  display: flex;
}

.form-errors-content {
  margin-left: 0.75rem;
}

.form-errors-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--destructive));
}

.form-errors-list {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--destructive));
}

.form-errors-items {
  list-style-type: disc;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-success {
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(142 76% 36% / 0.5);
  background-color: hsl(142 76% 96%);
  padding: 1rem;
}

.dark .form-success {
  background-color: hsl(142 76% 36% / 0.2);
}

.form-success .flex {
  display: flex;
}

.form-success-content {
  margin-left: 0.75rem;
}

.form-success-message {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(142 76% 20%);
}

.dark .form-success-message {
  color: hsl(142 76% 80%);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
}

.form-actions-center {
  justify-content: center;
}

.form-actions-right {
  justify-content: flex-end;
}

.form-actions-between {
  justify-content: space-between;
}

form.form .form-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  transition: all 0.2s;
  outline: none;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid transparent;
}

form.form .form-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #0f172a, 0 0 0 4px #ffffff !important;
}

.form-button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.form-button-cancel,
.form-button-reset {
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

.form-button-cancel:hover,
.form-button-reset:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.form-button-submit {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
}

.form-button-submit:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.form-loading-spinner {
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
  animation: spin 1s linear infinite;
  border-radius: 9999px;
  border: 2px solid transparent;
  border-bottom-color: currentColor;
}

.form-footer {
  text-align: center;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

/* Animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 