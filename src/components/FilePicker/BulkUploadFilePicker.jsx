import React from 'react'

const BulkUploadFilePicker = ({ onFileChange }) => {
 
  const fileChange = () => {
    const inputFile = document.getElementById('groupFile')
    onFileChange(inputFile.files[0])
  }
  
  return (
    <div>
      <input type="file" id="groupFile" required  onChange={fileChange}  />
    </div>
  )
}

export default BulkUploadFilePicker