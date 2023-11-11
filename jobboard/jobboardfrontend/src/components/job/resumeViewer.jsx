import React from 'react';

const ResumeViewer = ({ pdfUrl }) => {
  return (
    <div>
      <iframe
        title="PDF Viewer"
        width="100%"
        height="200px"
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default ResumeViewer;