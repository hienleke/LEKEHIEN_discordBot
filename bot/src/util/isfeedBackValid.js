const isFeedback = (string) => {
     let arraySplit = string.trim().split(" ");
     let isFeedback = arraySplit[0];
     if (isFeedback == "/feedback" && arraySplit.length > 1) return true;
     return false;
};

module.exports = isFeedback;
