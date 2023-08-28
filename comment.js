// import Pagination from './Pagination';

// const [totalPages, setTotalRecipes] = useState(0);

// const [selectedSeasonings, setSelectedSeasonings] = useState([]);

// console.log("Input query:", query);
// console.log("Current page:", page);

// console.log("Cleaned query:", cleanedQuery);

// const totalResults = searchResults.totalResults;

// const recipesReturned = response.data;
// const totalRecipesCount = recipes.length;
// console.log("recipesReturned:", recipesReturned);

// const slicedRecipes = recipesReturned.slice((page - 1) * recipesPerPage, page * recipesPerPage);
// console.log("Sliced recipes:", slicedRecipes.length);

// const totalRecipesCount = recipesReturned.length;
// const totalCountHeader = response.headers['x-total-count'];


// useEffect(() => {
//   handleFormSubmit(selectedSeasonings, currentPage);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [currentPage, selectedSeasonings]);

// const handleScroll = () => {
//   const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

//   if (scrolledToBottom && ! isLoading) {
//     setIsLoading(true)
//     setCurrentPage(currentPage + 1);
//   }
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [isLoading]);

    // {/* <Pagination
    //     currentPage={currentPage}
    //     // totalRecipes={totalRecipes}
    //     recipesPerPage={recipesPerPage}
    //     // onPageChange={handlePageChange}
    //   /> */}
