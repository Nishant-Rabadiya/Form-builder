import { axiosIntance } from '../@core/utils/axiosInstance';

export const getFormBuilderData = async () => {
    const response = await axiosIntance?.get(
        `/formBuilder`,
    );
    return response?.data;
};

export const sendFormBuilderData = async (data) => {
    const response = await axiosIntance?.post(
        `/formBuilder`, data
    );
    return response?.data;
};  


export const updateForm = async (form) => {
    await axiosIntance?.put(`/formBuilder/${form?.id}`, form);
};


export const deleteForm = async (id) => {
    const response = await axiosIntance?.delete(`/formBuilder/${id}`);
    return response?.data;
};