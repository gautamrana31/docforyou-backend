const consultationTypeMap = {
  telemedicine: {
    label: 'Telemedicine',
    description: 'Safe video call from home',
    defaultFee: 45,
  },
  in_clinic: {
    label: 'In Clinic',
    description: 'Visit the medical center',
    defaultFee: 60,
  },
  home_visit: {
    label: 'Home Visit',
    description: 'Doctor comes to you',
    defaultFee: 120,
  },
};

const allowedConsultationTypeIds = Object.keys(consultationTypeMap);

function normalizeConsultationType(type) {
  if (type === 'clinic') {
    return 'in_clinic';
  }

  return type;
}

function createConsultationTypeOption(type, fee) {
  const normalizedType = normalizeConsultationType(type);
  const meta = consultationTypeMap[normalizedType];

  if (!meta) {
    return null;
  }

  return {
    type: normalizedType,
    label: meta.label,
    description: meta.description,
    fee: Number(fee ?? meta.defaultFee),
    available: true,
  };
}

module.exports = {
  allowedConsultationTypeIds,
  consultationTypeMap,
  createConsultationTypeOption,
  normalizeConsultationType,
};
