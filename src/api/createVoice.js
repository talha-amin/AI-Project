import axios from "axios";
import FormData from "form-data";
import { auth, storage } from "../components/google/firebase";

export async function addVoice({ cardText }) {
  if (cardText === "Vocalize") {
    const url = "https://api.elevenlabs.io//v1/voices/add";

    const form = new FormData();

    form.append("name", auth.currentUser.displayName);
    form.append("description", "Description of the voice");
    form.append("labels", "Your serialized labels dictionary");

    try {
      const userId = auth.currentUser.uid;
      const fileRef = storage().ref(`${userId}/Vocalize`);
      const downloadURL = await fileRef.getDownloadURL();

      form.append(
        "files",
        axios.get(downloadURL, { responseType: "stream" }).data
      );
      const response = await axios.post(url, form, {
        headers: {
          ...form.getHeaders(),
          "xi-api-key": "535c9779eac3ff852e340d337c01dc34",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading voice:", error.response.data);
    }
  } else {
    console.error("Illegal Card Text");
  }
}
