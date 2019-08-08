import {apiKey} from './config/environment'

// Returns the request body with the type of feature to detect
const reqBody = (encodedImage) => ({
  requests: [
    {
      features: [
        { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
      ],
      image: {
        content: encodedImage
      }
    }
  ]
})

// Request the google vision API with the given encoded image
export const callGoogleVisionApi = async (encodedImage) => {
  try {
    const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(reqBody(encodedImage))
    })
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}
