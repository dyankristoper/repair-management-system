import Logo from '/logo.png';

const PAGE_SIZE = 4;

const LOG_TYPES = {
  default: 'default',
  info: 'info',
  error: 'error'
}

const jobOrderStatus = {
  false : ['pending', 'blocked'],
  true : ['completed']
}

export {
  Logo,
  jobOrderStatus,
  PAGE_SIZE,
  LOG_TYPES
}