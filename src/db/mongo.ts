import mongoose from 'mongoose'
import { MONGO_URL } from '$env/static/private' 

export const start_mongo = () => {
	console.log('Starting Mongo')
	return mongoose.connect(MONGO_URL)
}