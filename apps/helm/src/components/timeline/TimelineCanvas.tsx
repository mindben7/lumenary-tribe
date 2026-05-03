'use client';

import React from 'react';

export const TimelineCanvas = () => {
  return (
    <div className="w-full h-full bg-white relative">
      {/* 
        Using the exact Knight Lab iframe embed code provided by the user. 
        This points directly to their published Google Sheet: 1xuY4upIooEeszZ_lCmeNx24eSFWe0rHe9ZdqH2xqVNk 
      */}
      <iframe 
        src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1xuY4upIooEeszZ_lCmeNx24eSFWe0rHe9ZdqH2xqVNk&font=Default&lang=en&initial_zoom=2&height=100%" 
        width="100%" 
        height="100%" 
        frameBorder="0"
        allowFullScreen
        title="Lumenary Tribe Timeline"
        className="absolute inset-0"
      />
    </div>
  );
};