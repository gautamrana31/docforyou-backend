const consultationTypes = [
  {
    id: 'telemedicine',
    name: 'Telemedicine',
    description: 'Safe video call from home',
    fee: 45,
    available: true,
  },
  {
    id: 'in_clinic',
    name: 'In Clinic',
    description: 'Visit the medical center',
    fee: 60,
    available: true,
  },
  {
    id: 'home_visit',
    name: 'Home Visit',
    description: 'Doctor comes to you',
    fee: 120,
    available: true,
  },
];

function getConsultationTypes() {
  return consultationTypes;
}

module.exports = { getConsultationTypes };
