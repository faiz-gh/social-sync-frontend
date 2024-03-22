import { atom, useAtom } from 'jotai';
import {
  ICreatePostRequest, ICreatePostResponse,
  IGetPostsByCompanyRequest,
  IGetPostsByCompanyResponse, IGetPostsByEmployeeRequest, IGetPostsByEmployeeResponse,
  PostType,
  UserType
} from '@/types';
import {
  getPostsByCompany,
  getPostsByEmployee,
  createPost as addPost
} from "@/lib/apiRequests/post";
import toast from "react-hot-toast";
import {routes} from "@/config/routes";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "react-use";

export const postsByCompanyAtom = atom<PostType[]>([]);
export const postsByEmployeeAtom = atom<PostType[]>([]);
export const fetchPostsByCompanyAtom = atom<boolean>(true);

export default function usePost() {
  const [postsByEmployee, setPostsByEmployee] = useAtom(postsByEmployeeAtom);
  const [postsByCompany, setPostsByCompany] = useAtom(postsByCompanyAtom);
  const [fetchPostByCompany, setFetchPostByCompany] = useAtom(fetchPostsByCompanyAtom);
  const router = useRouter();
  const user: UserType = useLocalStorage('user')[0] as UserType;

  if (fetchPostByCompany){
    fetchPostsByCompany().then(
      () => setFetchPostByCompany(false)
    );
  }

  async function fetchPostsByCompany() {
    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    const payload: IGetPostsByCompanyRequest = {
      companyId: user?.id || ''
    }
    getPostsByCompany(payload).then((response: IGetPostsByCompanyResponse) => {
      if (response.statusText === 'OK' && response.data.data){
        setPostsByCompany(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    });
  }

  async function fetchPostsByEmployee(employeeId: string) {
    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    const payload: IGetPostsByEmployeeRequest = {
      employeeId: employeeId
    }
    getPostsByEmployee(payload).then((response: IGetPostsByEmployeeResponse) => {
      if (response.statusText === 'OK' && response.data.data){
        setPostsByEmployee(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    });
  }

  async function createPost(post: {
    accountId: string;
    description: string;
    image_url: string;
    location: string;
    tags: string[];
    postSchedule: Date;
  }) {
    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    const payload: ICreatePostRequest = {
      accountId: post.accountId,
      description: post.description,
      image_url: post.image_url,
      location: post.location,
      tags: post.tags,
      postSchedule: post.postSchedule
    }
    addPost(payload).then((response: ICreatePostResponse) => {
      if (response.statusText === 'OK' && response.data.data){
        toast.success(response.data.message);
        setFetchPostByCompany(true);
      } else {
        toast.error(response.data.message);
      }
    });
  }

  return { postsByCompany, postsByEmployee, createPost, fetchPostsByEmployee };
}
