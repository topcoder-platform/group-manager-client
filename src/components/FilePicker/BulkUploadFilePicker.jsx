import React from 'react'
import FilePicker from 'appirio-tech-react-components/components/FilePicker/FilePicker'

import {
  FILE_PICKER_API_KEY,
  FILE_PICKER_SUBMISSION_CONTAINER_NAME,
  FILE_PICKER_CNAME,
  FILE_PICKER_FROM_SOURCES,
  FILE_PICKER_ACCEPT
} from '../../config/constants'

const BulkUploadFilePicker = () => {
  const onFileUpload = (files) => {
    alert(JSON.strinigify(files, null, 2))
  }

  const options = {
    apiKey: FILE_PICKER_API_KEY,
    cname: FILE_PICKER_CNAME,
    buttonText: 'Add File',
    buttonClass: 'tc-btn tc-btn-secondary tc-btn-sm',
    dragText: 'Drag and drop your files here',
    language: 'en',
    location: 's3',
    storeContainer: FILE_PICKER_SUBMISSION_CONTAINER_NAME,
    fromSources: FILE_PICKER_FROM_SOURCES,
    accept: FILE_PICKER_ACCEPT,
    path: 'PROJECT_ATTACHMENTS/320',
    multiple: 'true',
    services: ['COMPUTER', 'GOOGLE_DRIVE', 'BOX', 'DROPBOX', 'SKYDRIVE']
  }

  return (
    <div>
      <FilePicker apiKey={FILE_PICKER_API_KEY} mode="filepicker-dragdrop" options={options} onSuccess={onFileUpload} />
    </div>
  )
}

export default BulkUploadFilePicker