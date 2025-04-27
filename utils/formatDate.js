// Utility function to format a Date object to a string in the format yyyy-mm-dd

exports.formatDate = (date) => {
  const year = date.getFullYear(); // Extract the full year (e.g., 2025)
  const month = `0${date.getMonth() + 1}`.slice(-2); // Extract month (1-12), padded to 2 digits
  const day = `0${date.getDate()}`.slice(-2); // Extract day (1-31), padded to 2 digits

  return `${year}-${month}-${day}`; // Return the formatted date string
};
