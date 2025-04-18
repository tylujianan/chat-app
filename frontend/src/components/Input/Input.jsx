const Input = ({ type = "text", placeholder = " ", className = " ", ...others }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`outline-none bg-slate-900 rounded-lg text-slate-300 ${className}`}
            {...others}
        />
    )
}

export default Input
