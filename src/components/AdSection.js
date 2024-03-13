// AdSection.js

import React from 'react';
import '../css/AdSection.css'; // Import CSS file for styling

const AdSection = () => {
  // Sample ad data
  const ads = [
    {
      id: 1,
      imageUrl: 'ad1.jpg',
      title: 'Ad Title 1',
      description: 'Description for Ad 1'
    },
    {
      id: 2,
      imageUrl: 'ad2.jpg',
      title: 'Ad Title 2',
      description: 'Description for Ad 2'
    },
    {
      id: 3,
      imageUrl: 'ad3.jpg',
      title: 'Ad Title 3',
      description: 'Description for Ad 3'
    }
  ];

  return (
    <div className="ad-section">
      <h2 className='adheading'>College Ads</h2>
      <div className="ad-container">
        {ads.map((ad) => (
          <div key={ad.id} className="ad">
            <img src={ad.imageUrl} alt={ad.title} />
            <div className="ad-details">
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSection;
