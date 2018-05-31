import { normalize, schema, arrayOf } from 'normalizr';

const note = new schema.Entity('notes', {}, { idAttribute: '_id' });

const lane = new schema.Entity('lanes', { notes: [note] }, { idAttribute: '_id' });

export const lanesSchema = [lane];
