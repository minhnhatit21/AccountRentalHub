import { useEffect, useState } from "react";
import AccountServiceRentalService from "../../services/account-rental-service.service";


function TestAPI() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const page = 0;
                const size = 10;
                const category = 'music';
                const name = '';
                const response = await AccountServiceRentalService.testSearchAccountService(page, size, category, name);
                setData(response.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [data]);

    return (
        <>
            <div>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <img src={item.image} alt={item.name} />
                            <p>{item.description}</p>
                            <a href={item.website}>{item.website}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default TestAPI;