import React, { useState, useCallback } from 'react';
import './App.css';

const stepperConfig = {
  id: 'checkout-flow',

  title: 'User Checkout Process',

  buttons: {
    previous: {
      label: 'Back',
      visible: true,
    },
    next: {
      label: 'Next',
      visible: true,
    },
    finish: {
      label: 'Finish',
    },
  },

  totalSteps: 3,

  currentStep: 0,

  style: {
    border: '1px solid #ccc',
    backgroundColor: 'skyblue',
    padding: '20px',
    borderRadius: '8px',
  },

  steps: [
    {
      id: 'user-details',
      title: 'User Details',
      fields: [
        {
          id: 'name',
          type: 'input',
          label: 'Full Name',
          placeholder: 'Enter name',
          inputType: 'text',
          required: true,
        },
        {
          id: 'email',
          type: 'input',
          label: 'Email',
          inputType: 'email',
          required: true,
        },
      ],
    },

    {
      id: 'shipping',
      title: 'Shipping Details',
      fields: [
        {
          id: 'address',
          type: 'textarea',
          label: 'Address',
          required: true,
        },
        {
          id: 'country',
          type: 'select',
          label: 'Country',
          required: true,
          options: [
            {
              label: 'India',
              value: 'india',
            },
            {
              label: 'USA',
              value: 'usa',
            },
          ],
        },
      ],
    },

    {
      id: 'payment',
      title: 'Payment',
      fields: [
        {
          id: 'paymentMethod',
          type: 'radio',
          label: 'Choose Payment',
          required: true,
          options: [
            {
              label: 'Card',
              value: 'card',
            },
            {
              label: 'UPI',
              value: 'upi',
            },
          ],
        },
      ],
    },
  ],
};

const RenderField = ({ field, value, handleChange }) => {
  switch (field.type) {
    case 'input':
      return (
        <input
          type={field.inputType}
          value={value || ''}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      );

    case 'textarea':
      return (
        <textarea
          value={value || ''}
          required={field.required}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      );

    case 'select':
      return (
        <select
          value={value || ''}
          required={field.required}
          onChange={(e) => handleChange(field.id, e.target.value)}
        >
          <option value="">Select</option>

          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case 'radio':
      return (
        <>
          {field.options.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name={field.id}
                required={field.required}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />

              {option.label}
            </label>
          ))}
        </>
      );

    default:
      return null;
  }
};

const RenderStepperForm = ({ step, formData, handleChange }) => {
  return (
    <div>
      <h3>{step.title}</h3>

      {step.fields.map((field) => (
        <div
          key={field.id}
          style={{
            marginBottom: 20,
          }}
        >
          <label>{field.label}</label>

          <RenderField
            field={field}
            value={formData[field.id]}
            handleChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

function App() {
  const [currentStep, setCurrentStep] = useState(stepperConfig.currentStep);

  const [formData, setFormData] = useState({});

  const current = stepperConfig.steps[currentStep];

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const nextStep = () => {
    if (currentStep < stepperConfig.totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
    console.log('Submitted', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="stepper_parent">
        <div style={stepperConfig.style}>
          <h2>{stepperConfig.title}</h2>

          <span>
            {currentStep + 1}/{stepperConfig.totalSteps}
          </span>
        </div>

        <RenderStepperForm
          step={current}
          formData={formData}
          handleChange={handleChange}
        />

        <div className="buttons">
          {currentStep > 0 && (
            <button type="button" onClick={previousStep}>
              {stepperConfig.buttons.previous.label}
            </button>
          )}

          {currentStep === stepperConfig.totalSteps - 1 ? (
            <button type="submit">{stepperConfig.buttons.finish.label}</button>
          ) : (
            <button type="submit">{stepperConfig.buttons.next.label}</button>
          )}
        </div>
      </div>
    </form>
  );
}

export default App;
