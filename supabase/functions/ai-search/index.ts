import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Service categories data for AI context
const serviceCategories = [
  { id: 'plumber', name: 'Plumber', description: 'Pipe repairs, installations, and maintenance' },
  { id: 'electrician', name: 'Electrician', description: 'Electrical repairs, wiring, and installations' },
  { id: 'housekeeper', name: 'Housekeeper', description: 'Home cleaning and organization services' },
  { id: 'watchman', name: 'Watchman', description: 'Security and property surveillance' },
  { id: 'carpenter', name: 'Carpenter', description: 'Woodwork, furniture, and repairs' },
  { id: 'painter', name: 'Painter', description: 'Interior and exterior painting services' },
  { id: 'gardener', name: 'Gardener', description: 'Landscaping and garden maintenance' },
  { id: 'driver', name: 'Driver', description: 'Personal and commercial driving services' },
  { id: 'cook', name: 'Cook', description: 'Personal chef and meal preparation services' },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a helpful AI assistant for ServicePro Connect, a marketplace connecting users with verified service providers.

Available service categories:
${serviceCategories.map(c => `- ${c.name}: ${c.description}`).join('\n')}

Your job is to understand what service the user needs and suggest the best matching category.
Respond with a JSON object containing:
- "matchedCategories": array of category IDs that match (max 3, ordered by relevance)
- "response": a brief, friendly response to the user explaining your suggestions

Example response format:
{"matchedCategories": ["plumber", "electrician"], "response": "Based on your need for fixing a leaky pipe, I recommend checking out our Plumber services. If it's related to water heater issues, an Electrician might also help!"}

Always return valid JSON only, no markdown formatting.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON response from AI
    let parsedContent;
    try {
      // Clean up any markdown formatting that might have snuck in
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedContent = JSON.parse(cleanContent);
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      // Fallback response
      parsedContent = {
        matchedCategories: [],
        response: "I understand you're looking for help. Please browse our service categories to find the right provider for your needs."
      };
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      matchedCategories: [],
      response: "Sorry, I couldn't process your request. Please try browsing our services manually."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
