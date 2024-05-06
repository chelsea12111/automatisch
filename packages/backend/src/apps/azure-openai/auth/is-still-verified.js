const isStillVerified = async ($) => {
  try {
    const response = await $.http.get('/fine_tuning/jobs');
    if (!response.ok) {
      console.error(`Error fetching jobs: status code ${response.status}`);
      return false;
    }
    console.log('Jobs successfully fetched');
    return true;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return false;
  }
};

module.exports = isStillVerified;
