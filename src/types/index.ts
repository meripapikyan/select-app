export interface IUserCardProps {
  firstName: string;
  lastName: string;
  job?: string;
}

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  job?: string;
};

export type FetchUsersResponse = {
  data: User[];
  meta: {
    from: number;
    to: number;
    total: number;
  };
};
