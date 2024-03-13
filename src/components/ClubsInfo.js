// ClubsInfo.js

import React from 'react';
import '../css/ClubsInfo.css'; // Import CSS file for styling

const ClubsInfo = () => {
  // Sample club data
  const clubs = [
    {
      id: 1,
      name: 'Club Name 1',
      imageUrl: 'club1.jpg',
      description: 'Description for Club 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contact: 'Contact Person: John Doe, Email: john@example.com, Phone: 123-456-7890'
    },
    {
      id: 2,
      name: 'Club Name 2',
      imageUrl: 'club2.jpg',
      description: 'Description for Club 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contact: 'Contact Person: Jane Smith, Email: jane@example.com, Phone: 987-654-3210'
    },
    {
      id: 3,
      name: 'Club Name 3',
      imageUrl: 'club3.jpg',
      description: 'Description for Club 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contact: 'Contact Person: Alice Johnson, Email: alice@example.com, Phone: 555-123-4567'
    }
  ];

  return (
    <div className="clubs-info">
      <h2>College Clubs Information</h2>
      <div className="club-container">
        {clubs.map((club) => (
          <div key={club.id} className="club">
            <img src={club.imageUrl} alt={club.name} />
            <div className="club-details">
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <p>{club.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsInfo;
