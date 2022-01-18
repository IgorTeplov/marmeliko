// import { useState, useEffect } from "react";
//
// export const fetchData = async (url) => {
//   const [data, setData] = useState(null);
//   const [courses, setCourses] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//
//   try{
//     setIsLoading(true);
//     const result = await fetch(url);
//     const json = await result.json();
//     setCourses(json);
//     setIsLoading(false);
//     console.log(json)
//   } catch (error) {
//     console.error(error)
//     setError(error);
//   }
// }

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

// const useEffect = (() => {
//     setTimeout(() => {
//       fetch(url)
//         .then(res => {
//           if(!res.ok) {
//             throw Error('could not fetch the data from backend');
//           }
//           return res.json();
//         })
//         .then(data => {
//           setData(data);
//           setIsPending(false);
//           setError(null);
//         })
//         .catch(err => {
//           setIsPending(false);
//           setError(err.message);
//         })
//     }, 1000);
//   }, [url]);
// }
