import axios from 'axios';

export default class CustomersService{

  constructor(){
    this.protocol = window.location.protocol;
    this.host = window.location.origin;
    this.url = this.protocol + '//' + this.host + '/';
  }

  fetchDataScroll = async (url, loading, setPosts, posts, currentPage, setError, fetching, requestOptions) => {
    try{
      loading(true);
      const result = await fetch(url, requestOptions);
      const json = await result.json();
      console.log('json = ', json);
      setPosts([...posts, ...json]);
      loading(false);
      currentPage(prevState => prevState + 1);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      fetching(false)
    }
  };

  // для получения totalPages для скроллинга
  // для получения основного контента на мейн странице
  fetchData = async (url, loading, setState, setError, requestOptions) => {
    try{
      loading(true);
      const result = await fetch(url, requestOptions);
      const json = await result.json();
      console.log('json = ', json);
      setState(json);
      loading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      loading(false);
    }
  };


  // createCustomer(customer){
  //   return axios.post(`${this.url}api/register/`,customer);
  // }
  //
  // getContent(language){
  //   return axios.get(`${this.url}api/translate/`, {headers: {
  //       mylang:language
  //     }})
  //     .then(response => response.data);
  // }
  //
  // getContent1(language){
  //   return axios.get(`${this.url}api/translate/`, {headers: {
  //       mylang:language
  //     }})
  //     .then(response => response.data);
  // }

  // getContent1(data){
  //   const url = `${this.url}`;
  //   const geturl = 'https://jsonplaceholder.typicode.com/posts/2';
  //   const header = {
  //     mylang:data
  //   }
  //   // debugger;
  //   return axios.get(geturl, {headers: header})
  //     .then(response => response.data);
  // }
}
