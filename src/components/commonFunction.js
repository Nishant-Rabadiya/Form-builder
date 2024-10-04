import { useMutation, useQuery, useQueryClient } from "react-query";

export const getFormData = (queryKey, queryFn) => {
    const { data } = useQuery({
        queryKey: [queryKey],
        queryFn: queryFn,
        options: {
            staleTime: Infinity,
        },
    });

    return data;
};

export const formMutation = (queryKey, queryFn) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        queryKey: [queryKey],
        mutationFn: queryFn,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });

    return mutation;
};

