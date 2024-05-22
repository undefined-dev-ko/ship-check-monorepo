import { useQuery } from '@tanstack/react-query';
import AuthCheck from '../../../hocs/AuthCheck';
import { useTokenAuth } from '../../../hooks/useTokenAuth';

// const AuthTest = () => {
//   const { tokenPair, user } = useTokenAuth();

//   const { data } = useQuery({
//     queryKey: ['users'],
//     queryFn: () => RAW_QUERY.getAllUsers(tokenPair),
//   });

//   return (
//     <>
//       <h2>인증이 잘 되어있어요</h2>
//       <div>{JSON.stringify(user)}</div>
//       {data && <div>{JSON.stringify(data)}</div>}
//     </>
//   );
// };

// export default AuthCheck(AuthTest);
