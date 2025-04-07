const handleReqError = (error, wantReturn) => {
    const status = error?.response?.status || 500
    const message = error?.response?.data?.message || error.message || "An Unknown Error Occurred"

    console.error(`Error: [${status}]-${message}`);

    if(wantReturn) return {success: false, message: {status,message} }
    
}

export {handleReqError}