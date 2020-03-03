export const getData=()=> 
    fetch('http://jsonplaceholder.typicode.com/posts').then(res=>res.json())
 