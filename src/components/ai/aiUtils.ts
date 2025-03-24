
/**
 * Generates an AI response based on user input
 * This is a simple implementation that could be expanded with more complex logic or API calls
 */
export const generateAIResponse = (userInput: string): string => {
  const lowercaseInput = userInput.toLowerCase();
  
  if (lowercaseInput.includes('case') || lowercaseInput.includes('file')) {
    return "I can help you with case management. Would you like me to help you search for a specific case, create a new case record, or provide guidance on case documentation requirements?";
  } else if (lowercaseInput.includes('policy') || lowercaseInput.includes('regulation')) {
    return "I can provide information about our agency policies and regulations. Which specific policy or regulation would you like to learn more about?";
  } else if (lowercaseInput.includes('form') || lowercaseInput.includes('document')) {
    return "I can help you find and complete necessary forms. Please let me know which type of form you're looking for, or I can guide you through our documentation process.";
  } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
    return "Hello! How can I assist you today with your case management needs?";
  } else {
    return "I'm your AI assistant. I can help you with questions about this application, your work, or any other questions you might have.";
  }
};
