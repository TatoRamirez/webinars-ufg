const InternalBanner = ({children, height, img}) => {
    return (
        <div style={{height: `${height}`, background: `url(${img})`}} className="banner-internal">
            {children}
        </div>
    )
}

export default InternalBanner