const getUserTrialMock = async (currentUser) => {
  try {
    const inTrial = await currentUser.inTrial();
    const trialExpiryDate = currentUser.trialExpiryDate;
    const expireAt = trialExpiryDate ? trialExpiryDate.toISOString() : null;

    return {
      data: {
        inTrial,
        expireAt,
      },
      meta: {
        count: 1,
        currentPage: null,
        isArray: false,
        totalPages: null,
        type: 'Object',
      },
    };
  } catch (error) {
    console.error('Error in getUserTrialMock:', error);
    throw error;
  }
};

module.exports = getUserTrialMock;
