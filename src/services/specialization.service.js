const specializations = [
  'General Physician',
  'Cardiologist',
  'Dentist',
  'Dermatologist',
  'Pediatrician',
  'Gynecologist',
  'Orthopedic',
  'Neurologist',
  'Psychiatrist',
  'ENT Specialist',
  'Ophthalmologist',
  'Urologist',
  'Gastroenterologist',
  'Endocrinologist',
  'Pulmonologist',
  'Nephrologist',
  'Oncologist',
  'Physiotherapist',
  'Dietitian',
  'General Surgeon',
];

function getSpecializations() {
  return specializations.map((name) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name,
  }));
}

module.exports = { getSpecializations };
