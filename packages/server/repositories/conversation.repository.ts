// Implementation details(the main hidden logic)
const conversations = new Map<string, string>();

// Interface exported as constant
export const ConversationRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },

   setLastResponseId(conversationId: string, responseId: string) {
      return conversations.set(conversationId, responseId);
   },
};
