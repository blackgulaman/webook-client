import React from 'react';
import PropTypes from 'prop-types';
import SignupFirstPage from './SignupFirstPage';
import SignupSecondPage from './SignupSecondPage';
import SignupThirdPage from './SignupThirdPage';

const SignUp = props => {
  const [page, setPage] = React.useState(1);
  const nextPage = () => {
    console.log(props);
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  const onSubmit = () => {
    console.log('TEST!');
  };
  return (
    <div>
      {page === 1 && <SignupFirstPage onSubmit={nextPage} />}
      {page === 2 && (
        <SignupSecondPage previousPage={previousPage} onSubmit={nextPage} />
      )}
      {page === 3 && (
        <SignupThirdPage previousPage={previousPage} onSubmit={onSubmit} />
      )}
    </div>
  );
};

// SignUp.propTypes = {
//   onSubmit: PropTypes.func.isRequired
// };

export default SignUp;
