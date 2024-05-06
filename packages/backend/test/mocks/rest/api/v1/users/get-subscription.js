import type { Subscription } from './subscription';

type GetSubscriptionMockType = (subscription: Subscription) => {
  data: {
    readonly id: string;
    readonly paddlePlanId: string;
    readonly paddleSubscriptionId: string;
    readonly cancelUrl?: string;
    readonly updateUrl?: string;
    readonly status: string;
    readonly nextBillAmount?: number;
    readonly nextBillDate?: Date;
    readonly lastBillDate?: Date;
    readonly cancellationEffectiveDate?: Date | null;
    readonly createdAt?: number;
    readonly updatedAt?: number;
  };
  meta: {
    readonly count: 1;
    readonly currentPage?: number | null;
    readonly isArray: false;
    readonly totalPages?: number | null;
    readonly type: 'Subscription';
  };
};

const getSubscriptionMock: GetSubscriptionMockType = (subscription) => {
  if (!(subscription.nextBillDate instanceof Date)) {
    throw new Error('nextBillDate must be a Date object');
  }
  if (!(subscription.lastBillDate instanceof Date)) {
    throw new Error('lastBillDate must be a Date object');
  }
  if (subscription.cancellationEffectiveDate !== null && !(subscription.cancellationEffectiveDate instanceof Date)) {
    throw new Error('cancellationEffectiveDate must be a Date object or null');
  }
  if (subscription.createdAt !== undefined && typeof subscription.createdAt !== 'number') {
    throw new Error('createdAt must be a number or undefined');
  }
  if (subscription.updatedAt !== undefined && typeof subscription.updatedAt !== 'number') {
    throw new Error('updatedAt must be a number or undefined');
  }

  return {
    data: {
      id: subscription.id,
      paddlePlanId: subscription.paddlePlanId,
      paddleSubscriptionId: subscription.paddleSubscriptionId,
      cancelUrl: subscription.cancelUrl,
      updateUrl: subscription.updateUrl,
      status: subscription.status,
      nextBillAmount: subscription.nextBillAmount,
      nextBillDate: subscription.nextBillDate.toISOString(),
      lastBillDate: subscription.lastBillDate.toISOString(),
      cancellationEffectiveDate: subscription.cancellationEffectiveDate,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    },
    meta: {
      count: 1,
      currentPage: null,
      isArray: false,
      totalPages: null,
      type: 'Subscription',
    },
  };
};

export default getSubscriptionMock;
