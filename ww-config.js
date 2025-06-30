export default {
  editor: {
    label: {
      en: 'Form',
      fr: 'Formulaire'
    },
    icon: 'edit-3',
    bubble: {
      icon: 'edit-3'
    }
  },
  triggerEvents: [
    { name: 'submit', label: { en: 'On submit', fr: 'Lors de la soumission' } },
    { name: 'reset', label: { en: 'On reset', fr: 'Lors de la réinitialisation' } },
    { name: 'cancel', label: { en: 'On cancel', fr: 'Lors de l\'annulation' } },
    { name: 'change', label: { en: 'On field change', fr: 'Lors du changement de champ' } },
    { name: 'valid', label: { en: 'On valid', fr: 'Lors de la validation' } },
    { name: 'invalid', label: { en: 'On invalid', fr: 'Lors de l\'invalidation' } }
  ],
  properties: {
    // Header
    showHeader: {
      label: { en: 'Show header', fr: 'Afficher l\'en-tête' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'header'
    },
    title: {
      label: { en: 'Title', fr: 'Titre' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'header'
    },
    description: {
      label: { en: 'Description', fr: 'Description' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'header'
    },
    
    // Layout
    fieldsLayout: {
      label: { en: 'Fields layout', fr: 'Disposition des champs' },
      type: 'TextSelect',
      options: {
        choices: [
          { value: 'stack', label: { en: 'Stack', fr: 'Empilé' } },
          { value: 'grid', label: { en: 'Grid', fr: 'Grille' } },
          { value: 'inline', label: { en: 'Inline', fr: 'En ligne' } }
        ]
      },
      defaultValue: 'stack',
      bindable: true,
      section: 'layout'
    },
    gridCols: {
      label: { en: 'Grid columns', fr: 'Colonnes de grille' },
      type: 'TextSelect',
      options: {
        choices: [
          { value: 2, label: '2' },
          { value: 3, label: '3' }
        ]
      },
      defaultValue: 2,
      bindable: true,
      section: 'layout'
    },
    
    // Actions
    showActions: {
      label: { en: 'Show actions', fr: 'Afficher les actions' },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
      section: 'actions'
    },
    actionsAlignment: {
      label: { en: 'Actions alignment', fr: 'Alignement des actions' },
      type: 'TextSelect',
      options: {
        choices: [
          { value: 'left', label: { en: 'Left', fr: 'Gauche' } },
          { value: 'center', label: { en: 'Center', fr: 'Centre' } },
          { value: 'right', label: { en: 'Right', fr: 'Droite' } },
          { value: 'between', label: { en: 'Space between', fr: 'Espacement' } }
        ]
      },
      defaultValue: 'right',
      bindable: true,
      section: 'actions'
    },
    
    // Submit button
    submitText: {
      label: { en: 'Submit text', fr: 'Texte de soumission' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'actions'
    },
    submittingText: {
      label: { en: 'Submitting text', fr: 'Texte de soumission en cours' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'actions'
    },
    
    // Cancel button
    showCancel: {
      label: { en: 'Show cancel button', fr: 'Afficher le bouton annuler' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'actions'
    },
    cancelText: {
      label: { en: 'Cancel text', fr: 'Texte d\'annulation' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'actions'
    },
    
    // Reset button
    showReset: {
      label: { en: 'Show reset button', fr: 'Afficher le bouton réinitialiser' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'actions'
    },
    resetText: {
      label: { en: 'Reset text', fr: 'Texte de réinitialisation' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'actions'
    },
    
    // Messages
    successMessage: {
      label: { en: 'Success message', fr: 'Message de succès' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'messages'
    },
    showSuccessMessage: {
      label: { en: 'Show success message', fr: 'Afficher le message de succès' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'messages'
    },
    successDuration: {
      label: { en: 'Success message duration (ms)', fr: 'Durée du message de succès (ms)' },
      type: 'Number',
      defaultValue: 3000,
      bindable: true,
      section: 'messages'
    },
    
    // Behavior
    autoFocus: {
      label: { en: 'Auto focus first field', fr: 'Focus automatique sur le premier champ' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'behavior'
    },
    resetOnSuccess: {
      label: { en: 'Reset on success', fr: 'Réinitialiser en cas de succès' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'behavior'
    },
    
    // Footer
    footerText: {
      label: { en: 'Footer text', fr: 'Texte de pied de page' },
      type: 'Text',
      defaultValue: '',
      bindable: true,
      multiLang: true,
      section: 'footer'
    },
    
    // Style classes
    customClass: {
      label: { en: 'Custom CSS class', fr: 'Classe CSS personnalisée' },
      type: 'Text',
      section: 'style'
    },
    titleClass: {
      label: { en: 'Title CSS class', fr: 'Classe CSS du titre' },
      type: 'Text',
      section: 'style'
    },
    descriptionClass: {
      label: { en: 'Description CSS class', fr: 'Classe CSS de la description' },
      type: 'Text',
      section: 'style'
    },
    fieldsClass: {
      label: { en: 'Fields CSS class', fr: 'Classe CSS des champs' },
      type: 'Text',
      section: 'style'
    },
    actionsClass: {
      label: { en: 'Actions CSS class', fr: 'Classe CSS des actions' },
      type: 'Text',
      section: 'style'
    },
    submitButtonClass: {
      label: { en: 'Submit button CSS class', fr: 'Classe CSS du bouton de soumission' },
      type: 'Text',
      section: 'style'
    },
    cancelButtonClass: {
      label: { en: 'Cancel button CSS class', fr: 'Classe CSS du bouton d\'annulation' },
      type: 'Text',
      section: 'style'
    },
    resetButtonClass: {
      label: { en: 'Reset button CSS class', fr: 'Classe CSS du bouton de réinitialisation' },
      type: 'Text',
      section: 'style'
    },
    footerClass: {
      label: { en: 'Footer CSS class', fr: 'Classe CSS du pied de page' },
      type: 'Text',
      section: 'style'
    }
  },
  
  defaultContent: {
    showHeader: false,
    title: '',
    description: '',
    fieldsLayout: 'stack',
    gridCols: 2,
    showActions: true,
    actionsAlignment: 'right',
    submitText: '',
    submittingText: '',
    showCancel: false,
    cancelText: '',
    showReset: false,
    resetText: '',
    successMessage: '',
    showSuccessMessage: false,
    successDuration: 3000,
    autoFocus: false,
    resetOnSuccess: false,
    footerText: '',
    customClass: '',
    titleClass: '',
    descriptionClass: '',
    fieldsClass: '',
    actionsClass: '',
    submitButtonClass: '',
    cancelButtonClass: '',
    resetButtonClass: '',
    footerClass: ''
  },
  
  settingsOptions: {
    autoByContent: true
  },
  
  actions: [
    {
      label: { en: 'Submit form', fr: 'Soumettre le formulaire' },
      action: 'submit'
    },
    {
      label: { en: 'Reset form', fr: 'Réinitialiser le formulaire' },
      action: 'onReset'
    },
    {
      label: { en: 'Clear errors', fr: 'Effacer les erreurs' },
      action: 'clearErrors'
    }
  ]
} 