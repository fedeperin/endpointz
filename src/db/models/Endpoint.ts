import mongoose, { Schema, model } from 'mongoose'

const EndpointSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  },
  array: {
    type: Array,
    required: true
  },
  private: {
    type: Boolean,
    required: true
  },
  api_key: [{
    name: {
      type: String
    },
    key: {
      type: String
    }
  }],
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.models.Endpoint ?? model('Endpoint', EndpointSchema)
