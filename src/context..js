import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const API = "&key=AIzaSyCdCYgL1AWFlGyyfYShKFUfGTCPT8WemWQ";
const Pagination = "&maxResults=30";
const AppContext = React.createContext();

const categorie = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
const orderBy = ['relevance', 'newest'];

const AppProvider = ({children}) => {
    
    const [searchTerm, setSearchTerm] = useState("ReactJS");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [categories, setCategories] = useState('computers'); 
    const [sortinBy, setSortingBy] = useState('relevance');
    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try {
            // const response = await fetch(`${URL}${searchTerm}+subject:${categories}&orderBy=${sortinBy}${API}${Pagination}`);
            const response = await fetch(`${URL}${searchTerm}${API}${Pagination}`);
            const data = await response.json();
            const {items} = data;
            if(items) {
                const newBooks =items.slice(0, 20).map(
                    (booksSingle) => {
                        const {id, volumeInfo} = booksSingle;

                        return {
                            id: id, 
                            author: volumeInfo.authors ? volumeInfo.authors: "No subject auauthors found",
                            cover_id: volumeInfo.imageLinks.smallThumbnail,
                            first_publish_year: volumeInfo.publishedDate,
                            title: volumeInfo.title
                        }
                    });
                    setBooks(newBooks);

                    if(newBooks.length > 1) {
                        setResultTitle(`Found 20 result`);
                    } else {
                        setResultTitle("No Search Result Found!")
                    }
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm, categories, sortinBy]);
    console.log(searchTerm);
    console.log(categories);
    console.log(sortinBy);
    useEffect(() => {
        fetchBooks();
    }, [searchTerm, categories, sortinBy, fetchBooks]);
   
    return (
        <AppContext.Provider value={{
            loading, books, setSearchTerm, resultTitle,
            setResultTitle, setCategories, setSortingBy
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};