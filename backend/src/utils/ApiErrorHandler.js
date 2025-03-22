class ApiError extends Error{
    constructor(
        StatusCode,
        message="something went wrong",
        errors=[],
        stack="",
    ){
        // overwrite the above properties here
        super(message);
        this.StatusCode=StatusCode;
        this.data=null;
        this.message=message;
        this.success=false;
        this.error=errors;
        if (stack) {
            this.stack=stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }