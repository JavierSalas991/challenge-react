
function getCookieValue(cookieName) {
    let cookieValue = null;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split('; ');

    cookieArray.forEach(cookie => {
        const splitedCookie = cookie.split('=')
        if (splitedCookie[0] === cookieName) cookieValue = splitedCookie[1]
    })
    return cookieValue
}

export default getCookieValue;