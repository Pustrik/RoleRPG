export function classes(req, res) {
    res.status(200).json({
        classes: {
            thief: true,
            warrior: true,
            mage: true
        }
    })
}