import {
  useDatabase
} from '../../lib/db/SQL';

import {
  addUserDummyData,
  addWorkoutDummyData,
  addTrainerClientNonUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

import {
  addMessagesDummyData,
  dropMessagesCollection
} from '../../lib/db/mongo/seedDbHelpers';

const seed = async () => {
  await useDatabase();
  await addUserDummyData();
  await addWorkoutDummyData();
  await addTrainerClientNonUserDummyData();
  await dropMessagesCollection();
  await addMessagesDummyData();
  process.exit();
};

seed();