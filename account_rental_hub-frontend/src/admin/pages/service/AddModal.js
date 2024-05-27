import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../../context/AccountContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageService from "../../../services/image.service";
import { AccountServiceContext } from "../../context/AccountServiceContext";


function AddServiceModal({ isOpen, onClose, action, initialData }) {

    const { createData, updateData } = useContext(AccountServiceContext);

    const validationSchema = yup.object().shape({
        serviceName: yup.string().required('Tên dịch vụ là bắt buộc'),
        description: yup.string().required('Mô tả là bắt buộc'),
        description: yup.string().test('len', 'Must be exactly 5 characters', val => val.length <= 255),
        website: yup.string().url('Vui lòng nhập một URL hợp lệ'),
        website: yup.string().required("URL website là bắt buộc"),
        imageUrl: yup.string().url('Vui lòng nhập một URL hợp lệ'),
    });

    const initFormData = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            data = data[0];
        }
        return {
            image: data.image ? data.image : null,
            serviceID: data.id || 0,
            serviceName: data.name || '',
            description: data.description || '',
            serviceType: data.category || '',
            website: data.website || '',
            imageUrl: data.image ? data.image : '',
            imagePreview: data.image ? data.image : null,
        };
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initFormData(initialData || {}),
    });

    useEffect(() => {
        if (action === "add") {
            reset(initFormData({}));
        } else if (initialData) {
            const initialFormData = initFormData(initialData);
            reset(initialFormData);
            setFormData(initialFormData);
        }
    }, [initialData, reset, action]);

    const [formData, setFormData] = useState(initFormData(initialData || {}));

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            if (files && files[0]) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: files[0],
                    imagePreview: URL.createObjectURL(files[0]),
                    imageUrl: '',
                }));
            } else {
                setFormData((prevState) => ({ ...prevState, [name]: null, imagePreview: null, imageUrl: '' }));
            }
        } else if (name === 'imageUrl') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
                imagePreview: value ? value : null,
                image: null,
            }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const onUploadImage = async (file) => {
        const response = await ImageService.uploadImage(file);
        console.log("responseUploadImage", response);

        return response;
    }

    const onSubmit = async (data) => {
        const imageData = data.image instanceof File ? data.image : (data.imageUrl ? data.imageUrl : formData.imagePreview);
        const serviceTypeValue = data.serviceType || '';
        const serviceData = {
            image: imageData,
            name: data.serviceName,
            description: data.description,
            category: serviceTypeValue,
            website: data.website,
        };

        if (formData.image && formData.image instanceof File) {
            const responseUploadImage = await onUploadImage(formData.image);
            serviceData.image = responseUploadImage;
        }

        if (action === "add") {
            createData(serviceData);
        } else if (action === "edit" && data.serviceID > 0) {
            updateData(data.serviceID, serviceData)
        } else {
            return null;
        }
        onClose();
    }

    const titleModal = (action) => {
        if (action === "add") return "Thêm dịch vụ"
        else if (action === "edit") return "Chỉnh sửa dịch vụ"
        else if (action === "view") return "Xem chi tiết dịch vụ"
    }

    return (
        <>
            {isOpen ? (
                <div className="fixed z-[200] inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{titleModal(action)}</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-4">
                                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                    Hình ảnh
                                                </label>
                                                <div className="flex items-center">
                                                    <div className="relative w-32 h-32 mr-4">
                                                        {formData.imagePreview ? (
                                                            <img
                                                                src={formData.imagePreview}
                                                                alt="Image Preview"
                                                                className="object-cover w-full h-full rounded-md"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
                                                                <span className="text-gray-500">No Image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="mb-2">
                                                            <input
                                                                type="file"
                                                                id="image"
                                                                name="image"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onChange={handleInputChange}
                                                                disabled={action === "view"}
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                                                                Hoặc nhập URL ảnh
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="imageUrl"
                                                                name="imageUrl"
                                                                {...register('imageUrl')}
                                                                value={formData.imageUrl || ''}
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onChange={handleInputChange}
                                                                disabled={action === "view"}
                                                            />
                                                        </div>
                                                        {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                                    Tên dịch vụ
                                                </label>
                                                <input
                                                    type="text"
                                                    id="serviceName"
                                                    name="serviceName"
                                                    {...register('serviceName')}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                />
                                                {errors.serviceName && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.serviceName.message}</p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    {...register('description')}
                                                    className={`mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    onChange={handleInputChange}
                                                    disabled={action === "view"}
                                                    maxLength={255}
                                                ></textarea>
                                                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                                                    Loại dịch vụ
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="serviceType"
                                                        name="serviceType"
                                                        className="block w-full rounded-md border-gray-300 border-2 py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                                                        onChange={handleInputChange}
                                                        {...register('serviceType', { required: 'Loại dịch vụ là bắt buộc' })}
                                                    >
                                                        <option value="" disabled className="text-gray-500">
                                                            Chọn loại dịch vụ
                                                        </option>
                                                        <option value="study">Học tập</option>
                                                        <option value="work">Làm việc</option>
                                                        <option value="movie">Xem phim</option>
                                                        <option value="music">Nghe nhạc</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <svg
                                                            className="h-5 w-5 text-gray-400"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {errors.serviceType && <p className="mt-2 text-sm text-red-600">{errors.serviceType.message}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                                    Website
                                                </label>
                                                <input
                                                    type="text"
                                                    id="website"
                                                    name="website"
                                                    {...register('website')}
                                                    className={`mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.website ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    disabled={action === "view"}
                                                />
                                                {errors.website && <p className="mt-2 text-sm text-red-600">{errors.website.message}</p>}
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                {action !== "view" && (
                                                    <button
                                                        type="submit"
                                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                    >
                                                        Lưu
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={onClose}
                                                >
                                                    {action === "view" ? "Đóng" : "Hủy"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default AddServiceModal;