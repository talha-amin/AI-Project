import axios from "axios";

export async function TextToSpeech({ voice_id, text }) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;

    try {
        const response = await axios.post(url, {
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
                stability: 0,
                similarity_boost: 0,
                style: 0,
                use_speaker_boost: true
            }
        }, {
            headers: {
                "xi-api-key": "535c9779eac3ff852e340d337c01dc34",
            },
            params: {
                optimize_streaming_latency: 0,
                output_format: 'mp3_44100_128'
            }
        });

            console.log("Response:", response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error uploading voice:", error.response.data);
        } else if (error.request) {
            console.error("Request made, but no response received:", error.request);
        } else {
            console.error("Error setting up the request:", error.message);
        }
    }
}
