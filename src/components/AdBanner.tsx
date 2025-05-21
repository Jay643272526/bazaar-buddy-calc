
import React from 'react';

interface AdBannerProps {
  adId: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ adId }) => {
  return (
    <div className="w-full bg-gray-100 p-2 text-center text-sm text-gray-500">
      <p>Advertisement ID: {adId}</p>
      {/* This is where the actual AdMob implementation would go */}
      {/* For now, we're just displaying the ID as requested */}
    </div>
  );
};

export default AdBanner;
