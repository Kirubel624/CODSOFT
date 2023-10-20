import React, { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons'; // Import icons
import { Link } from 'react-router-dom';

const DynamicCollapsible = ({ title, contents, route }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleCollapsible}
        className="flex flex-row items-center justify-start  bg-white  text-gray-700 cursor-pointer  w-full text-left "
      >
        {title}
      <p className='pl-2'>{isActive ? <UpOutlined style={{ fontSize: '12px'}}/> : <DownOutlined style={{ fontSize: '12px'}}/>}</p>  
      </button>

      <div
        className={`px-4 py- overflow-hidden bg-white ${
          isActive ? 'block' : 'hidden'
        }`}
      >
        {contents.map((content, index) => (
          <div key={index} className="">
           <Link to={content.split(" ").join("").toLowerCase()==="takequiz"?"/":"/createquiz"}>{content}</Link> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicCollapsible;
