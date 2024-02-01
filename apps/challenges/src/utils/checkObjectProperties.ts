const isValidDate = (d: Date) => {
    return d instanceof Date && !isNaN(d.valueOf())
}

export { isValidDate as default }