import React, {Text} from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
        <Text>Bartłomiej Zima</Text>
        <Text>2.5</Text>
        <Text>FibCalc</Text>
      <Link to="/">Go back home</Link>
    </div>
  );
};
