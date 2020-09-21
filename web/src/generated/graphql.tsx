import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  me: MeResponse;
};

export type MeResponse = {
  __typename?: "MeResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  data?: Maybe<MeData>;
  errors?: Maybe<MeErrors>;
};

export type MeData = {
  __typename?: "MeData";
  username: Scalars["String"];
  email: Scalars["String"];
};

export type MeErrors = {
  __typename?: "MeErrors";
  user: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: RegisterResponse;
  login: LoginResponse;
  logout: LogoutResponse;
};

export type MutationRegisterArgs = {
  options: RegisterInput;
};

export type MutationLoginArgs = {
  options: LoginInput;
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  data?: Maybe<RegisterData>;
  errors?: Maybe<RegisterErrors>;
};

export type RegisterData = {
  __typename?: "RegisterData";
  username: Scalars["String"];
  email: Scalars["String"];
};

export type RegisterErrors = {
  __typename?: "RegisterErrors";
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
};

export type RegisterInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  data?: Maybe<LoginData>;
  errors?: Maybe<LoginErrors>;
};

export type LoginData = {
  __typename?: "LoginData";
  username: Scalars["String"];
  email: Scalars["String"];
};

export type LoginErrors = {
  __typename?: "LoginErrors";
  username?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type LogoutResponse = {
  __typename?: "LogoutResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  data?: Maybe<LogoutData>;
  errors?: Maybe<LogoutErrors>;
};

export type LogoutData = {
  __typename?: "LogoutData";
  done: Scalars["Boolean"];
};

export type LogoutErrors = {
  __typename?: "LogoutErrors";
  done: Scalars["Boolean"];
};

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResponse" } & Pick<
    LoginResponse,
    "success" | "message"
  > & {
      data?: Maybe<
        { __typename?: "LoginData" } & Pick<LoginData, "username" | "email">
      >;
      errors?: Maybe<
        { __typename?: "LoginErrors" } & Pick<
          LoginErrors,
          "username" | "password"
        >
      >;
    };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout: { __typename?: "LogoutResponse" } & Pick<
    LogoutResponse,
    "success" | "message"
  > & {
      data?: Maybe<{ __typename?: "LogoutData" } & Pick<LogoutData, "done">>;
      errors?: Maybe<
        { __typename?: "LogoutErrors" } & Pick<LogoutErrors, "done">
      >;
    };
};

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "RegisterResponse" } & Pick<
    RegisterResponse,
    "success" | "message"
  > & {
      data?: Maybe<
        { __typename?: "RegisterData" } & Pick<
          RegisterData,
          "username" | "email"
        >
      >;
      errors?: Maybe<
        { __typename?: "RegisterErrors" } & Pick<
          RegisterErrors,
          "username" | "email" | "password" | "confirmPassword"
        >
      >;
    };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "MeResponse" } & Pick<
    MeResponse,
    "success" | "message"
  > & {
      data?: Maybe<
        { __typename?: "MeData" } & Pick<MeData, "username" | "email">
      >;
      errors?: Maybe<{ __typename?: "MeErrors" } & Pick<MeErrors, "user">>;
    };
};

export const LoginDocument = gql`
  mutation Login($options: LoginInput!) {
    login(options: $options) {
      success
      message
      data {
        username
        email
      }
      errors {
        username
        password
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      success
      message
      data {
        done
      }
      errors {
        done
      }
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: RegisterInput!) {
    register(options: $options) {
      success
      message
      data {
        username
        email
      }
      errors {
        username
        email
        password
        confirmPassword
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      success
      message
      data {
        username
        email
      }
      errors {
        user
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
