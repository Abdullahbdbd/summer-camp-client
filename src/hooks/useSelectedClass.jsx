import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useSelectedClass = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: selectedClass = [] } = useQuery({
        queryKey: ['booked', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/booked?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [selectedClass, refetch]
}
export default useSelectedClass;