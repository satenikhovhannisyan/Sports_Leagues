function ErrorMessage({ message = "An unexpected error occurred" }) {
    return (
        <div>
            <p>Oops: {message}</p>
        </div>
    );
}

export default ErrorMessage;