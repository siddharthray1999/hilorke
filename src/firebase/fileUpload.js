import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile4 = (e, setVideoUrl) => {
  const file = e.target.files[0];
  if (!file) return;
  const sotrageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(sotrageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = `${Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )}%`;
    },
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setVideoUrl(downloadURL);
      });
    }
  );
};
export const uploadFile3 = (e, setImgUrl) => {
  const file = e.target.files[0];
  if (!file) return;
  const sotrageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(sotrageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = `${Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )}%`;
    },
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
      });
    }
  );
};
