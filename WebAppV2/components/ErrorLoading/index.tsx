import { AxiosError } from 'axios';
import React from 'react';
import Loader from '../Loader';
import Typography from '../Typography';

type P = {
  loading: boolean;
  error: AxiosError<unknown, any> | undefined;
};
const ErrorLoading: React.FC<P> = ({ loading, error }) => {
  if (loading) {
    return <Loader />;
  } else if (error) {
    return <Typography text={error?.message} variant="subtitle2" />;
  } else {
    return <Typography text={'Syncing in process...'} variant="subtitle2" />;
  }
};

export default ErrorLoading;
