export const authzation = () => {
    const getAouth = JSON.parse (localStorage.getItem('blog_admin_profile')) ;
    if(getAouth){
        return true
    }
    return false
}