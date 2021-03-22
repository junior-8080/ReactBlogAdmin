export const authzation = () => {
    const getAouth = JSON.parse (localStorage.getItem('profile')) ;
    if(getAouth){
        return true
    }
    return false
}