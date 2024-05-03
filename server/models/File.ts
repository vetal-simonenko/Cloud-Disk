import { Schema, model, Types } from 'mongoose';

const File = new Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	accessLink: { type: String },
	size: { type: Number, default: 0 },
	path: { type: String, default: '' },
	userId: { type: Types.ObjectId, ref: 'User' },
	parentId: { type: Types.ObjectId, ref: 'File' },
	childIds: [{ type: Types.ObjectId, ref: 'File' }],
});

export default model('File', File);
