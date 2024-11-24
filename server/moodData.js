const data = [
  // Sleep, Exercise, Stress, Social Interaction
  { input: [8, 7, 5, 8], output: [8] },  // Well-rested, exercised well, moderate stress, good social interaction
  { input: [6, 5, 8, 4], output: [5] },  // Moderate sleep, low exercise, high stress, limited social interaction
  { input: [4, 3, 9, 2], output: [3] },  // Poor sleep, poor exercise, high stress, minimal social interaction
  { input: [9, 9, 2, 9], output: [9] },  // Great sleep, intense exercise, low stress, great social interaction
  { input: [7, 5, 6, 5], output: [6] },  // Good sleep, moderate exercise, moderate stress, moderate social interaction
  { input: [5, 6, 7, 3], output: [5] },  // Average sleep, moderate exercise, high stress, limited social interaction
  { input: [3, 2, 8, 1], output: [3] },  // Poor sleep, very low exercise, high stress, minimal social interaction
  { input: [10, 8, 3, 10], output: [9] }, // Excellent sleep, intense exercise, low stress, great social interaction
  { input: [2, 1, 10, 0], output: [2] },  // Very poor sleep, no exercise, very high stress, no social interaction
  { input: [6, 7, 4, 7], output: [7] },  // Decent sleep, good exercise, moderate stress, good social interaction
  { input: [8, 4, 5, 6], output: [7] },  // Good sleep, moderate exercise, moderate stress, moderate social interaction
  { input: [4, 6, 9, 3], output: [4] },  // Poor sleep, decent exercise, high stress, limited social interaction
  { input: [9, 10, 1, 9], output: [10] }, // Great sleep, very intense exercise, very low stress, great social interaction
  { input: [3, 4, 7, 2], output: [3] },  // Poor sleep, low exercise, high stress, minimal social interaction
  { input: [7, 8, 3, 8], output: [8] },  // Good sleep, good exercise, low stress, good social interaction
  { input: [5, 5, 6, 5], output: [5] },  // Average sleep, average exercise, moderate stress, moderate social interaction
  { input: [2, 3, 9, 1], output: [2] },  // Poor sleep, low exercise, high stress, minimal social interaction
  { input: [10, 10, 2, 10], output: [10] }, // Excellent sleep, very intense exercise, very low stress, great social interaction
  { input: [6, 9, 5, 8], output: [8] },  // Decent sleep, intense exercise, moderate stress, good social interaction
  { input: [8, 5, 4, 6], output: [7] },  // Good sleep, moderate exercise, moderate stress, moderate social interaction
  { input: [4, 7, 8, 3], output: [4] },  // Poor sleep, good exercise, high stress, limited social interaction
  { input: [10, 10, 2, 10], output: [9] }, // High sleep, high exercise, low stress, high social -> Positive mood
  { input: [10, 5, 5, 6], output: [7] },   // High sleep, moderate exercise, moderate stress, moderate social -> Neutral to positive mood
  { input: [8, 8, 3, 9], output: [8] },    // Good sleep, high exercise, low stress, high social -> Positive mood
  { input: [7, 6, 6, 5], output: [6] },    // Moderate sleep, moderate exercise, moderate stress, moderate social -> Neutral mood
  { input: [5, 4, 7, 4], output: [5] },    // Low sleep, low exercise, high stress, low social -> Neutral to negative mood
  { input: [9, 7, 2, 8], output: [8] },    // High sleep, good exercise, low stress, good social -> Positive mood
  { input: [3, 3, 10, 3], output: [3] },   // Low sleep, low exercise, high stress, moderate social -> Negative mood
  { input: [6, 5, 8, 5], output: [5] },    // Moderate sleep, moderate exercise, high stress, moderate social -> Neutral to slightly negative mood
  { input: [10, 10, 10, 10], output: [4] },// High sleep, high exercise, high stress, high social -> Stress reduces mood significantly
  { input: [8, 4, 3, 7], output: [7] },    // Good sleep, low exercise, low stress, good social -> Neutral to positive mood
  { input: [4, 3, 9, 3], output: [3] },    // Poor sleep, low exercise, high stress, low social -> Negative mood
  { input: [7, 8, 4, 7], output: [7] },    // Moderate sleep, high exercise, low stress, good social -> Positive mood
  { input: [9, 10, 1, 9], output: [9] },   // Great sleep, high exercise, very low stress, high social -> Very positive mood
  { input: [5, 2, 7, 2], output: [3] },    // Moderate sleep, low exercise, high stress, low social -> Negative mood
  { input: [6, 6, 5, 6], output: [6] },    // Moderate sleep, moderate exercise, moderate stress, moderate social -> Neutral mood
  { input: [10, 9, 3, 8], output: [8] },   // High sleep, high exercise, low stress, good social -> Positive mood
  { input: [2, 1, 10, 1], output: [2] },   // Very low sleep, no exercise, very high stress, low social -> Very negative mood
  { input: [8, 7, 5, 8], output: [7] },    // Good sleep, good exercise, moderate stress, high social -> Positive mood
  { input: [9, 6, 4, 9], output: [8] },    // High sleep, moderate exercise, low stress, high social -> Positive mood
  { input: [3, 3, 9, 2], output: [3] },    // Poor sleep, low exercise, high stress, low social -> Negative mood
  { input: [10, 8, 3, 10], output: [9] },  // High sleep, high exercise, low stress, high social -> Positive mood
  { input: [4, 5, 8, 4], output: [4] },    // Poor sleep, moderate exercise, high stress, low social -> Negative mood
  { input: [7, 7, 6, 7], output: [6] },    // Moderate sleep, good exercise, moderate stress, good social -> Neutral mood
  { input: [8, 9, 2, 9], output: [8] },    // Good sleep, high exercise, low stress, high social -> Positive mood
  { input: [5, 3, 10, 2], output: [3] },   // Moderate sleep, low exercise, high stress, low social -> Negative mood
  { input: [9, 10, 3, 8], output: [8] },   // High sleep, high exercise, low stress, good social -> Positive mood
  { input: [3, 2, 9, 1], output: [2] },    // Very low sleep, very low exercise, high stress, low social -> Very negative mood
  { input: [8, 8, 5, 7], output: [7] },    // Good sleep, high exercise, moderate stress, good social -> Neutral to positive mood
  { input: [6, 4, 7, 4], output: [4] },    // Moderate sleep, low exercise, high stress, low social -> Negative mood
  { input: [7, 7, 3, 7], output: [7] },    // Moderate sleep, good exercise, low stress, good social -> Positive mood
  { input: [5, 5, 6, 5], output: [5] },    // Moderate sleep, moderate exercise, moderate stress, moderate social -> Neutral mood
  { input: [2, 2, 9, 1], output: [2] },    // Very poor sleep, very low exercise, high stress, low social -> Very negative mood
  { input: [10, 10, 1, 9], output: [9] },  // Great sleep, high exercise, very low stress, high social -> Very positive mood
  { input: [6, 9, 4, 8], output: [7] },    // Decent sleep, intense exercise, low stress, good social -> Positive mood
  { input: [4, 3, 8, 3], output: [3] },    // Poor sleep, low exercise, high stress, moderate social -> Negative mood
  { input: [9, 6, 3, 9], output: [8] },    // High sleep, moderate exercise, low stress, high social -> Positive mood
  { input: [3, 3, 7, 3], output: [3] },    // Low sleep, low exercise, high stress, low social -> Negative mood
  { input: [8, 10, 2, 10], output: [9] },  // Good sleep, high exercise, low stress, high social -> Very positive mood
  { input: [5, 5, 8, 4], output: [4] },  
];
export default data;  