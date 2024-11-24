import PocketBase from 'pocketbase';

const pb = new PocketBase('https://codejam14-smart-kids.pockethost.io');

// example create data
const data = {
    "user": "",
    "date": "2022-01-01 10:00:00.123Z",
    "sleep_hours": 123,
    "exercise_hours": 123,
    "stress_level": 123,
    "social_interaction": 123,
    "predicted_score": 123,
    "journal": "test"
};

const record = await pb.collection('user_mood_journal').create(data);
