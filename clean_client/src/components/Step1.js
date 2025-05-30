import React, { useState } from 'react';

const Step1 = ({ goNext }) => {
  const [isValid, setIsValid] = useState(false);

  return (
    <div>
      <input onChange={(e) => setIsValid(e.target.value.length > 0)} />
      <button onClick={goNext} disabled={!isValid}>
        다음
      </button>
    </div>
  );
};

export default Step1;
