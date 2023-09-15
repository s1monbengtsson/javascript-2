import { useCallback } from 'react'
import Image from 'react-bootstrap/Image'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import imgAccept from '../assets/images/accept.gif'
import imgDrop from '../assets/images/drop.gif'
import imgReject from '../assets/images/reject.gif'
import useUploadMeme from '../hooks/useUploadMeme'
import { Alert, ProgressBar } from 'react-bootstrap'

const UploadMeme = () => {

	const uploadMeme = useUploadMeme()
	// Drop it like it's hot 🔥
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (!acceptedFiles.length) {
			toast.warning("Y WOULD U DO STUFF LIKE DAT?!")
			return
		}
		console.log("🎤:", acceptedFiles[0])

		uploadMeme.upload(acceptedFiles[0])
	}, [uploadMeme])


	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: {
			"image/gif": [],
			"image/jpeg": [],
			"image/png": [],
			"image/webp": [],
		},
		maxFiles: 1,
		maxSize: 4 * 1024 * 1024, // 4 mb
		onDrop: onDrop,
	})

	const dropzoneWrapperClasses = classNames({
		"drag-accept": isDragAccept,
		"drag-reject": isDragReject,
	})

	return (
		<div {...getRootProps()} id="dropzone-wrapper" className={dropzoneWrapperClasses}>
			<input {...getInputProps()} />

			<div className="indicator">
				{isDragActive
					? isDragAccept
						? <Image
							src={imgAccept}
							fluid />
						: <Image
							src={imgReject}
							fluid />
					: <Image
						src={imgDrop}
						className="w-50"
						fluid />}
			</div>

			{/* Upload progress bar*/}
			{uploadMeme.progress !== null && (
				<ProgressBar
					className='progress'
					now={uploadMeme.progress}
					striped
					animated
					variant='success'
					label={`${uploadMeme.progress} %`}
				/>
			)}

			{uploadMeme.isError && <Alert variant='danger' className='alert'>{uploadMeme.error}</Alert>}
			{uploadMeme.isSuccess && <Alert variant='success' className='alert'>That was a funny meme! 🤣🤪</Alert>}
		</div>
	)
}

export default UploadMeme