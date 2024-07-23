'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
interface ProfileImageProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
  title?: string;
  readOnly?: boolean;
}
const ProfileImage: React.FC<ProfileImageProps> = ({
  onChange,
  imageUrl,
  title,
  readOnly,
}) => {
  const [showButton, setShowButton] = useState<boolean>(false);
  return (
    <div>
      <div
        className="profilePicture"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => {
          setShowButton(false);
        }}
      >
        {showButton && !readOnly && (
          <label className="profileImageLabel" htmlFor="fileInput">
            <FontAwesomeIcon icon={faUpload} size="2x" />
          </label>
        )}
        <input
          type="file"
          id="fileInput"
          onChange={onChange}
          className="profileImageInput"
        />
        <div className="profileImagePreview">
          <img
            src={
              imageUrl
                ? imageUrl
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s'
            }
            alt="Preview"
          />
        </div>
      </div>
    </div>
  );
};
export default ProfileImage;
