import { useRef, useState } from "react";
import MyListbox from "../../partials/listbox";
import AddServiceModal from "./addModal";
import Pagination from "../../partials/pagination";
import DeleteServiceModal from "./deleteModal";
import ServicesComponent from "./serviceComponent";

const serviceList = [
    {
        "id": "1",
        "name": "Netflix",
        "image": "https://i.ibb.co/L6MDz9X/HD-wallpaper-netflix-logo-black-logo-minimal-netflix.jpg",
        "description": "Dịch vụ xem phim trực tuyến phổ biến nhất hiện nay",
        "pricing_info": "Từ $8.99/tháng",
        "website": "netflix.com",
        "category": "Giải trí"
    },
    {
        "id": "2",
        "name": "Spotify",
        "image": "https://i.ibb.co/3TKMSxn/spotify.png",
        "description": "Dịch vụ nghe nhạc trực tuyến với hàng triệu bài hát và podcast",
        "pricing_info": "Miễn phí với quảng cáo hoặc Premium từ $9.99/tháng",
        "website": "spotify.com",
        "category": "Giải trí"
    },
    {
        "id": "3",
        "name": "Amazon Prime",
        "image": "https://i.ibb.co/xCFY6mW/amazon-prime.jpg",
        "description": "Dịch vụ giao hàng miễn phí, xem phim và nhiều ưu đãi khác",
        "pricing_info": "$119/năm hoặc $12.99/tháng",
        "website": "amazon.com/prime",
        "category": "Mua sắm"
    },
    {
        "id": "4",
        "name": "YouTube Premium",
        "image": "https://i.ibb.co/6WshX41/youtube-premium.png",
        "description": "Truy cập YouTube không quảng cáo, xem video ngoại tuyến",
        "pricing_info": "$11.99/tháng",
        "website": "youtube.com/premium",
        "category": "Giải trí"
    }
]
const actions = ["add", "edit", "view", "delete"];
function Services() {

    const [action, setAction] = useState(actions[0]);
    const [showModal, setShowModal] = useState(false);
    const [showDeteteModal, setShowDeleteModal] = useState(false);
    const dataModalRef = useRef(null);

    // Hanldle Add Services
    const handleAddServiceClick = () => {
        setAction(actions[0]);
        setShowModal(true);
    };

    const handleEditServiceClick = (id) => {
        setAction(actions[1]);
        const data = serviceList.filter(service => service.id === id);
        dataModalRef.current = data;
        setShowModal(true);
    };

    const handleViewServiceClick = (id) => {
        setAction(actions[2]);
        const data = serviceList.filter(service => service.id === id);
        dataModalRef.current = data;
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
        dataModalRef.current = null;
    };

    // Delete service

    const handleDeteteServiceClick = (id) => {
        setAction(actions[3]);
        const data = serviceList.filter(service => service.id === id);
        dataModalRef.current = data;
        setShowDeleteModal(true);
    }

    const handleDeleteModalClose = () => {
        console.log('Call close delete');
        setShowDeleteModal(false);
        dataModalRef.current = null
    }

    const handleDeleteService = (serviceId) => {
        console.log(`Xóa dịch vụ có id ${serviceId}`);
        setShowDeleteModal(false);
        dataModalRef.current = null
    };


    return (
        <>
            <ServicesComponent
                serviceList={serviceList}
                action={action}
                showModal={showModal}
                showDeleteModal={showDeteteModal}
                dataModalRef={dataModalRef}
                handleAddServiceClick={handleAddServiceClick}
                handleEditServiceClick={handleEditServiceClick}
                handleViewServiceClick={handleViewServiceClick}
                handleModalClose={handleModalClose}
                handleDeleteServiceClick={handleDeteteServiceClick}
                handleDeleteModalClose={handleDeleteModalClose}
                handleDeleteService={handleDeleteService}
            />

        </>
    );
}

export default Services;