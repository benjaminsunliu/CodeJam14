// Import TensorFlow.js and mood data
import * as tf from '@tensorflow/tfjs';
import data from './moodData.js';

// Feature Standardization Function
//const standardize = (arr, mean, std) => arr.map((x) => (x - mean) / std);

// Calculate Feature Statistics for Standardization
const calcFeatureStats = (data) => {
  const featureCount = data[0].input.length;
  const stats = [];

  for (let i = 0; i < featureCount; i++) {
    const featureValues = data.map((d) => d.input[i]);
    const mean = featureValues.reduce((acc, val) => acc + val, 0) / featureValues.length;
    const variance = featureValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / featureValues.length;
    const std = Math.sqrt(variance);
    stats.push({ mean, std });
  }

  return stats;
};

// Standardizing the Training Data
const stats = calcFeatureStats(data);
const inputs = tf.tensor(data.map((d) => d.input.map((x, i) => (x - stats[i].mean) / stats[i].std)));
const outputs = tf.tensor(data.map((d) => d.output.map((y) => y / 10))); // Normalized output

// Define the Model
const trainMoodPredictionModel = async (inputs, outputs) => {
  const model = tf.sequential();

  // Simplified model architecture for better generalization with a small dataset
  model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [inputs.shape[1]] }));
  model.add(tf.layers.dropout({ rate: 0.2 })); // Reduced dropout rate for less aggressive regularization
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'linear' })); // Output activation for regression

  // Compile the Model with a lower learning rate and L2 regularization
  model.compile({ 
    optimizer: tf.train.adam(0.001), // Lowered learning rate for smoother convergence
    loss: 'meanSquaredError', 
    metrics: ['mae'] 
  });

  await model.fit(inputs, outputs, {
    epochs: 300, // Reduced epochs to avoid overfitting
    batchSize: 8, // Smaller batch size for more granular updates
    validationSplit: 0.2,
    callbacks: [tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 20 })],
  });

  return model;
};

// Making Predictions with the Model
trainMoodPredictionModel(inputs, outputs).then((model) => {
  const newInput = [7, 3, 5, 3]; // Moderate sleep, high exercise, moderate stress, low social interaction
  const standardizedInput = newInput.map((x, i) => (x - stats[i].mean) / stats[i].std);

  const prediction = model.predict(tf.tensor([standardizedInput]));

  prediction.data().then((data) => {
    // De-normalize and clip to valid range [1-10]
    const moodScore = Math.max(1, Math.min(10, (data[0] * 9) + 1)); // Adjusted normalization to avoid overly high scores
    console.log(`Predicted Mood Score: ${moodScore.toFixed(2)}`);
    console.log(`Mood Classification: ${classifyMood(moodScore)}`);
  });
});

// Mood Classification Function
const classifyMood = (score) => {
  if (score <= 3) {
    return "Negative Mood";
  } else if (score <= 6) {
    return "Neutral Mood";
  } else {
    return "Positive Mood";
  }
};
