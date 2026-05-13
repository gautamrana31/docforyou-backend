const content = {
  contactUs: {
    title: 'Contact Us',
    subtitle: 'We are here to help with your healthcare questions.',
    email: 'support@docforyou.app',
    phone: '+1 234 567 8900',
    address: '123 Health Street, Sydney, NSW',
    supportHours: 'Monday - Friday, 9:00 AM - 6:00 PM',
    message:
      'For appointment, account, or technical support, contact our team and we will respond as soon as possible.',
  },
  termsAndConditions: {
    title: 'Terms and Conditions',
    lastUpdated: '2026-05-04',
    sections: [
      {
        heading: 'Use of Service',
        body:
          'Docforyou provides tools to connect patients and doctors. Users must provide accurate information while creating accounts and booking appointments.',
      },
      {
        heading: 'Appointments',
        body:
          'Appointment availability, consultation fees, and medical certificate requests are subject to doctor confirmation and applicable policies.',
      },
      {
        heading: 'User Responsibility',
        body:
          'Users are responsible for keeping login credentials secure and for updating profile information when it changes.',
      },
    ],
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: '2026-05-04',
    sections: [
      {
        heading: 'Information We Collect',
        body:
          'We collect profile, contact, health, appointment, and doctor registration information needed to provide app services.',
      },
      {
        heading: 'How We Use Information',
        body:
          'Information is used for account management, appointment booking, doctor discovery, support, and improving the healthcare experience.',
      },
      {
        heading: 'Data Protection',
        body:
          'We use reasonable security practices to protect user data. This dummy policy should be replaced with a legal-approved version before production.',
      },
    ],
  },
};

function getContactUs() {
  return content.contactUs;
}

function getTermsAndConditions() {
  return content.termsAndConditions;
}

function getPrivacyPolicy() {
  return content.privacyPolicy;
}

module.exports = {
  getContactUs,
  getPrivacyPolicy,
  getTermsAndConditions,
};
