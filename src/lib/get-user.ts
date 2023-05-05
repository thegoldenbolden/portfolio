import { authOptions } from '@auth';
import { getServerSession } from 'next-auth';
import { cache } from 'react';

export default cache(function getUser() {
  return getServerSession(authOptions);
});
