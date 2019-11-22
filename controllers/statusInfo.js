module.exports.getStatus = async (location) => {
  if (location === 'top') {
    return 'closed';
  } else if (location === 'bottom') {
    return 'open';
  }

  return null;
};

module.exports.saveStatus = async (location, status) => {
  console.log(`Would save this to database: ${location} -> ${status}`);
};
