// Implementation detail (Storing data in memory) shouldn't be exported
const conversations = new Map<string, string>();

// Export public interface as constact of repository
export const ConversationRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },

   setLastResponseId(conversationId: string, responseId: string) {
      return conversations.set(conversationId, responseId);
   },
};
