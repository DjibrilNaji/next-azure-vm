export type User = {
  username: string;
  password: string;
  role: string;
} | null;

export type VmAddressToken = {
  address?: string;
  status: string;
};
