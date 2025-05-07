function  Logout(){
  
    localStorage.removeItem('vendorId'); // Remove vendorId
    localStorage.removeItem('vendortoken'); // Remove vendorId
    window.location.href = '/login';
}
export default Logout;