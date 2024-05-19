import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";

export function SignInModal({ showModal, onCloseModal, onLoginSuccess }) {

    const { login, loading, errors } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
 

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };


    const handleCloseModal = () => {
        onCloseModal(false);
    }

    const forgotPassword = () => {
        navigate("/forgotPassword");
      }

    return (
        <>
            {/* Modal */}
            {showModal ? (
                <>
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="absolute top-0 right-0 mt-4 mr-4">
                                    <button
                                        type="button"
                                        className="bg-gray-200 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        onClick={handleCloseModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mb-4">
                                        <h1 className="text-center text-black text-2xl font-bold">Đăng nhập</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Tên đăng nhập"
                                                value={username}
                                                onChange={handleUsernameChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <div className='relative'>
                                                <input
                                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                                                        }`}
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Mật khẩu"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                />
                                                <button
                                                    className="absolute top-2 right-0 px-2"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    type="button"
                                                >
                                                    {showPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>

                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Đăng nhập
                                            </button>
                                            <a onClick={forgotPassword} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                                Bạn quên mật khẩu?
                                            </a>
                                        </div>
                                    </form>
                                    {/* <div className="mt-4 text-center">
                                        <p className="text-gray-600">Hoặc đăng nhập bằng</p>
                                        <div className="flex justify-center mt-2">
                                            <a href="#" className="mx-2">
                                                <img src="https://cdn.svgporn.com/logos/google-icon.svg" alt="Google" className="h-8 w-8" />
                                            </a>
                                            <a href="#" className="mx-2">
                                                <img src="https://cdn.svgporn.com/logos/facebook.svg" alt="Facebook" className="h-8 w-8" />
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export function SignUpModal({ showModal, onCloseModal }) {

    const { register, loading, errors } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData.username, formData.email, formData.password, formData.confirmPassword, formData.fullName );
    };

    const handleCloseModal = () => {
        onCloseModal(false);
    }

    return (
        <>
            {/* Modal */}
            {showModal ? (
                <>
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="absolute top-0 right-0 mt-4 mr-4">
                                    <button
                                        type="button"
                                        className="bg-gray-200 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        onClick={handleCloseModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mb-4">
                                        <h1 className="text-center text-black text-2xl font-bold">Đăng ký</h1>
                                    </div>
                                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Họ và tên"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Tên đăng nhập"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Mật khẩu"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Nhập lại mật khẩu"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                placeholder="Số điện thoại (không bắt buộc)"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div> */}
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Tạo tài khoản
                                        </button>
                                    </form>
                                    {/* <div className="mt-4 text-center">
                                        <p className="text-gray-600">Hoặc đăng nhập bằng</p>
                                        <div className="flex justify-center mt-2">
                                            <a href="#" className="mx-2">
                                                <img src="https://cdn.svgporn.com/logos/google-icon.svg" alt="Google" className="h-8 w-8" />
                                            </a>
                                            <a href="#" className="mx-2">
                                                <img src="https://cdn.svgporn.com/logos/facebook.svg" alt="Facebook" className="h-8 w-8" />
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}