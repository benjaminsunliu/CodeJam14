import OpenAI from 'openai';
import 'dotenv/config'; // Loads environment variables from .env file

// Initialize the OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to analyze journal entries
const analyzeJournal = async (journalEntry) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a mental health assistant.' },
        { role: 'user', content: `Analyze this journal entry: "${journalEntry}"` },
      ],
    });

    console.log('Analysis:', response.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing journal entry:', error);
  }
};

// Example usage
const journalEntry = "I feel overwhelmed with work and can't find time to relax.";
analyzeJournal(journalEntry);