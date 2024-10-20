// Load fields from JSON file
let fields = [];
fetch('fields.json')
  .then(response => response.json())
  .then(data => {
    fields = data;
  });

const registrationForm = document.getElementById('registration-form');
const modal = document.getElementById('modal');
const startExtraFormButton = document.getElementById('start-extra-form');
const infiniteForm = document.getElementById('infinite-form');

// Registration form submission handler
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  modal.style.display = 'block';
});

// Handler for the "Continue" button in the modal window
startExtraFormButton.addEventListener('click', function() {
  modal.style.display = 'none';
  registrationForm.classList.add('hidden');
  infiniteForm.classList.remove('hidden');
  initInfiniteScroll();
});

// Initialize infinite scroll
function initInfiniteScroll() {
  let fieldIndex = 0;

  const loadMoreFields = () => {
    for (let i = 0; i < 20; i++) { // Load 20 fields at a time
      if (fieldIndex >= fields.length) {
        fieldIndex = 0;
      }
      addField(fields[fieldIndex]);
      fieldIndex++;
    }
  };

  // Add initial fields
  loadMoreFields();

  // Page scroll handler
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadMoreFields();
    }
  });
}

// Function for adding a field to a form
function addField(fieldData) {
  const label = document.createElement('label');
  label.textContent = fieldData.question;

  let input;
  switch (fieldData.type) {
    case 'text':
      input = document.createElement('input');
      input.type = 'text';
      break;
    case 'number':
      input = document.createElement('input');
      input.type = 'number';
      break;
    case 'select':
      input = document.createElement('select');
      fieldData.options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        input.appendChild(option);
      });
      break;
    default:
      input = document.createElement('input');
      input.type = 'text';
  }

  input.name = `field-${Date.now()}-${Math.random()}`;
  input.required = true;

  label.appendChild(input);
  infiniteForm.appendChild(label);
}
