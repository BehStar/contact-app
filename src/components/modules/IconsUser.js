import React, { useState } from "react";

import styles from "./IconsUser.module.css";

const IconsUser = ({ setInfoUser }) => {
  const images = [
    { src: "/images/1.jpg", alt: "man-icon-1" },
    { src: "/images/2.jpg", alt: "woman-icon-1" },
    { src: "/images/3.jpg", alt: "man-icon-2" },
    { src: "/images/4.jpg", alt: "woman-icon-2" },
  ];

  const [selectedIcon, setSelectedIcon] = useState(1); 

  return (
    <div className={styles.wrapperIcons}>
      <p>Select Icon:</p>
      <div>
        {images.map((image, index) => (
          <IconUser
            key={index}
            src={image.src}
            alt={image.alt}
            value={index + 1}
            setInfoUser={setInfoUser}
            isSelected={selectedIcon === index + 1}
            setSelectedIcon={setSelectedIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default IconsUser;

const IconUser = ({
  src,
  alt,
  value,
  setInfoUser,
  isSelected,
  setSelectedIcon,
}) => {
  const changeHandler = () => {
    setInfoUser((prev) => ({ ...prev, icon: value }));
    setSelectedIcon(value);
  };

  return (
    <label
      className={`${styles.iconWrapper} ${
        isSelected ? styles.selectedIcon : ""
      }`}
    >
      <input type="radio" name="icon" value={value} onChange={changeHandler} />
      <img src={src} alt={alt} />
    </label>
  );
};
