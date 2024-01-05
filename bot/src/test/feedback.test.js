const isFeedbackValid = require("../util/isfeedBackValid");

describe("isFeedback function", () => {
     it('should return true if the input starts with "/feedback"', () => {
          const result = isFeedbackValid("/feedback Some feedback content");
          expect(result).toBe(true);
     });

     it('should return false if the input does not start with "/feedback"', () => {
          const result = isFeedbackValid("This is not feedback");
          expect(result).toBe(false);
     });

     it('should return false if the input is "/feedback" with no additional content', () => {
          const result = isFeedbackValid("/feedback");
          expect(result).toBe(false);
     });

     it("should return false if the input is an empty string", () => {
          const result = isFeedbackValid("");
          expect(result).toBe(false);
     });

     it("should return true if the input has leading/trailing spaces", () => {
          const result = isFeedbackValid("   /feedback   Additional content");
          expect(result).toBe(true);
     });

     // Add more test cases as needed
});
