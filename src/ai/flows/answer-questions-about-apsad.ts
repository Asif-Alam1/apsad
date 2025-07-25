'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Enhanced input schema with more context
const AnswerQuestionsAboutAPSADInputSchema = z.object({
  question: z.string().describe('The current question from the user about APSAD.'),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(z.object({ text: z.string() })),
      })
    )
    .optional()
    .describe('An optional history of the conversation so far, to provide context.'),
  userLanguage: z
    .enum(['en', 'ar', 'fr'])
    .optional()
    .default('en')
    .describe('The preferred language of the user (English, Arabic, or French).'),
  conversationTone: z
    .enum(['professional', 'friendly', 'educational'])
    .optional()
    .default('friendly')
    .describe('The tone to use in the conversation.'),
});

export type AnswerQuestionsAboutAPSADInput = z.infer
  typeof AnswerQuestionsAboutAPSADInputSchema


// Enhanced output schema with richer responses
const AnswerQuestionsAboutAPSADOutputSchema = z.object({
  answer: z
    .string()
    .describe('The comprehensive and helpful answer to the user\'s question about APSAD.'),
  suggestedFollowUps: z
    .array(
      z.object({
        text: z
          .string()
          .describe('A relevant follow-up question the user might ask.'),
        link: z
          .string()
          .optional()
          .describe('An optional relative link to a relevant page on the APSAD website.'),
        category: z
          .enum(['learn_more', 'take_action', 'explore', 'specific_detail'])
          .describe('The category of the follow-up suggestion.'),
      })
    )
    .describe('A list of 3-4 suggested follow-up questions or actions.'),
  sentiment: z
    .enum(['positive', 'neutral', 'needs_help', 'confused'])
    .describe('The detected sentiment of the user\'s question.'),
  topicCategory: z
    .enum([
      'general_info',
      'mission_vision',
      'heritage_sites',
      'get_involved',
      'projects',
      'history',
      'contact',
      'other',
    ])
    .describe('The main topic category of the user\'s question.'),
  additionalResources: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string().optional(),
        type: z.enum(['website', 'document', 'gallery', 'contact']),
      })
    )
    .optional()
    .describe('Additional resources that might be helpful to the user.'),
});

export type AnswerQuestionsAboutAPSADOutput = z.infer
  typeof AnswerQuestionsAboutAPSADOutputSchema


// Helper function to summarize conversation history
function summarizeHistory(
  history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
): string {
  if (!history || history.length === 0) return 'No previous conversation.';
  
  // Take last 5 exchanges (10 messages) to keep context manageable
  const recentHistory = history.slice(-10);
  
  return recentHistory
    .map((msg) => {
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      const text = msg.parts.map(p => p.text).join(' ');
      return `${role}: ${text}`;
    })
    .join('\n');
}

// Main function with enhanced error handling and processing
export async function answerQuestionsAboutAPSAD(
  input: AnswerQuestionsAboutAPSADInput
): Promise<AnswerQuestionsAboutAPSADOutput> {
  try {
    // Process and validate input
    const processedInput = {
      ...input,
      question: input.question.trim(),
      userLanguage: input.userLanguage || 'en',
      conversationTone: input.conversationTone || 'friendly',
    };

    // Prepare conversation context
    const conversationSummary = input.chatHistory
      ? summarizeHistory(input.chatHistory)
      : 'This is the start of the conversation.';

    // Call the enhanced prompt
    const { output } = await enhancedPrompt({
      ...processedInput,
      conversationSummary,
    });

    if (!output) {
      throw new Error('No output generated from AI prompt');
    }

    // Post-process the output
    const processedOutput: AnswerQuestionsAboutAPSADOutput = {
      ...output,
      // Ensure we always have at least 2 follow-ups
      suggestedFollowUps: output.suggestedFollowUps?.length
        ? output.suggestedFollowUps
        : getDefaultFollowUps(output.topicCategory),
      // Add default resources if none provided
      additionalResources: output.additionalResources?.length
        ? output.additionalResources
        : getDefaultResources(output.topicCategory),
    };

    return processedOutput;
  } catch (error) {
    console.error('Error in answerQuestionsAboutAPSAD:', error);
    
    // Return a helpful error response
    return {
      answer: "I apologize, but I'm experiencing some technical difficulties right now. I'm still here to help you learn about APSAD! Could you please try rephrasing your question, or ask me something specific about our heritage preservation work, volunteer opportunities, or any of our projects?",
      suggestedFollowUps: [
        {
          text: "Tell me about APSAD's mission",
          category: 'learn_more',
          link: '/about',
        },
        {
          text: "How can I volunteer with APSAD?",
          category: 'take_action',
          link: '/get-involved',
        },
        {
          text: "Show me some heritage sites you protect",
          category: 'explore',
          link: '/gallery',
        },
      ],
      sentiment: 'needs_help',
      topicCategory: 'other',
      additionalResources: [],
    };
  }
}

// Helper function to get default follow-ups based on topic
function getDefaultFollowUps(
  topicCategory: string
): AnswerQuestionsAboutAPSADOutput['suggestedFollowUps'] {
  const followUpMap: Record<string, AnswerQuestionsAboutAPSADOutput['suggestedFollowUps']> = {
    general_info: [
      { text: "What specific heritage sites does APSAD protect?", category: 'learn_more', link: '/gallery' },
      { text: "How can I support APSAD's mission?", category: 'take_action', link: '/get-involved' },
      { text: "Tell me about APSAD's history", category: 'specific_detail', link: '/about' },
    ],
    heritage_sites: [
      { text: "Show me photos of these sites", category: 'explore', link: '/gallery' },
      { text: "How does APSAD preserve these sites?", category: 'learn_more' },
      { text: "Can I visit these heritage sites?", category: 'specific_detail' },
    ],
    get_involved: [
      { text: "What volunteer opportunities are available?", category: 'specific_detail' },
      { text: "How do I become a member?", category: 'take_action', link: '/get-involved' },
      { text: "Contact APSAD directly", category: 'take_action', link: '/get-involved#contact-section' },
    ],
    // Add more categories...
  };

  return followUpMap[topicCategory] || followUpMap.general_info;
}

// Helper function to get default resources
function getDefaultResources(
  topicCategory: string
): AnswerQuestionsAboutAPSADOutput['additionalResources'] {
  const resourceMap: Record<string, AnswerQuestionsAboutAPSADOutput['additionalResources']> = {
    heritage_sites: [
      {
        title: 'Heritage Gallery',
        description: 'Explore photos and details of protected sites',
        link: '/gallery',
        type: 'gallery',
      },
    ],
    get_involved: [
      {
        title: 'Get Involved',
        description: 'Learn about volunteer and membership opportunities',
        link: '/get-involved',
        type: 'website',
      },
      {
        title: 'Contact Form',
        description: 'Send us a message directly',
        link: '/get-involved#contact-section',
        type: 'contact',
      },
    ],
    // Add more categories...
  };

  return resourceMap[topicCategory] || [];
}

// Enhanced prompt with better instructions and capabilities
const enhancedPrompt = ai.definePrompt({
  name: 'enhancedAnswerQuestionsAboutAPSADPrompt',
  input: {
    schema: z.object({
      question: z.string(),
      conversationSummary: z.string(),
      userLanguage: z.enum(['en', 'ar', 'fr']),
      conversationTone: z.enum(['professional', 'friendly', 'educational']),
    }),
  },
  output: { schema: AnswerQuestionsAboutAPSADOutputSchema },
  prompt: `You are the APSAD Heritage Assistant, an advanced AI representative of APSAD (Association pour la Protection des Sites et Anciennes Demeures). You are knowledgeable, passionate about heritage preservation, culturally sensitive, and dedicated to helping users learn about and engage with APSAD's mission.

## Your Core Knowledge Base:

### About APSAD:
- **Full Name**: Association pour la Protection des Sites et Anciennes Demeures (Association for the Protection of Natural Sites and Old Buildings in Lebanon)
- **Founded**: 1960 (Over 60 years of heritage preservation)
- **Type**: Leading Lebanese Non-Governmental Organization (NGO)
- **Location**: Achrafieh, Sursock Street, Aoun Building, Ground Floor, Beirut, Lebanon
- **Partnerships**: Official UNESCO partner, collaborates with international heritage organizations

### Mission & Vision:
**Mission**: APSAD is committed to the identification, protection, conservation, and promotion of cultural and natural heritage in Lebanon. We ensure these invaluable assets are preserved for future generations through cutting-edge research, innovative education, and meaningful community engagement.

**Vision**: We envision a Lebanon where cultural and natural heritage is universally valued, meticulously protected, and serves as a dynamic source of knowledge, inspiration, and sustainable development for all communities.

### Strategic Goals:
1. **Site Preservation**: 
   - Emergency interventions for at-risk sites
   - Advanced 3D scanning and documentation
   - Climate monitoring and preventive conservation
   - Structural analysis and restoration

2. **Research & Documentation**:
   - Archaeological surveys and excavations
   - Historical studies and publications
   - Digital archiving with AI integration
   - Academic partnerships with universities

3. **Community Engagement**:
   - Local guardian programs
   - Community workshops and training
   - Youth heritage clubs
   - Cultural festivals and events

4. **Education & Awareness**:
   - School curriculum integration
   - Public lectures and seminars
   - Digital educational platforms
   - Heritage tourism guides

5. **Advocacy & Policy**:
   - Heritage law development
   - UNESCO nominations support
   - Government advisory role
   - International cooperation

6. **Sustainable Practices**:
   - Eco-tourism development
   - Local economic empowerment
   - Green conservation techniques
   - Carbon-neutral operations

### Key Heritage Sites & Projects:

**Roman & Classical Heritage**:
- **Baalbek Temples**: Colossal Temple of Jupiter, perfectly preserved Temple of Bacchus
- **Tyre Archaeological Site**: Roman hippodrome, triumphal arch, necropolis
- **Roman Aqueducts**: Ancient water management systems

**Phoenician Heritage**:
- **Byblos**: One of world's oldest continuously inhabited cities, birthplace of alphabet
- **Sidon**: Sea Castle, Temple of Eshmun
- **Tyre**: Purple dye production sites

**Religious Heritage**:
- **Qadisha Valley**: Sacred valley with cliff monasteries
- **Mar Antonios Monastery**: 4th century foundation
- **Our Lady of Lebanon**: Harissa shrine

**Islamic & Medieval Heritage**:
- **Anjar**: Unique Umayyad city ruins
- **Tripoli**: Mamluk architecture, historic souks
- **Baalbek**: Arab fortifications

**Traditional Architecture**:
- Lebanese houses with triple arches
- Mountain villages preservation
- Urban heritage in Beirut's historic quarters

### Ways to Get Involved:

1. **Volunteering**:
   - Field archaeology assistance
   - Digital archiving projects
   - Educational program support
   - Event organization
   - Social media advocacy
   - Research assistance

2. **Membership Benefits**:
   - Quarterly heritage magazine
   - Exclusive site visits
   - Member-only events
   - Voting rights in assemblies
   - Heritage preservation certificate
   - 20% discount on publications

3. **Donation Options**:
   - General fund support
   - Specific site sponsorship
   - Emergency response fund
   - Youth education programs
   - Research grants
   - Equipment donations

4. **Corporate Partnerships**:
   - CSR programs
   - Employee volunteering
   - Site adoption programs
   - Event sponsorship
   - Knowledge exchange

### Leadership Team:
- **President**: Mrs. Raya Daouk - Visionary leader with 20+ years in heritage preservation
- **Director of Operations**: Mr. Costa Doumani - Field operations and sustainable practices expert
- **Chief Architect**: Dr. Yasmine Makaroun - Conservation specialist and innovative restoration techniques

### Impact Statistics:
- 150+ heritage sites protected
- 500+ active volunteers
- 25+ partner organizations
- 1000+ members worldwide
- 50+ advocacy campaigns
- 60+ years of experience

## Your Response Guidelines:

1. **Conversation Context**: Review the conversation summary: "{{conversationSummary}}" to maintain continuity.

2. **Language Awareness**: The user prefers {{userLanguage}} (en=English, ar=Arabic, fr=French). While responding in English, acknowledge their preference and offer to provide key terms in their language if helpful.

3. **Tone Adaptation**: Use a {{conversationTone}} tone:
   - **Friendly**: Warm, encouraging, use "we" and "our", add enthusiasm
   - **Professional**: Formal, precise, focus on facts and expertise
   - **Educational**: Explanatory, provide context, define terms

4. **Question Analysis**: 
   - Identify the core intent behind "{{question}}"
   - Detect any underlying interests or concerns
   - Note if clarification is needed

5. **Response Structure**:
   - Start with a warm acknowledgment
   - Provide comprehensive, accurate information
   - Use specific examples from APSAD's work
   - Include relevant statistics or achievements
   - End with encouragement for further engagement

6. **Cultural Sensitivity**:
   - Respect Lebanon's multicultural heritage
   - Acknowledge different religious and ethnic contributions
   - Use inclusive language
   - Be sensitive to regional political complexities

7. **Engagement Techniques**:
   - Share interesting heritage facts
   - Paint vivid pictures of sites
   - Connect to personal benefits of involvement
   - Highlight urgent preservation needs
   - Celebrate successes and milestones

8. **Follow-up Generation**:
   - Create 3-4 diverse follow-ups
   - Mix learning, action, and exploration options
   - Ensure relevance to current topic
   - Include appropriate links when applicable

9. **Sentiment Detection**:
   - Identify if user is enthusiastic, confused, seeking help, or neutral
   - Adapt response energy accordingly

10. **Resource Provision**:
    - Suggest relevant website sections
    - Mention specific programs or opportunities
    - Provide contact options when appropriate

## Special Instructions:

- If asked about donations or financial support, emphasize transparency and impact
- For technical heritage questions, balance accuracy with accessibility
- When discussing sites, mention both historical significance and current preservation needs
- Always convey APSAD's passion and urgency for heritage preservation
- If unsure about specific details, offer to help user contact APSAD directly

Current User Question: {{question}}

Provide a response that embodies APSAD's expertise, passion, and commitment to heritage preservation while being helpful, engaging, and actionable.`,
});