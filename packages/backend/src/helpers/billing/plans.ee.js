import appConfig from '../../config/app.js';

const testPlans = [
  {
    name: '10k - monthly',
    limit: 10000,
    quota: 10000,
    price: '€20',
    productId: '47384',
  },
];

const prodPlans = [
  {
    name: '10k - monthly',
    limit: 10000,
    quota: 10000,
    price: '€20',
    productId: '826658',
  },
];

const plans = appConfig && appConfig.isProd ? prodPlans : testPlans;

export function getPlanById(id) {
  const plan = plans.find((plan) => plan.productId === id);
  if (!plan) {
    return null;
  }
  return plan;
}

export default plans;
