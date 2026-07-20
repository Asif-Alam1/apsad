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
      { text: "Contact APSAD directly", category: 'take_action', link: '/get-involved#contact' },
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
        link: '/get-involved#contact',
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

## Your Core Knowledge Base (verified facts from APSAD's own record — do not invent beyond these):

### About APSAD:
- **Full Name**: Association pour la Protection des Sites et Anciennes Demeures au Liban (The Association for Protecting Natural Sites and Old Buildings in Lebanon)
- **Founded**: 1960 in Beirut
- **Type**: Lebanese Non-Governmental Organization (NGO)
- **Headquarters**: Sursock Street, Aoun Building, Ground Floor, Achrafieh, Beirut — P.O.Box 11-154. Phone +961 1 336 368. Email info@apsad.org
- **Regional sections**: Tripoli, Deir el-Qamar, Saïda, and Aley
- **Record**: Around one hundred "architectural treasures" saved through plans, drawings, and documentation

### The 1960 Founding Appeal (quote it when asked about origins):
"Take care: this heritage is sacked, abandoned, despised and disfigured by ugly buildings, incoherent suburbs, and unordered cities without dignity…" — the appeal called for "a welcoming Lebanon, proud of its past, trustful in its future." APSAD requests all initiatives, accepts all suggestions, saves old buildings, and coordinates all efforts within the field.

### Aims (from the founding charter):
1. Promote the protection and restoration of ancient buildings of historic and artistic character, and the conservation of natural sites
2. Act upon laws protecting the architectural heritage
3. Encourage investors to participate in preservation for its economic benefits
4. Raise public awareness of urban and environmental problems
5. Strengthen the social fabric through mobilization around national heritage and civic responsibility
6. Develop architectural and natural sites so Lebanon regains its regional tourism standing
7. Encourage high-quality architecture and town planning
Also: campaigns, conferences, debates, publications (in French, English, and Arabic), and exhibitions.

### The Restoration Record (real dates):
- 1962: Historic "R. A. el-Dine" house in Abey — first restoration; later the British Ambassador's residence
- 1964: Hammam el-Jédid (18th century) in Tripoli, with the Directorate General of Antiquities (DGA)
- 1965: Restoration studies for Khan al-Khayatin in Tripoli; houses in Saida, Beit Mery, Abey, Bikfaya
- 1967: Old souk of Batroun (with the DGA)
- 1968: Old house in Sebaal
- 1969: Mar Estephan church, Batroun
- 1971: Farhat church in Jbeil; Labaki historical house in Baabdate
- 1972: Rehabilitated residence in Deir el-Qamar becomes APSAD's Chouf regional offices
- 1978: Reconstruction plans for the old Jeweler's Souk in Beirut after the war
- 1979: Studies for Amshit's public place and the Hôpital des Arts et Métiers in Beirut
- 2001–2003: Old souk of Jounieh rehabilitation; historic house in Jbeil restored as tourist information centre for Kesrouan-Jbeil-Batroun; Jounieh town hall façade
- 2012: Zaki Nassif's house in Mashghara donated by his heirs to APSAD (land register 4284/2012); architect Yasmine Makaroun studied its conversion
- 2014–2015: Zaki Nassif house opens as a museum, cultural centre, and music school
- 2016: Partnership with Factum Foundation to study the ancient stelae of Nahr el-Kalb; restoration of the old Hammam of Tripoli (a former APSAD headquarters)

### Development Projects:
- **Jounieh old souk** (since 2001): municipal demolition bans won, restorations regulated, and a festival that turns the souk into a pedestrian street by night
- **Salima village** (Metn): two-year study with Patrimoine Sans Frontières; 70 residences classified as historic by the Ministry of Culture
- **Jbeil tourist centre**: restored historic residence serving the region, with the DGA and MED'ACT

### Campaigns & Awareness (examples):
- Organizer of Lebanon's National Heritage Day at the official request of the Ministry of Culture (2002–2013)
- 2012: Vice-President Talal Makdessi urged Central Bank Governor Riad Salameh to help save old buildings; the Governor promised banks would buy endangered old houses to restore them
- 2012: Joint complaint with Save Beirut Heritage against the destruction of the ACAR property in Kantari
- 2010: The only Lebanese NGO officially at the First International Conference for Urban Heritage in the Islamic Countries in Riyadh (13-panel exhibition; presented the book "Palaces of Lebanon")
- Since 2010: partnership with Mercy Corps promoting cultural heritage in schools (with Beirut National Museum and Jordanian partners)
- Guided visits of old Beirut houses: Bustros, Linda Sursock, Sursock palace, the domain of Lady Cochrane, Gemayzeh
- Exhibitions abroad: London, Istanbul, Belgrade, Paris, Brussels, Milan, Rome (1964); Riyadh (2010, 2013)
- January 2017: "Nocturne d'opéra" concert at the National Museum of Beirut for APSAD's 57th anniversary, under the patronage of the Minister of Culture — covered by L'Orient-Le Jour and Annahar
- May 2017: National Heritage Days with the Ministry of Culture — guided itineraries to Batroun and Douma, the Niha fortresses in the Bekaa, and Qobayat in Akkar, departing from the Linda Sursock palace
- 2016: the Zaki Nassif Museum opening (some 1,100 works public) was covered from Annahar and L'Orient-Le Jour to Al Jazeera and Sky News Arabia

### International Affiliations (be precise — APSAD is NOT a UNESCO partner itself):
- **Europa Nostra**: member since 1963 — through APSAD, Lebanon is the ONLY non-European country in the federation
- **ICOMOS**: APSAD is the official partner of ICOMOS in Lebanon (ICOMOS is UNESCO's principal advisor on monuments and sites)
- **World Monuments Fund**: collaboration that placed Enfeh on the list of the world's 100 most endangered sites
- **Patrimoine Sans Frontières**: member since 1996
- **Civitas Nostra**: member since 1961

### Leadership:
- **President**: Raya Daouk
- **Vice-President**: Talal Makdessi
- **Executive committee**: 12 members elected by the general assembly (about 69 members; 52 attended the 2015 assembly)
- Architects who have worked with APSAD include Yasmine Makaroun and Hana Alamuddine Haydar

### Membership (real privileges):
- The association's newsletters and publications, in three languages
- Priority access to concerts, exhibitions, and events (APSAD organizes concerts in old houses, at the National Museum, and at the Zaki Nassif Museum)
- Guided visits of old houses and sites across Lebanon
- A voice and a vote in the general assembly
Volunteering spans field restoration, archival research, educational outreach, and administration. Partnerships are institutional (DGA, municipalities, foundations).

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