export  const refreshToken = () => {

    var request = fetch("/auth/refresh", {
        method : "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            userId: localStorage.getItem("currentUser"),
            refreshToken : localStorage.getItem("refreshKey")
        }),
    })

    return request

}