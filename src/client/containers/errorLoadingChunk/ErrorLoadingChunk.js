import React from 'react';
import ErrorLoadingChunkReporter from './errorLoadingChunkReporter/ErrorLoadingChunkReporter';

function ErrorLoadingChunk() {
  return (
    <div>
      <p>ErrorLoadingChunk</p>
      <ErrorLoadingChunkReporter />
    </div>
  );
}

export default ErrorLoadingChunk;
