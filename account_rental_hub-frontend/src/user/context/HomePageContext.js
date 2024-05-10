import { useContext } from "react";

export const HomePageContext = useContext('');

export const HomepageProvider = ({childen}) => {
    return (
        <HomePageContext.Provider>
            {childen}
        </HomePageContext.Provider>
    )
}