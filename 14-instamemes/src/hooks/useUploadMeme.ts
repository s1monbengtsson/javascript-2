import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { memesCol, storage } from "../services/firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import useAuth from "./useAuth"

const useUploadMeme = () => {
    const [error, setError] = useState<string | null>(null)
    const [isError, setIsError] = useState<boolean | null>(null)
    const [isUploading, setIsUploading] = useState<boolean | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
    const [progress, setProgress] = useState<number | null>(null)

    const { currentUser } = useAuth()


    const upload = async (image: File) => {
        // reset internal state
        setError(null)
        setIsError(null)
        setIsSuccess(null)
        setIsUploading(true)
        setProgress(null)

        try {
            // generate a uid for the file
            const uuid = uuidv4()

            // find file extension 
            const ext = image.name.substring(image.name.lastIndexOf(".") + 1) // "png"

            // construct filename to save image as
            const storageFilename = `${uuid}.${ext}`

            // create reference to storage
            const storageRef = ref(storage, `memes/${storageFilename}`)

            // start upload of image
            const uploadTask = uploadBytesResumable(storageRef, image)

            // attach upload observer
            uploadTask.on('state_changed', snapshot => {
                // update progress
                setProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 1000 / 10)
            })

            // wait for upload to complete
            await uploadTask.then()

            // get download url to uploaded image
            const url = await getDownloadURL(storageRef)

            // create document in db-collection "memes"
            const docRef = doc(memesCol)

            // create document in db for the uploaded image
            await setDoc(docRef, {
                _id: docRef.id,
                created: serverTimestamp(),
                name: image.name,
                path: storageRef.fullPath,
                size: image.size,
                type: image.type,
                uid: currentUser?.uid,
                url: url,
            })

            // profit 💰
            setProgress(null)
            setIsSuccess(true)
            toast.success("Doc created successfully 🍾")

        } catch (err) {
            console.log("Something went wrong with the upload")
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Could not upload file...")
            }
        } finally {
            setIsUploading(false)
        }
    }

    return {
        upload,
        error,
        isError,
        isSuccess,
        isUploading,
        progress
    }

}

export default useUploadMeme