interface UserResponse {
  users: {
    id: number;
    name: string;
    status: string;
  }[];
}

interface UserIdReponse {
  dynamic: boolean;
}

interface UserIdFriendsReponse {
  friends: boolean;
}

// generate dynamic types for dynamic routes
type DynamicUserPath = `/api/users/${number}`; // /api/users/[id]
type DynamicUserFriendsPath = `/api/users/${number}/friends`; // /api/users/[id]/friends

// extract api response types from api routes
type ApiPathMap = {
  "/api/users": UserResponse;
  [key: DynamicUserPath]: UserIdReponse;
  [key: DynamicUserFriendsPath]: UserIdFriendsReponse;
};

// wrapper of fetch which only accepts valid keys
export const jsonFetch = async <T extends keyof ApiPathMap>(
  path: T
): Promise<ApiPathMap[T]> => {
  const res = await fetch(path);
  const data = await res.json();
  return data as ApiPathMap[T];
};

jsonFetch("/api/users/34").then((res) => {
  res.dynamic;
});

jsonFetch("/api/users").then((res) => {});

jsonFetch("/api/users").then((usersRes) => {
  usersRes.users.map((user) => {
    user.id;
    user.name;
    user.status;
  });
});

jsonFetch("/api/users/435").then((userRes) => {
  userRes.dynamic;
});

jsonFetch("/api/users/435/friends").then((userRes) => {
  userRes.friends;
});

jsonFetch("/api/users").then((res) => {
  res.users;
});

/*
  build script: 
      run generate && run build
      (to ensure up to date types)
      */
