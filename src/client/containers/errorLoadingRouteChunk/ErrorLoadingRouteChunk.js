import React from 'react';
import ErrorLoadingChunkReporter from './errorLoadingChunkReporter/ErrorLoadingChunkReporter';

function ErrorLoadingRouteChunk() {
  return (
    <div>
      <p>ErrorLoadingChunk</p>
      <ErrorLoadingChunkReporter />
    </div>
  );
}

export default ErrorLoadingRouteChunk;
