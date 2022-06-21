export interface UserUpdateArgs {
  name: string;
  profile_image?: string;
}

export interface UserCreateArgs extends UserUpdateArgs {
  email: string;
  generation: number;
}
