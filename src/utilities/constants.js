import Logo from '/logo.png';

const PAGE_SIZE = 10;

const LOG_TYPES = {
  default: 'default',
  info: 'info',
  error: 'error'
}

const jobOrderStatus = {
  false : ['pending', 'blocked', 'failed', 'forConfirmation'],
  true : ['completed', 'success']
}

const jobOrderChecklist = [
  {
    name: 'simtray',
    label: 'Simtray',
    type: 'accessories'
  },
  {
    name: 'simcard',
    label: 'Sim Card',
    type: 'accessories'
  },
  {
    name: 'memorycard',
    label: 'Memory Card',
    type: 'accessories'
  },
  {
    name: 'spen',
    label: 'Spen',
    type: 'accessories'
  },
  {
    name: 'charger',
    label: 'Charger',
    type: 'accessories'
  },
  {
    name: 'bulgedBattery',
    label: 'Bulged Battery',
    type: 'condition'
  },
  {
    name: 'brokenScreen',
    label: 'Broken Screen',
    type: 'condition'
  },
  {
    name: 'brokenBackcover',
    label: 'Broken Backcover',
    type: 'condition'
  }
];

const EVENT_TYPES = {
  login_success: {
    label: "Login Success",
    category: "Authentication",
    description: "User logged in successfully"
  },
  login_failure: {
    label: "Login Failure",
    category: "Authentication",
    description: "Login attempt failed"
  },
  logout: {
    label: "Logout",
    category: "Authentication",
    description: "User logged out"
  },
  signup_success: {
    label: "Signup Success",
    category: "Authentication",
    description: "New user registered"
  },
  password_reset: {
    label: "Password Reset",
    category: "Authentication",
    description: "Password reset requested or completed"
  },

  error_client: {
    label: "Client Error",
    category: "Errors",
    description: "Frontend error occurred"
  },
  error_server: {
    label: "Server Error",
    category: "Errors",
    description: "Backend error occurred"
  },
  error_validation: {
    label: "Validation Error",
    category: "Errors",
    description: "Form or input validation failed"
  },
  error_network: {
    label: "Network Error",
    category: "Errors",
    description: "Network issue detected"
  },
  unauthorized_access: {
    label: "Unauthorized Access",
    category: "Errors",
    description: "Unauthorized access attempt"
  },

  form_submitted: {
    label: "Form Submitted",
    category: "User Actions",
    description: "A user submitted a form"
  },
  profile_updated: {
    label: "Profile Updated",
    category: "User Actions",
    description: "User updated their profile"
  },
  resource_created: {
    label: "Resource Created",
    category: "User Actions",
    description: "A new resource was created"
  },
  resource_updated: {
    label: "Resource Updated",
    category: "User Actions",
    description: "A resource was updated."
  },
  resource_deleted: {
    label: "Resource Deleted",
    category: "User Actions",
    description: "A resource was deleted"
  },
};

export {
  Logo,
  jobOrderStatus,
  jobOrderChecklist,
  PAGE_SIZE,
  LOG_TYPES, 
  EVENT_TYPES
}