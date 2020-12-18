export const authzation = () => {
    const getAouth = JSON.parse (localStorage.getItem('userProfile')) ;
    if(getAouth){
        return true
    }
    return false
}